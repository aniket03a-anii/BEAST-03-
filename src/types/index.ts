export type TrustState = 'CLAIMED' | 'DETECTED' | 'SUPPORTED' | 'DEMONSTRATED' | 'VERIFIED';

export type EvidenceType = 
  | 'PROJECT'
  | 'GITHUB'
  | 'IMAGE'
  | 'VIDEO'
  | 'AUDIO'
  | 'SCREENSHOT'
  | 'DOCUMENT'
  | 'PROTOTYPE'
  | 'DEMO'
  | 'CERTIFICATE'
  | 'USER_DESCRIPTION';

export type Visibility = 'PUBLIC' | 'COMMUNITY' | 'TEAM_ONLY' | 'PRIVATE';

export type Importance = 'HIGH' | 'MEDIUM' | 'LOW';

export type SkillLevel = 'BASIC' | 'INTERMEDIATE' | 'ADVANCED' | 'EXPERT';

export type GapSeverity = 'CRITICAL' | 'HIGH' | 'MODERATE' | 'LOW';

export type CollaborationStatus = 'REQUESTED' | 'ACCEPTED' | 'ACTIVE' | 'COMPLETED' | 'DECLINED';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar_url: string;
  role: string;
  bio: string;
  location: string;
  availability: string;
  is_demo_user?: boolean;
  verified_evidence_count: number;
  created_at: string;
  updated_at: string;
}

export interface Capability {
  id: string;
  name: string;
  category: 'Embedded' | 'AI' | 'Networking' | 'Sensors & Hardware' | 'Backend & Cloud' | 'UI/UX' | 'Security';
  description: string;
  parent_id?: string | null;
  level?: number;
  created_at: string;
}

export interface Project {
  id: string;
  owner_id: string;
  name: string;
  description: string;
  domain: string;
  status: 'ACTIVE' | 'PLANNING' | 'COMPLETED' | 'ARCHIVED';
  deadline: string;
  progress: number;
  health_score: number;
  created_at: string;
  updated_at: string;
  owner?: User;
  members_count?: number;
  capabilities_count?: number;
  covered_count?: number;
  gaps_count?: number;
  evidence_count?: number;
}

export interface ProjectMember {
  id: string;
  project_id: string;
  user_id: string;
  role: string;
  joined_at: string;
  user?: User;
  demonstrated_capabilities?: string[];
}

export interface ProjectRequirement {
  id: string;
  project_id: string;
  capability_id: string;
  importance: Importance;
  required_level: SkillLevel;
  description: string;
  created_at: string;
  capability?: Capability;
  is_covered?: boolean;
}

export interface Evidence {
  id: string;
  user_id: string;
  project_id?: string | null;
  type: EvidenceType;
  title: string;
  description: string;
  source_url?: string;
  file_url?: string;
  thumbnail_url?: string;
  visibility: Visibility;
  confidence: number; // 0 to 1
  verification_state: TrustState;
  metadata?: Record<string, any>;
  created_at: string;
  updated_at: string;
  user?: User;
  capabilities?: Array<{
    id: string;
    name: string;
    confidence: number;
    relevance: number;
    category?: string;
  }>;
}

export interface EvidenceCapability {
  id: string;
  evidence_id: string;
  capability_id: string;
  confidence: number;
  relevance: number;
  extraction_source: 'GEMINI_AI' | 'SYSTEM_VERIFIER' | 'MANUAL_DECLARATION' | 'GITHUB_SYNC';
  created_at: string;
  capability?: Capability;
}

export interface CapabilityGap {
  id: string;
  project_id: string;
  capability_id: string;
  severity: GapSeverity;
  required_level: SkillLevel;
  current_level: SkillLevel | 'NONE';
  gap_score: number; // 0 to 100 percentage
  status: 'OPEN' | 'IN_REVIEW' | 'SOURCED' | 'RESOLVED';
  missing_aspects?: string[];
  team_coverage_summary?: string;
  created_at: string;
  capability?: Capability;
}

export interface Recommendation {
  id: string;
  project_id: string;
  user_id: string;
  capability_gap_id: string;
  match_score: number; // overall percentage (0-100)
  gap_coverage: number; // 0-100
  evidence_strength: number; // 0-100
  evidence_relevance: number; // 0-100
  recency_score: number; // 0-100
  collaboration_fit: number; // 0-100
  weights?: {
    gap_coverage: number;
    evidence_strength: number;
    evidence_relevance: number;
    recency: number;
    collaboration_fit: number;
  };
  matched_capabilities: string[];
  explanation: string;
  supporting_evidence_ids: string[];
  created_at: string;
  user?: User;
  capability?: Capability;
  supporting_evidence?: Evidence[];
}

export interface Collaboration {
  id: string;
  project_id: string;
  requester_id: string;
  contributor_id: string;
  status: CollaborationStatus;
  message: string;
  target_capabilities: string[];
  created_at: string;
  updated_at: string;
  project?: Project;
  requester?: User;
  contributor?: User;
}

export interface AuditLog {
  id: string;
  user_id: string;
  action: string;
  entity_type: 'PROJECT' | 'EVIDENCE' | 'CAPABILITY' | 'GAP' | 'RECOMMENDATION' | 'COLLABORATION' | 'AI_SYSTEM';
  entity_id: string;
  description: string;
  timestamp: string;
  metadata?: Record<string, any>;
  user?: User;
}

export interface AIAnalysisResult {
  summary: string;
  capabilities: Array<{
    name: string;
    confidence: number;
    relevance: number;
    category?: string;
  }>;
  evidenceType: EvidenceType;
  verificationState: TrustState;
  suggestedTrustReason?: string;
  technicalHighlights?: string[];
}
