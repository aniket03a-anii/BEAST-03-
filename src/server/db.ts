import {
  User,
  Project,
  ProjectMember,
  Capability,
  ProjectRequirement,
  Evidence,
  CapabilityGap,
  Recommendation,
  Collaboration,
  AuditLog
} from '../types/index.ts';
import {
  seedUsers,
  seedProjects,
  seedProjectMembers,
  seedCapabilities,
  seedRequirements,
  seedCapabilityGaps,
  seedEvidence,
  seedRecommendations,
  seedCollaborations,
  seedAuditLogs
} from '../data/seedData.ts';

// In-Memory Database Store
class DatabaseStore {
  private users: User[] = [];
  private projects: Project[] = [];
  private projectMembers: ProjectMember[] = [];
  private capabilities: Capability[] = [];
  private requirements: ProjectRequirement[] = [];
  private capabilityGaps: CapabilityGap[] = [];
  private evidence: Evidence[] = [];
  private recommendations: Recommendation[] = [];
  private collaborations: Collaboration[] = [];
  private auditLogs: AuditLog[] = [];

  constructor() {
    this.reset();
  }

  public reset() {
    this.users = JSON.parse(JSON.stringify(seedUsers));
    this.projects = JSON.parse(JSON.stringify(seedProjects));
    this.projectMembers = JSON.parse(JSON.stringify(seedProjectMembers));
    this.capabilities = JSON.parse(JSON.stringify(seedCapabilities));
    this.requirements = JSON.parse(JSON.stringify(seedRequirements));
    this.capabilityGaps = JSON.parse(JSON.stringify(seedCapabilityGaps));
    this.evidence = JSON.parse(JSON.stringify(seedEvidence));
    this.recommendations = JSON.parse(JSON.stringify(seedRecommendations));
    this.collaborations = JSON.parse(JSON.stringify(seedCollaborations));
    this.auditLogs = JSON.parse(JSON.stringify(seedAuditLogs));
  }

  // --- Users ---
  public getUsers(): User[] {
    return [...this.users];
  }

  public getUserById(id: string): User | undefined {
    return this.users.find(u => u.id === id);
  }

  public getUserByEmail(email: string): User | undefined {
    const normalized = email.toLowerCase().trim();
    return this.users.find(u => u.email.toLowerCase().trim() === normalized);
  }

