import {
  Project,
  Evidence,
  User,
  Capability,
  CapabilityGap,
  Recommendation,
  Collaboration,
  CollaborationStatus,
  AuditLog,
  ProjectRequirement,
  AIAnalysisResult
} from '../types/index.ts';

const API_BASE = '/api';

export async function loginUser(payload: {
  email?: string;
  password?: string;
  provider?: string;
  userId?: string;
}): Promise<{ user: User; token: string }> {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  const json = await res.json();
  return json;
}

export async function signupUser(payload: {
  name: string;
  email: string;
  role?: string;
  password?: string;
}): Promise<{ user: User; token: string }> {
  const res = await fetch(`${API_BASE}/auth/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  const json = await res.json();
  return json;
}

export async function fetchPersonas(): Promise<User[]> {
  const res = await fetch(`${API_BASE}/auth/personas`);
  const json = await res.json();
  return json.personas || [];
}

export async function fetchProjects(): Promise<Project[]> {
  const res = await fetch(`${API_BASE}/projects`);
  const json = await res.json();
  return json.data;
}

export async function fetchProject(id: string): Promise<Project & {
  members: any[];
  requirements: ProjectRequirement[];
  gaps: CapabilityGap[];
  recommendations: Recommendation[];
  evidence: Evidence[];
}> {
  const res = await fetch(`${API_BASE}/projects/${id}`);
  const json = await res.json();
  return json.data;
}

export async function createProject(data: Partial<Project>): Promise<Project> {
  const res = await fetch(`${API_BASE}/projects`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  const json = await res.json();
  return json.data;
}

export async function analyzeProjectWithGemini(id: string): Promise<{
  requirements: ProjectRequirement[];
  gaps: CapabilityGap[];
  recommendations: Recommendation[];
  extractedCount: number;
}> {
  const res = await fetch(`${API_BASE}/projects/${id}/analyze`, {
    method: 'POST'
  });
  const json = await res.json();
  return json;
}

export async function addProjectRequirement(
  projectId: string,
  capabilityId: string,
  importance: string,
  requiredLevel: string,
  description: string
): Promise<ProjectRequirement> {
  const res = await fetch(`${API_BASE}/projects/${projectId}/requirements`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ capabilityId, importance, requiredLevel, description })
  });
  const json = await res.json();
  return json.data;
}

export async function recalculateGaps(projectId: string): Promise<{
  data: CapabilityGap[];
  recommendations: Recommendation[];
}> {
  const res = await fetch(`${API_BASE}/projects/${projectId}/gaps/recalculate`, {
    method: 'POST'
  });
  const json = await res.json();
  return json;
}

export async function fetchEvidence(filters?: {
  userId?: string;
  projectId?: string | null;
  capabilityId?: string;
  type?: string;
  verificationState?: string;
  search?: string;
}): Promise<Evidence[]> {
  const params = new URLSearchParams();
  if (filters?.userId) params.append('userId', filters.userId);
  if (filters?.projectId !== undefined) params.append('projectId', filters.projectId === null ? 'null' : filters.projectId);
  if (filters?.capabilityId) params.append('capabilityId', filters.capabilityId);
  if (filters?.type) params.append('type', filters.type);
  if (filters?.verificationState) params.append('verificationState', filters.verificationState);
  if (filters?.search) params.append('search', filters.search);

  const res = await fetch(`${API_BASE}/evidence?${params.toString()}`);
  const json = await res.json();
  return json.data;
}

export async function fetchEvidenceById(id: string): Promise<Evidence> {
  const res = await fetch(`${API_BASE}/evidence/${id}`);
  const json = await res.json();
  return json.data;
}

export async function createEvidence(data: Partial<Evidence>): Promise<Evidence> {
  const res = await fetch(`${API_BASE}/evidence`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  const json = await res.json();
  return json.data;
}

export async function analyzeEvidenceWithGemini(payload: {
  text?: string;
  imageBase64?: string;
  imageMimeType?: string;
  fileName?: string;
  typeHint?: string;
}): Promise<AIAnalysisResult> {
  const res = await fetch(`${API_BASE}/evidence/analyze`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  const json = await res.json();
  return json.data;
}

export async function fetchUsers(): Promise<User[]> {
  const res = await fetch(`${API_BASE}/users`);
  const json = await res.json();
  return json.data;
}

export async function fetchUserById(id: string): Promise<User & { evidence: Evidence[] }> {
  const res = await fetch(`${API_BASE}/users/${id}`);
  const json = await res.json();
  return json.data;
}

export async function fetchCapabilities(): Promise<Capability[]> {
  const res = await fetch(`${API_BASE}/capabilities`);
  const json = await res.json();
  return json.data;
}

export async function fetchCapabilityGraph(): Promise<{
  nodes: any[];
  links: any[];
}> {
  const res = await fetch(`${API_BASE}/capabilities/graph`);
  const json = await res.json();
  return json.data;
}

export async function fetchCollaborations(filters?: {
  projectId?: string;
  userId?: string;
}): Promise<Collaboration[]> {
  const params = new URLSearchParams();
  if (filters?.projectId) params.append('projectId', filters.projectId);
  if (filters?.userId) params.append('userId', filters.userId);

  const res = await fetch(`${API_BASE}/collaborations?${params.toString()}`);
  const json = await res.json();
  return json.data;
}

export async function sendCollaborationRequest(data: {
  project_id: string;
  contributor_id: string;
  requester_id?: string;
  message: string;
  target_capabilities: string[];
}): Promise<Collaboration> {
  const res = await fetch(`${API_BASE}/collaborations`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  const json = await res.json();
  return json.data;
}

export async function updateCollaborationStatus(
  id: string,
  status: CollaborationStatus
): Promise<Collaboration> {
  const res = await fetch(`${API_BASE}/collaborations/${id}/status`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status })
  });
  const json = await res.json();
  return json.data;
}

export async function fetchAuditLogs(limit = 50, filters?: {
  action?: string;
  entityType?: string;
}): Promise<AuditLog[]> {
  const params = new URLSearchParams();
  params.append('limit', String(limit));
  if (filters?.action) params.append('action', filters.action);
  if (filters?.entityType) params.append('entityType', filters.entityType);

  const res = await fetch(`${API_BASE}/audit-logs?${params.toString()}`);
  const json = await res.json();
  return json.data;
}

export async function resetDatabase(): Promise<void> {
  await fetch(`${API_BASE}/reset`, { method: 'POST' });
}
