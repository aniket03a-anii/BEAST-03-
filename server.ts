import express from 'express';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { db } from './src/server/db.ts';
import {
  analyzeEvidence,
  analyzeProjectRequirements,
  generateRecommendationExplanation
} from './src/server/geminiService.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

  // JSON body parser with increased limit for base64 images / recordings
  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ extended: true, limit: '50mb' }));

  // Request logger for audit & debugging
  app.use((req, res, next) => {
    if (req.url.startsWith('/api')) {
      console.log(`[API] ${req.method} ${req.url}`);
    }
    next();
  });

  // ==========================================
  // API ROUTES
  // ==========================================

  // Health check
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'ok',
      service: 'BEAST-03!™ Collaboration Intelligence Engine',
      timestamp: new Date().toISOString()
    });
  });

  // Reset database for demo
  app.post('/api/reset', (req, res) => {
    db.reset();
    res.json({ success: true, message: 'Database reset to initial seed state.' });
  });

  // ==========================================
  // AUTHENTICATION ROUTES
  // ==========================================
  app.post('/api/auth/login', (req, res) => {
    const { email, password, provider, userId } = req.body;

    // Quick persona switch by userId
    if (userId) {
      const user = db.getUserById(userId);
      if (user) {
        db.addAuditLog({
          user_id: user.id,
          action: 'USER_AUTHENTICATED',
          entity_type: 'PROJECT',
          entity_id: user.id,
          description: `${user.name} logged into BEAST-03!™ workspace.`
        });
        return res.json({ success: true, user, token: `demo-token-${user.id}` });
      }
    }

    // SSO Provider Flow (Google / GitHub)
    if (provider === 'google' || provider === 'github') {
      const ssoName = provider === 'google' ? 'Google Workspace User' : 'GitHub Developer';
      const ssoEmail = `${provider}.engineer@beast03.network`;
      let user = db.getUserByEmail(ssoEmail);
      if (!user) {
        user = db.createUser({
          name: ssoName,
          email: ssoEmail,
          role: 'Full-Stack Embedded Engineer',
          avatar_url: provider === 'google'
            ? 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'
            : 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop&q=80'
        });
      }
      db.addAuditLog({
        user_id: user.id,
        action: 'SSO_AUTHENTICATED',
        entity_type: 'PROJECT',
        entity_id: user.id,
        description: `Authenticated via ${provider.toUpperCase()} Single Sign-On.`
      });
      return res.json({ success: true, user, token: `sso-token-${user.id}` });
    }

    // Email/Password
    if (email) {
      let user = db.getUserByEmail(email);
      if (!user) {
        // Fallback to demo user if non-existent or register on the fly
        user = db.createUser({
          name: email.split('@')[0].replace('.', ' '),
          email,
          role: 'Developer'
        });
      }
      db.addAuditLog({
        user_id: user.id,
        action: 'USER_LOGIN',
        entity_type: 'PROJECT',
        entity_id: user.id,
        description: `${user.name} signed in with email.`
      });
      return res.json({ success: true, user, token: `auth-token-${user.id}` });
    }

    // Default to Anii Demo
    const demoUser = db.getUserById('user-demo');
    res.json({ success: true, user: demoUser, token: 'demo-token-user-demo' });
  });

  app.post('/api/auth/signup', (req, res) => {
    const { name, email, role, password } = req.body;
    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required' });
    }
    const user = db.createUser({ name, email, role });
    res.status(201).json({ success: true, user, token: `auth-token-${user.id}` });
  });

  app.get('/api/auth/personas', (req, res) => {
    const demoUsers = [
      db.getUserById('user-demo'),
      db.getUserById('user-arjun'),
      db.getUserById('user-elena'),
      db.getUserById('user-devraj')
    ].filter(Boolean);
    res.json({ personas: demoUsers });
  });

  // Projects
  app.get('/api/projects', (req, res) => {
    const projects = db.getProjects();
    res.json({ data: projects });
  });

  app.get('/api/projects/:id', (req, res) => {
    const project = db.getProjectById(req.params.id);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    const members = db.getProjectMembers(project.id);
    const requirements = db.getRequirements(project.id);
    const gaps = db.getCapabilityGaps(project.id);
    const recommendations = db.getRecommendations(project.id);
    const evidence = db.getEvidence({ projectId: project.id });

    res.json({
      data: {
        ...project,
        members,
        requirements,
        gaps,
        recommendations,
        evidence
      }
    });
  });

  app.post('/api/projects', (req, res) => {
    try {
      const newProject = db.createProject(req.body);
      res.status(201).json({ data: newProject });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // Analyze Project with Gemini AI
  app.post('/api/projects/:id/analyze', async (req, res) => {
    try {
      const project = db.getProjectById(req.params.id);
      if (!project) {
        return res.status(404).json({ error: 'Project not found' });
      }

      const { requirements } = await analyzeProjectRequirements(
        project.description,
        project.domain
      );

      // Save each extracted requirement into project requirements
      for (const reqItem of requirements) {
        let cap = db.getCapabilityByName(reqItem.capability);
        if (!cap) {
          cap = db.createCapability(reqItem.capability, reqItem.category, reqItem.description);
        }
        db.addRequirement(
          project.id,
          cap.id,
          reqItem.importance,
          reqItem.requiredLevel,
          reqItem.description
        );
      }

      // Recalculate capability gaps
      const updatedGaps = db.recalculateGaps(project.id);
      const updatedRecs = db.calculateRecommendations(project.id);

      db.addAuditLog({
        user_id: 'user-demo',
        action: 'GEMINI_PROJECT_REQUIREMENTS_EXTRACTED',
        entity_type: 'PROJECT',
        entity_id: project.id,
        description: `Gemini AI extracted ${requirements.length} technical requirements for ${project.name}. Gaps and recommendations refreshed.`
      });

      res.json({
        success: true,
        extractedCount: requirements.length,
        requirements: db.getRequirements(project.id),
        gaps: updatedGaps,
        recommendations: updatedRecs
      });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // Requirements
  app.get('/api/projects/:id/requirements', (req, res) => {
    const reqs = db.getRequirements(req.params.id);
    res.json({ data: reqs });
  });

  app.post('/api/projects/:id/requirements', (req, res) => {
    const { capabilityId, importance, requiredLevel, description } = req.body;
    if (!capabilityId) {
      return res.status(400).json({ error: 'capabilityId is required' });
    }
    const newReq = db.addRequirement(
      req.params.id,
      capabilityId,
      importance,
      requiredLevel,
      description
    );
    res.status(201).json({ data: newReq });
  });

  // Gaps
  app.get('/api/projects/:id/gaps', (req, res) => {
    const gaps = db.getCapabilityGaps(req.params.id);
    res.json({ data: gaps });
  });

  app.post('/api/projects/:id/gaps/recalculate', (req, res) => {
    const gaps = db.recalculateGaps(req.params.id);
    const recs = db.calculateRecommendations(req.params.id);
    res.json({ data: gaps, recommendations: recs });
  });

  // Recommendations
  app.get('/api/projects/:id/recommendations', (req, res) => {
    const recs = db.getRecommendations(req.params.id);
    res.json({ data: recs });
  });

  // Evidence
  app.get('/api/evidence', (req, res) => {
    const { userId, projectId, capabilityId, type, verificationState, search } = req.query;
    const evidenceList = db.getEvidence({
      userId: userId ? String(userId) : undefined,
      projectId: projectId !== undefined ? (projectId === 'null' ? null : String(projectId)) : undefined,
      capabilityId: capabilityId ? String(capabilityId) : undefined,
      type: type ? String(type) : undefined,
      verificationState: verificationState ? String(verificationState) : undefined,
      search: search ? String(search) : undefined
    });
    res.json({ data: evidenceList });
  });

  app.get('/api/evidence/:id', (req, res) => {
    const item = db.getEvidenceById(req.params.id);
    if (!item) {
      return res.status(404).json({ error: 'Evidence not found' });
    }
    res.json({ data: item });
  });

  // Create Evidence
  app.post('/api/evidence', (req, res) => {
    try {
      const created = db.createEvidence(req.body);
      res.status(201).json({ data: created });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // Analyze Evidence with Gemini AI (Multimodal)
  app.post('/api/evidence/analyze', async (req, res) => {
    try {
      const { text, imageBase64, imageMimeType, fileName, typeHint } = req.body;
      const analysis = await analyzeEvidence({
        text,
        imageBase64,
        imageMimeType,
        fileName,
        typeHint
      });

      // Map analyzed capabilities to IDs
      const mappedCapabilities = analysis.capabilities.map(capItem => {
        let cap = db.getCapabilityByName(capItem.name);
        if (!cap) {
          cap = db.createCapability(
            capItem.name,
            (capItem.category as any) || 'Embedded',
            `Demonstrated capability detected in technical artifact`
          );
        }
        return {
          id: cap.id,
          name: cap.name,
          confidence: capItem.confidence,
          relevance: capItem.relevance,
          category: cap.category
        };
      });

      res.json({
        success: true,
        data: {
          ...analysis,
          capabilities: mappedCapabilities
        }
      });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // Users
  app.get('/api/users', (req, res) => {
    const users = db.getUsers();
    res.json({ data: users });
  });

  app.get('/api/users/:id', (req, res) => {
    const user = db.getUserById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    const userEvidence = db.getEvidence({ userId: user.id });
    res.json({ data: { ...user, evidence: userEvidence } });
  });

  // Capabilities & Graph
  app.get('/api/capabilities', (req, res) => {
    const capabilities = db.getCapabilities();
    res.json({ data: capabilities });
  });

  app.get('/api/capabilities/graph', (req, res) => {
    const allCaps = db.getCapabilities();
    const allEvidence = db.getEvidence();
    const allProjects = db.getProjects();
    const allUsers = db.getUsers();

    // Aggregate statistics per capability
    const nodes = allCaps.map(cap => {
      const relatedEvidence = allEvidence.filter(e =>
        e.capabilities?.some(c => c.id === cap.id)
      );
      const userIds = new Set<string>();
      relatedEvidence.forEach(e => userIds.add(e.user_id));

      const avgConfidence = relatedEvidence.length > 0
        ? Math.round((relatedEvidence.reduce((acc, e) => {
            const match = e.capabilities?.find(c => c.id === cap.id);
            return acc + (match ? match.confidence : 0.85);
          }, 0) / relatedEvidence.length) * 100)
        : 85;

      return {
        id: cap.id,
        name: cap.name,
        category: cap.category,
        description: cap.description,
        level: cap.level || 1,
        parent_id: cap.parent_id,
        evidenceCount: relatedEvidence.length,
        userCount: userIds.size,
        avgConfidence,
        verificationState: relatedEvidence.some(e => e.verification_state === 'DEMONSTRATED')
          ? 'DEMONSTRATED'
          : (relatedEvidence.some(e => e.verification_state === 'SUPPORTED') ? 'SUPPORTED' : 'DETECTED')
      };
    });

    const links = allCaps
      .filter(cap => cap.parent_id)
      .map(cap => ({
        source: cap.parent_id!,
        target: cap.id
      }));

    res.json({ data: { nodes, links } });
  });

  // Collaborations
  app.get('/api/collaborations', (req, res) => {
    const { projectId, userId } = req.query;
    const collaborations = db.getCollaborations({
      projectId: projectId ? String(projectId) : undefined,
      userId: userId ? String(userId) : undefined
    });
    res.json({ data: collaborations });
  });

  app.post('/api/collaborations', (req, res) => {
    try {
      const created = db.createCollaboration(req.body);
      res.status(201).json({ data: created });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.patch('/api/collaborations/:id/status', (req, res) => {
    const { status } = req.body;
    if (!status) {
      return res.status(400).json({ error: 'Status is required' });
    }
    const updated = db.updateCollaborationStatus(req.params.id, status);
    if (!updated) {
      return res.status(404).json({ error: 'Collaboration not found' });
    }
    res.json({ data: updated });
  });

  // Audit Logs
  app.get('/api/audit-logs', (req, res) => {
    const limit = req.query.limit ? parseInt(String(req.query.limit), 10) : 50;
    const action = req.query.action ? String(req.query.action) : undefined;
    const entityType = req.query.entityType ? String(req.query.entityType) : undefined;
    const logs = db.getAuditLogs(limit, { action, entityType });
    res.json({ data: logs });
  });

  // ==========================================
  // VITE / STATIC SERVING
  // ==========================================
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist/index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[BEAST-03!™] Server running on http://localhost:${PORT}`);
  });
}

startServer();