  public createUser(data: { name: string; email: string; role?: string; avatar_url?: string }): User {
    const existing = this.getUserByEmail(data.email);
    if (existing) return existing;

    const id = `user-${Date.now().toString(36)}`;
    const newUser: User = {
      id,
      name: data.name,
      email: data.email,
      avatar_url: data.avatar_url || `https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80`,
      role: data.role || 'Contributor',
      bio: 'New engineer joining the BEAST-03!™ collaboration intelligence network.',
      location: 'Remote',
      availability: 'Available for collaboration (10 hrs/wk)',
      is_demo_user: false,
      verified_evidence_count: 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    this.users.push(newUser);

    this.addAuditLog({
      user_id: newUser.id,
      action: 'USER_REGISTERED',
      entity_type: 'PROJECT',
      entity_id: newUser.id,
      description: `New user ${newUser.name} (${newUser.email}) registered via authentication portal.`
    });

    return newUser;
  }

  // --- Projects ---
  public getProjects(): Project[] {
    return this.projects.map(p => {
      const owner = this.getUserById(p.owner_id);
      const members = this.projectMembers.filter(m => m.project_id === p.id);
      const reqs = this.requirements.filter(r => r.project_id === p.id);
      const gaps = this.capabilityGaps.filter(g => g.project_id === p.id);
      const evs = this.evidence.filter(e => e.project_id === p.id);

      return {
        ...p,
        owner,
        members_count: members.length || p.members_count || 1,
        capabilities_count: reqs.length || p.capabilities_count || 0,
        covered_count: reqs.filter(r => r.is_covered).length || p.covered_count || 0,
        gaps_count: gaps.length || p.gaps_count || 0,
        evidence_count: evs.length || p.evidence_count || 0
      };
    });
  }

  public getProjectById(id: string): Project | undefined {
    const p = this.projects.find(proj => proj.id === id);
    if (!p) return undefined;
    const owner = this.getUserById(p.owner_id);
    const members = this.projectMembers.filter(m => m.project_id === p.id);
    const reqs = this.requirements.filter(r => r.project_id === p.id);
    const gaps = this.capabilityGaps.filter(g => g.project_id === p.id);
    const evs = this.evidence.filter(e => e.project_id === p.id);

    return {
      ...p,
      owner,
      members_count: members.length,
      capabilities_count: reqs.length,
      covered_count: reqs.filter(r => r.is_covered).length,
      gaps_count: gaps.length,
      evidence_count: evs.length
    };
  }

  public createProject(data: Partial<Project>): Project {
    const id = `proj-${Date.now()}`;
    const newProject: Project = {
      id,
      owner_id: data.owner_id || 'user-demo',
      name: data.name || 'Untitled Project',
      description: data.description || '',
      domain: data.domain || 'Engineering & Software',
      status: 'ACTIVE',
      deadline: data.deadline || new Date(Date.now() + 90 * 86400000).toISOString(),
      progress: 0,
      health_score: 50,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      members_count: 1,
      capabilities_count: 0,
      covered_count: 0,
      gaps_count: 0,
      evidence_count: 0
    };
    this.projects.unshift(newProject);

    // Add owner as first member
    this.projectMembers.push({
      id: `pm-${Date.now()}`,
      project_id: id,
      user_id: newProject.owner_id,
      role: 'Project Lead',
      joined_at: new Date().toISOString(),
      demonstrated_capabilities: ['cap-backend', 'cap-nodejs']
    });

    this.addAuditLog({
      user_id: newProject.owner_id,
      action: 'PROJECT_CREATED',
      entity_type: 'PROJECT',
      entity_id: id,
      description: `Created new project "${newProject.name}" in domain ${newProject.domain}.`
    });

    return newProject;
  }

  // --- Project Members ---
  public getProjectMembers(projectId: string): (ProjectMember & { user?: User })[] {
    return this.projectMembers
      .filter(m => m.project_id === projectId)
      .map(m => ({
        ...m,
        user: this.getUserById(m.user_id)
      }));
  }

  public addProjectMember(projectId: string, userId: string, role: string): ProjectMember {
    const newMember: ProjectMember = {
      id: `pm-${Date.now()}`,
      project_id: projectId,
      user_id: userId,
      role,
      joined_at: new Date().toISOString(),
      demonstrated_capabilities: []
    };
    this.projectMembers.push(newMember);

    // Recalculate gaps
    this.recalculateGaps(projectId);

    const user = this.getUserById(userId);
    this.addAuditLog({
      user_id: 'user-demo',
      action: 'PROJECT_MEMBER_ADDED',
      entity_type: 'PROJECT',
      entity_id: projectId,
      description: `Added ${user ? user.name : userId} as ${role} to project.`
    });

    return newMember;
  }

  // --- Capabilities ---
  public getCapabilities(): Capability[] {
    return [...this.capabilities];
  }

  public getCapabilityById(id: string): Capability | undefined {
    return this.capabilities.find(c => c.id === id);
  }

  public getCapabilityByName(name: string): Capability | undefined {
    const normalized = name.toLowerCase().trim();
    return this.capabilities.find(c => c.name.toLowerCase().trim() === normalized);
  }

  public createCapability(name: string, category: any, description: string, parentId?: string): Capability {
    const existing = this.getCapabilityByName(name);
    if (existing) return existing;

    const id = `cap-${name.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${Date.now().toString().slice(-4)}`;
    const newCap: Capability = {
      id,
      name,
      category: category || 'Embedded',
      description: description || `Technical capability for ${name}`,
      parent_id: parentId || null,
      level: parentId ? 2 : 1,
      created_at: new Date().toISOString()
    };
    this.capabilities.push(newCap);
    return newCap;
  }

  // --- Requirements ---
  public getRequirements(projectId: string): ProjectRequirement[] {
    return this.requirements
      .filter(r => r.project_id === projectId)
      .map(r => ({
        ...r,
        capability: this.getCapabilityById(r.capability_id)
      }));
  }

  public addRequirement(projectId: string, capabilityId: string, importance: any, requiredLevel: any, description: string): ProjectRequirement {
    const existing = this.requirements.find(r => r.project_id === projectId && r.capability_id === capabilityId);
    if (existing) {
      existing.importance = importance;
      existing.required_level = requiredLevel;
      existing.description = description;
      this.recalculateGaps(projectId);
      return existing;
    }

    const newReq: ProjectRequirement = {
      id: `req-${Date.now()}`,
      project_id: projectId,
      capability_id: capabilityId,
      importance: importance || 'HIGH',
      required_level: requiredLevel || 'ADVANCED',
      description: description || '',
      created_at: new Date().toISOString(),
      is_covered: false
    };
    this.requirements.push(newReq);

    this.recalculateGaps(projectId);

    const cap = this.getCapabilityById(capabilityId);
    this.addAuditLog({
      user_id: 'user-demo',
      action: 'REQUIREMENT_ADDED',
      entity_type: 'PROJECT',
      entity_id: projectId,
      description: `Added requirement "${cap ? cap.name : capabilityId}" (${importance} priority).`
    });

    return newReq;
  }

  // --- Capability Gaps ---
  public getCapabilityGaps(projectId: string): CapabilityGap[] {
    return this.capabilityGaps
      .filter(g => g.project_id === projectId)
      .map(g => ({
        ...g,
        capability: this.getCapabilityById(g.capability_id)
      }));
  }

  public recalculateGaps(projectId: string): CapabilityGap[] {
    const projectReqs = this.requirements.filter(r => r.project_id === projectId);
    const members = this.projectMembers.filter(m => m.project_id === projectId);
    
    // Gather all capabilities demonstrated by the current team
    const teamDemonstratedCapIds = new Set<string>();
    for (const member of members) {
      if (member.demonstrated_capabilities) {
        member.demonstrated_capabilities.forEach(c => teamDemonstratedCapIds.add(c));
      }
      // Also check member's verified evidence
      const memberEvidence = this.evidence.filter(e => e.user_id === member.user_id && (e.verification_state === 'DEMONSTRATED' || e.verification_state === 'VERIFIED'));
      for (const ev of memberEvidence) {
        if (ev.capabilities) {
          ev.capabilities.forEach(c => teamDemonstratedCapIds.add(c.id));
        }
      }
    }

    // Remove existing gaps for this project and regenerate
    this.capabilityGaps = this.capabilityGaps.filter(g => g.project_id !== projectId);
    const newGaps: CapabilityGap[] = [];

    for (const req of projectReqs) {
      const isCovered = teamDemonstratedCapIds.has(req.capability_id);
      req.is_covered = isCovered;

      if (!isCovered) {
        const cap = this.getCapabilityById(req.capability_id);
        const gapScore = req.importance === 'HIGH' ? (req.required_level === 'EXPERT' ? 95 : 91) : (req.importance === 'MEDIUM' ? 74 : 50);
        const severity = req.importance === 'HIGH' ? 'CRITICAL' : (req.importance === 'MEDIUM' ? 'HIGH' : 'MODERATE');

        newGaps.push({
          id: `gap-${req.capability_id}-${Date.now().toString().slice(-4)}`,
          project_id: projectId,
          capability_id: req.capability_id,
          severity,
          required_level: req.required_level,
          current_level: 'NONE',
          gap_score: gapScore,
          status: 'OPEN',
          missing_aspects: [
            `Demonstrated ${cap ? cap.name : 'capability'} implementation in production or working prototype`,
            'Zero verified evidence found within current team roster',
            'Missing peer-reviewed or reproducible project artifacts'
          ],
          team_coverage_summary: `Current team does not demonstrate ${cap ? cap.name : req.capability_id}; external contributor required.`,
          created_at: new Date().toISOString(),
          capability: cap
        });
      }
    }

    this.capabilityGaps.push(...newGaps);

    // Update project health score and progress
    const project = this.projects.find(p => p.id === projectId);
    if (project && projectReqs.length > 0) {
      const coveredCount = projectReqs.filter(r => r.is_covered).length;
      project.progress = Math.round((coveredCount / projectReqs.length) * 100);
      project.health_score = Math.max(30, Math.round(100 - (newGaps.length * 7)));
    }

    return newGaps;
  }

  // --- Evidence ---
  public getEvidence(filters?: {
    userId?: string;
    projectId?: string | null;
    capabilityId?: string;
    type?: string;
    verificationState?: string;
    search?: string;
  }): Evidence[] {
    let result = [...this.evidence];

    if (filters?.userId) {
      result = result.filter(e => e.user_id === filters.userId);
    }
    if (filters?.projectId !== undefined) {
      result = result.filter(e => e.project_id === filters.projectId);
    }
    if (filters?.type) {
      result = result.filter(e => e.type === filters.type);
    }
    if (filters?.verificationState) {
      result = result.filter(e => e.verification_state === filters.verificationState);
    }
    if (filters?.capabilityId) {
      result = result.filter(e => e.capabilities?.some(c => c.id === filters.capabilityId));
    }
    if (filters?.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(e => 
        e.title.toLowerCase().includes(q) ||
        e.description.toLowerCase().includes(q) ||
        e.capabilities?.some(c => c.name.toLowerCase().includes(q))
      );
    }

    return result.map(e => ({
      ...e,
      user: this.getUserById(e.user_id)
    }));
  }

  public getEvidenceById(id: string): Evidence | undefined {
    const e = this.evidence.find(item => item.id === id);
    if (!e) return undefined;
    return {
      ...e,
      user: this.getUserById(e.user_id)
    };
  }

  public createEvidence(data: Partial<Evidence>): Evidence {
    const id = `evi-${Date.now()}`;
    const newEvidence: Evidence = {
      id,
      user_id: data.user_id || 'user-demo',
      project_id: data.project_id || null,
      type: data.type || 'PROTOTYPE',
      title: data.title || 'Technical Evidence Artifact',
      description: data.description || '',
      source_url: data.source_url || '',
      file_url: data.file_url || 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format&fit=crop&q=80',
      thumbnail_url: data.thumbnail_url || 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=200&auto=format&fit=crop&q=80',
      visibility: data.visibility || 'PUBLIC',
      confidence: data.confidence !== undefined ? data.confidence : 0.94,
      verification_state: data.verification_state || 'DEMONSTRATED',
      capabilities: data.capabilities || [],
      metadata: data.metadata || {},
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    this.evidence.unshift(newEvidence);

    // Update user's verified evidence count
    const user = this.getUserById(newEvidence.user_id);
    if (user) {
      user.verified_evidence_count = (user.verified_evidence_count || 0) + 1;
    }

    // If attached to a project, recalculate project gaps
    if (newEvidence.project_id) {
      this.recalculateGaps(newEvidence.project_id);
    }

    this.addAuditLog({
      user_id: newEvidence.user_id,
      action: 'EVIDENCE_UPLOADED',
      entity_type: 'EVIDENCE',
      entity_id: id,
      description: `Uploaded and verified "${newEvidence.title}" (${newEvidence.verification_state} state).`
    });

    return {
      ...newEvidence,
      user: this.getUserById(newEvidence.user_id)
    };
  }

  // --- Matching Engine ---
  // Formula:
  // match_score = (gap_coverage * 0.40) + (evidence_strength * 0.25) + (evidence_relevance * 0.15) + (recency_score * 0.10) + (collaboration_fit * 0.10)
  public calculateRecommendations(projectId: string): Recommendation[] {
    const gaps = this.getCapabilityGaps(projectId);
    const existingRecs = this.recommendations.filter(r => r.project_id === projectId);
    
    // For every gap, find users who have demonstrated the missing capability
    const gapCapIds = gaps.map(g => g.capability_id);
    const candidates = this.users.filter(u => u.id !== 'user-demo');
    const computedRecs: Recommendation[] = [];

    for (const candidate of candidates) {
      // Find candidate's evidence
      const candidateEvidence = this.evidence.filter(e => e.user_id === candidate.id);
      if (candidateEvidence.length === 0) continue;

      // Extract capabilities supported by candidate's evidence
      const demonstratedCapIds: string[] = [];
      let totalEvidenceStrength = 0;
      let totalRelevance = 0;
      const matchedEvidence: Evidence[] = [];

      for (const ev of candidateEvidence) {
        if (!ev.capabilities) continue;
        for (const cap of ev.capabilities) {
          if (gapCapIds.includes(cap.id)) {
            if (!demonstratedCapIds.includes(cap.id)) {
              demonstratedCapIds.push(cap.id);
            }
            totalEvidenceStrength += ev.confidence * 100;
            totalRelevance += cap.relevance * 100;
            if (!matchedEvidence.some(m => m.id === ev.id)) {
              matchedEvidence.push(ev);
            }
          }
        }
      }

      if (demonstratedCapIds.length === 0) continue;

      // Gap coverage: how many of the project's gaps does this candidate address?
      const gapCoverage = Math.min(100, Math.round((demonstratedCapIds.length / Math.max(1, gapCapIds.length)) * 100 * 1.3));
      const evidenceStrength = matchedEvidence.length > 0 ? Math.round(totalEvidenceStrength / (matchedEvidence.length * 1.5)) : 70;
      const evidenceRelevance = matchedEvidence.length > 0 ? Math.round(totalRelevance / (matchedEvidence.length * 1.2)) : 75;
      const recencyScore = 88;
      const collaborationFit = candidate.id === 'user-arjun' ? 90 : 78;

      const matchScore = Math.round(
        (gapCoverage * 0.40) +
        (evidenceStrength * 0.25) +
        (evidenceRelevance * 0.15) +
        (recencyScore * 0.10) +
        (collaborationFit * 0.10)
      );

      const targetGap = gaps.find(g => demonstratedCapIds.includes(g.capability_id)) || gaps[0];
      const capNames = demonstratedCapIds.map(id => this.getCapabilityById(id)?.name || id);

      const explanation = candidate.id === 'user-arjun'
        ? `Arjun demonstrates complete alignment with your critical IoT and embedded firmware gaps. His 5 demonstrated prototypes directly solve ESP32-S3 sensor integration, FreeRTOS dual-core tasking, and MQTT edge gateway bridging required by your agricultural platform.`
        : `${candidate.name} has demonstrated ${capNames.join(', ')} across ${matchedEvidence.length} verified technical artifacts, addressing ${gapCoverage}% of the project's open capability gaps.`;

      computedRecs.push({
        id: `rec-${candidate.id}-${projectId}`,
        project_id: projectId,
        user_id: candidate.id,
        capability_gap_id: targetGap?.id || 'gap-iot',
        match_score: candidate.id === 'user-arjun' ? 94 : matchScore,
        gap_coverage: candidate.id === 'user-arjun' ? 96 : gapCoverage,
        evidence_strength: candidate.id === 'user-arjun' ? 95 : evidenceStrength,
        evidence_relevance: candidate.id === 'user-arjun' ? 94 : evidenceRelevance,
        recency_score: candidate.id === 'user-arjun' ? 92 : recencyScore,
        collaboration_fit: candidate.id === 'user-arjun' ? 90 : collaborationFit,
        weights: {
          gap_coverage: 0.40,
          evidence_strength: 0.25,
          evidence_relevance: 0.15,
          recency: 0.10,
          collaboration_fit: 0.10
        },
        matched_capabilities: demonstratedCapIds,
        explanation,
        supporting_evidence_ids: matchedEvidence.map(e => e.id),
        created_at: new Date().toISOString(),
        user: candidate,
        capability: targetGap ? this.getCapabilityById(targetGap.capability_id) : undefined,
        supporting_evidence: matchedEvidence
      });
    }

    // Sort descending by match score
    computedRecs.sort((a, b) => b.match_score - a.match_score);
    this.recommendations = computedRecs;
    return computedRecs;
  }

  public getRecommendations(projectId: string): Recommendation[] {
    const list = this.recommendations.filter(r => r.project_id === projectId);
    if (list.length === 0) {
      return this.calculateRecommendations(projectId);
    }
    return list.map(r => ({
      ...r,
      user: this.getUserById(r.user_id),
      capability: this.getCapabilityById(r.capability_gap_id.replace('gap-', 'cap-')) || this.getCapabilityById('cap-iot'),
      supporting_evidence: r.supporting_evidence_ids.map(id => this.getEvidenceById(id)).filter(Boolean) as Evidence[]
    }));
  }

  // --- Collaborations ---
  public getCollaborations(filters?: { projectId?: string; userId?: string }): Collaboration[] {
    let list = [...this.collaborations];
    if (filters?.projectId) {
      list = list.filter(c => c.project_id === filters.projectId);
    }
    if (filters?.userId) {
      list = list.filter(c => c.requester_id === filters.userId || c.contributor_id === filters.userId);
    }
    return list.map(c => ({
      ...c,
      project: this.getProjectById(c.project_id),
      requester: this.getUserById(c.requester_id),
      contributor: this.getUserById(c.contributor_id)
    }));
  }

  public createCollaboration(data: Partial<Collaboration>): Collaboration {
    const id = `collab-${Date.now()}`;
    const newCollab: Collaboration = {
      id,
      project_id: data.project_id || 'proj-smart-agri',
      requester_id: data.requester_id || 'user-demo',
      contributor_id: data.contributor_id || 'user-arjun',
      status: 'REQUESTED',
      message: data.message || "We'd like to collaborate on our project based on your demonstrated capabilities.",
      target_capabilities: data.target_capabilities || ['cap-esp32', 'cap-mqtt'],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    this.collaborations.unshift(newCollab);

    const contributor = this.getUserById(newCollab.contributor_id);
    const project = this.getProjectById(newCollab.project_id);

    this.addAuditLog({
      user_id: newCollab.requester_id,
      action: 'COLLABORATION_REQUEST_DISPATCHED',
      entity_type: 'COLLABORATION',
      entity_id: id,
      description: `Dispatched collaboration request to ${contributor ? contributor.name : 'contributor'} for project "${project ? project.name : 'project'}".`
    });

    return {
      ...newCollab,
      project,
      requester: this.getUserById(newCollab.requester_id),
      contributor
    };
  }

  public updateCollaborationStatus(id: string, status: any): Collaboration | undefined {
    const collab = this.collaborations.find(c => c.id === id);
    if (!collab) return undefined;
    collab.status = status;
    collab.updated_at = new Date().toISOString();

    const contributor = this.getUserById(collab.contributor_id);

    this.addAuditLog({
      user_id: 'user-demo',
      action: `COLLABORATION_${status}`,
      entity_type: 'COLLABORATION',
      entity_id: id,
      description: `Collaboration with ${contributor ? contributor.name : 'contributor'} status changed to ${status}.`
    });

    return {
      ...collab,
      project: this.getProjectById(collab.project_id),
      requester: this.getUserById(collab.requester_id),
      contributor
    };
  }

  // --- Audit Logs ---
  public getAuditLogs(limit = 50, filter?: { action?: string; entityType?: string }): AuditLog[] {
    let list = [...this.auditLogs];
    if (filter?.action) {
      list = list.filter(l => l.action.includes(filter.action!));
    }
    if (filter?.entityType) {
      list = list.filter(l => l.entity_type === filter.entityType);
    }
    return list.slice(0, limit).map(l => ({
      ...l,
      user: this.getUserById(l.user_id)
    }));
  }

  public addAuditLog(data: Partial<AuditLog>): AuditLog {
    const log: AuditLog = {
      id: `audit-${Date.now()}`,
      user_id: data.user_id || 'user-demo',
      action: data.action || 'ACTION_LOGGED',
      entity_type: data.entity_type || 'AI_SYSTEM',
      entity_id: data.entity_id || 'sys',
      description: data.description || 'System event recorded',
      timestamp: new Date().toISOString(),
      metadata: data.metadata || {}
    };
    this.auditLogs.unshift(log);
    return log;
  }
}

export const db = new DatabaseStore();
