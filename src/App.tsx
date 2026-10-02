/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  Project, 
  User, 
  Capability, 
  ProjectRequirement, 
  CapabilityGap, 
  Recommendation, 
  Evidence, 
  Collaboration, 
  AuditLog,
  CollaborationStatus 
} from './types/index.ts';
import { 
  fetchProjects, 
  fetchProject, 
  fetchCapabilities, 
  fetchEvidence, 
  fetchCollaborations, 
  fetchAuditLogs, 
  fetchUsers, 
  fetchUserById,
  analyzeProjectWithGemini, 
  addProjectRequirement, 
  recalculateGaps, 
  createEvidence, 
  sendCollaborationRequest, 
  updateCollaborationStatus, 
  resetDatabase 
} from './services/api.ts';
import { Navbar } from './components/Navbar.tsx';
import { HeroSection } from './components/HeroSection.tsx';
import { ProjectOverviewCard } from './components/ProjectOverviewCard.tsx';
import { OverviewView } from './components/views/OverviewView.tsx';
import { RequirementsView } from './components/views/RequirementsView.tsx';
import { CapabilityGapsView } from './components/views/CapabilityGapsView.tsx';
import { ContributorDiscoveryView } from './components/views/ContributorDiscoveryView.tsx';
import { EvidenceExplorerView } from './components/views/EvidenceExplorerView.tsx';
import { CollaborationView } from './components/views/CollaborationView.tsx';
import { CapabilityGraphView } from './components/views/CapabilityGraphView.tsx';
import { AuditTrailView } from './components/views/AuditTrailView.tsx';
import { EvidenceCaptureModal } from './components/modals/EvidenceCaptureModal.tsx';
import { WhyThisMatchModal } from './components/modals/WhyThisMatchModal.tsx';
import { ContributorProfileModal } from './components/modals/ContributorProfileModal.tsx';
import { CollaborationRequestModal } from './components/modals/CollaborationRequestModal.tsx';
import { LoginPage } from './components/auth/LoginPage.tsx';
import { MobileBottomNav } from './components/MobileBottomNav.tsx';

export default function App() {
  // Navigation & View States
  const [currentTab, setCurrentTab] = useState<string>('overview');
  const [selectedGapFilter, setSelectedGapFilter] = useState<string>('ALL');

  // Core Data States
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [projectMembers, setProjectMembers] = useState<any[]>([]);
  const [requirements, setRequirements] = useState<ProjectRequirement[]>([]);
  const [gaps, setGaps] = useState<CapabilityGap[]>([]);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [evidence, setEvidence] = useState<Evidence[]>([]);
  const [collaborations, setCollaborations] = useState<Collaboration[]>([]);
  const [capabilities, setCapabilities] = useState<Capability[]>([]);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  // Current Demo User (Anii Demo)
  const [currentUser, setCurrentUser] = useState<User>({
    id: 'user-demo',
    name: 'Anii Demo',
    email: 'anii.demo@beast03.network',
    avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    role: 'Project Builder & Systems Architect',
    bio: 'Leading distributed real-time systems and agricultural technology initiatives at NorthStar Systems.',
    location: 'San Francisco, CA',
    availability: 'Full-time on Smart Agriculture',
    is_demo_user: true,
    verified_evidence_count: 14,
    created_at: '2026-01-10T08:00:00Z',
    updated_at: '2026-09-20T10:00:00Z'
  });

  // Modal Control States
  const [isCaptureOpen, setIsCaptureOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [whyMatchRec, setWhyMatchRec] = useState<Recommendation | null>(null);
  const [profileUser, setProfileUser] = useState<(User & { evidence?: Evidence[] }) | null>(null);
  const [collaborateTarget, setCollaborateTarget] = useState<{ user: User; targetCaps: string[] } | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Show Toast Helper
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Auth Handlers
  const handleLoginSuccess = (user: User) => {
    setCurrentUser(user);
    setIsLoginOpen(false);
    confetti({ particleCount: 50, spread: 70, origin: { y: 0.6 } });
    showToast(`Welcome back, ${user.name}! Authenticated to BEAST-03!™ workspace.`);
  };

  const handleLogout = () => {
    // Reset to demo guest
    const guestUser: User = {
      id: 'user-guest',
      name: 'Guest Engineer',
      email: 'guest@beast03.network',
      avatar_url: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      role: 'Guest Observer',
      bio: 'Exploring evidence-driven collaboration intelligence.',
      location: 'Global',
      availability: 'Browsing',
      is_demo_user: true,
      verified_evidence_count: 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    setCurrentUser(guestUser);
    showToast('Signed out. Browsing as Guest.');
    setIsLoginOpen(true);
  };

  const handleSwitchUser = (userId: string) => {
    const found = users.find(u => u.id === userId);
    if (found) {
      setCurrentUser(found);
      showToast(`Switched active persona to ${found.name} (${found.role}).`);
      confetti({ particleCount: 30, spread: 50, origin: { y: 0.5 } });
    }
  };

  // Initial Load
  const loadInitialData = async () => {
    try {
      const [projs, caps, evs, collabs, logs, uList] = await Promise.all([
        fetchProjects(),
        fetchCapabilities(),
        fetchEvidence(),
        fetchCollaborations(),
        fetchAuditLogs(50),
        fetchUsers()
      ]);

      setProjects(projs);
      setCapabilities(caps);
      setEvidence(evs);
      setCollaborations(collabs);
      setAuditLogs(logs);
      setUsers(uList);

      // Default to Smart Agricultural Monitoring System
      const mainProject = projs.find(p => p.id === 'proj-smart-agri') || projs[0];
      if (mainProject) {
        await loadProjectDetails(mainProject.id);
      }
    } catch (err) {
      console.warn('Initial load fallback/retry:', err);
    }
  };

  // Load Single Project Full Details
  const loadProjectDetails = async (projectId: string) => {
    try {
      const detailed = await fetchProject(projectId);
      setActiveProject(detailed);
      setProjectMembers(detailed.members || []);
      setRequirements(detailed.requirements || []);
      setGaps(detailed.gaps || []);
      setRecommendations(detailed.recommendations || []);
    } catch (err) {
      console.warn('Failed to fetch project details:', err);
    }
  };

  useEffect(() => {
    loadInitialData();
  }, []);

  // When activeProject changes
  const handleSelectProject = async (p: Project) => {
    await loadProjectDetails(p.id);
  };

  // 1. Analyze Project with Gemini AI
  const handleAnalyzeProject = async () => {
    if (!activeProject) return;
    setIsAnalyzing(true);
    try {
      const result = await analyzeProjectWithGemini(activeProject.id);
      if (result) {
        setRequirements(result.requirements);
        setGaps(result.gaps);
        setRecommendations(result.recommendations);
        confetti({ particleCount: 45, spread: 60, origin: { y: 0.6 } });
        showToast(`Gemini AI successfully extracted ${result.extractedCount || 7} requirements! Gaps and matches refreshed.`);
      }
      // Refresh audit logs
      const updatedLogs = await fetchAuditLogs(50);
      setAuditLogs(updatedLogs);
    } catch (err) {
      console.warn('Gemini project analysis error:', err);
      showToast('Project analysis completed with fallback rule extraction.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  // 2. Add Project Requirement
  const handleAddRequirement = async (
    capabilityId: string,
    importance: string,
    requiredLevel: string,
    description: string
  ) => {
    if (!activeProject) return;
    try {
      await addProjectRequirement(activeProject.id, capabilityId, importance, requiredLevel, description);
      await loadProjectDetails(activeProject.id);
      showToast('New capability requirement added. Capability gaps recalculated.');
    } catch (err) {
      console.warn('Add requirement error:', err);
    }
  };

  // 3. Save Evidence from Modal
  const handleSaveEvidence = async (evidenceData: any) => {
    try {
      const created = await createEvidence({
        ...evidenceData,
        user_id: currentUser.id
      });
      // Refresh evidence list
      const evs = await fetchEvidence();
      setEvidence(evs);

      // Refresh project gaps and recommendations if linked to active project
      if (activeProject) {
        await loadProjectDetails(activeProject.id);
      }

      // Refresh audit logs
      const updatedLogs = await fetchAuditLogs(50);
      setAuditLogs(updatedLogs);

      confetti({ particleCount: 35, spread: 50, origin: { y: 0.5 } });
      showToast('Technical evidence artifact added to capability graph!');
    } catch (err) {
      console.warn('Error saving evidence:', err);
    }
  };

  // 4. Send Collaboration Request
  const handleSendCollaboration = async (message: string, targetCaps: string[]) => {
    if (!collaborateTarget || !activeProject) return;
    try {
      await sendCollaborationRequest({
        project_id: activeProject.id,
        contributor_id: collaborateTarget.user.id,
        requester_id: currentUser.id,
        message,
        target_capabilities: targetCaps
      });

      // Refresh collaborations list and audit trail
      const [collabs, logs] = await Promise.all([
        fetchCollaborations(),
        fetchAuditLogs(50)
      ]);
      setCollaborations(collabs);
      setAuditLogs(logs);

      confetti({ particleCount: 50, spread: 70, origin: { y: 0.6 } });
      showToast(`Collaboration request sent to ${collaborateTarget.user.name}!`);
    } catch (err) {
      console.warn('Collaboration request error:', err);
    }
  };

  // 5. Update Collaboration Status
  const handleUpdateCollaborationStatus = async (id: string, status: CollaborationStatus) => {
    try {
      await updateCollaborationStatus(id, status);
      const collabs = await fetchCollaborations();
      setCollaborations(collabs);
      showToast(`Collaboration status updated to ${status}.`);
    } catch (err) {
      console.warn('Error updating collaboration status:', err);
    }
  };

  // 6. View Contributor Profile
  const handleViewProfile = async (userId: string) => {
    try {
      const u = await fetchUserById(userId);
      setProfileUser(u);
    } catch (err) {
      const found = users.find(user => user.id === userId);
      if (found) {
        setProfileUser({ ...found, evidence: evidence.filter(e => e.user_id === userId) });
      }
    }
  };

  // 7. Reset Database Demo
  const handleResetData = async () => {
    await resetDatabase();
    await loadInitialData();
    showToast('Database reset to fresh demo seed state.');
  };

  // 8. Jump to Contributor Discovery filtered by specific gap
  const handleFindContributorsForGap = (gapId: string) => {
    setSelectedGapFilter(gapId);
    setCurrentTab('contributors');
  };

  return (
    <div className="min-h-screen bg-[#F7F7F7] flex flex-col font-sans pb-16 md:pb-0">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-18 right-6 z-50 bg-[#252525] text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-xl border border-[#444444] animate-in fade-in slide-in-from-top-2 duration-200">
          {toastMessage}
        </div>
      )}

      {/* Top Navbar */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        currentUser={currentUser}
        projects={projects}
        activeProject={activeProject}
        setActiveProject={handleSelectProject}
        onOpenCapture={() => setIsCaptureOpen(true)}
        onResetData={handleResetData}
        onOpenLogin={() => setIsLoginOpen(true)}
        onSwitchUser={handleSwitchUser}
        onLogout={handleLogout}
      />

      {/* Sky Hero Section (Inspired by user image!) */}
      <HeroSection
        onExploreDemo={() => {
          const mainProj = projects.find(p => p.id === 'proj-smart-agri') || projects[0];
          if (mainProj) handleSelectProject(mainProj);
          setCurrentTab('overview');
        }}
        onOpenCapture={() => setIsCaptureOpen(true)}
        activeProject={activeProject}
      />

      {/* Main Elevated Workspace Dashboard Card */}
      {activeProject && (
        <ProjectOverviewCard
          project={activeProject}
          requirements={requirements}
          gaps={gaps}
          recommendations={recommendations}
          evidence={evidence}
          members={projectMembers}
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
          onAnalyzeProject={handleAnalyzeProject}
          onOpenCapture={() => setIsCaptureOpen(true)}
          onFindContributors={() => {
            setSelectedGapFilter('ALL');
            setCurrentTab('contributors');
          }}
          isAnalyzing={isAnalyzing}
        />
      )}

      {/* Workspace Tab Content Container */}
      <main className="max-w-7xl mx-auto px-4 w-full flex-1 -mt-10 mb-20 z-10">
        {activeProject && currentTab === 'overview' && (
          <OverviewView
            project={activeProject}
            members={projectMembers}
            gaps={gaps}
            evidence={evidence}
            onFindContributors={() => {
              setSelectedGapFilter('ALL');
              setCurrentTab('contributors');
            }}
            onOpenGaps={() => setCurrentTab('gaps')}
            onOpenCapture={() => setIsCaptureOpen(true)}
          />
        )}

        {activeProject && currentTab === 'requirements' && (
          <RequirementsView
            project={activeProject}
            requirements={requirements}
            capabilities={capabilities}
            onAddRequirement={handleAddRequirement}
            onAnalyzeWithGemini={handleAnalyzeProject}
            onOpenGaps={() => setCurrentTab('gaps')}
            isAnalyzing={isAnalyzing}
          />
        )}

        {activeProject && currentTab === 'gaps' && (
          <CapabilityGapsView
            project={activeProject}
            gaps={gaps}
            onFindContributorsForGap={handleFindContributorsForGap}
            onOpenCapture={() => setIsCaptureOpen(true)}
          />
        )}

        {activeProject && currentTab === 'contributors' && (
          <ContributorDiscoveryView
            project={activeProject}
            recommendations={recommendations}
            gaps={gaps}
            selectedGapId={selectedGapFilter}
            onViewWhyMatch={(rec) => setWhyMatchRec(rec)}
            onViewProfile={handleViewProfile}
            onOpenCollaborate={(contributor, targetCaps) => {
              setCollaborateTarget({ user: contributor, targetCaps });
            }}
          />
        )}

        {currentTab === 'evidence' && (
          <EvidenceExplorerView
            evidence={evidence}
            onOpenCapture={() => setIsCaptureOpen(true)}
            onSelectEvidence={(e) => {
              // open preview
            }}
          />
        )}

        {currentTab === 'collaborations' && (
          <CollaborationView
            collaborations={collaborations}
            onUpdateStatus={handleUpdateCollaborationStatus}
            onViewProfile={handleViewProfile}
            onOpenProject={(projId) => {
              const found = projects.find(p => p.id === projId);
              if (found) handleSelectProject(found);
              setCurrentTab('overview');
            }}
          />
        )}

        {currentTab === 'graph' && (
          <CapabilityGraphView
            capabilities={capabilities}
            onSelectEvidence={(eId) => {
              setCurrentTab('evidence');
            }}
          />
        )}

        {currentTab === 'audit' && (
          <AuditTrailView logs={auditLogs} />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-[#E5E5E5] bg-white py-8 px-4 text-center text-xs text-[#777777]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-[#252525]">BEAST-03!™</span>
            <span>·</span>
            <span>Evidence-Driven Collaboration Intelligence</span>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-[#666666]">
            <span>Deterministic Scoring</span>
            <span>·</span>
            <span>Gemini AI Multimodal Verification</span>
            <span>·</span>
            <span>PostgreSQL Relational Storage</span>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <EvidenceCaptureModal
        isOpen={isCaptureOpen}
        onClose={() => setIsCaptureOpen(false)}
        onSaveEvidence={handleSaveEvidence}
        projectId={activeProject?.id}
      />

      <WhyThisMatchModal
        recommendation={whyMatchRec}
        onClose={() => setWhyMatchRec(null)}
        onOpenEvidence={(eId) => {
          setWhyMatchRec(null);
          setCurrentTab('evidence');
        }}
        onOpenCollaborate={() => {
          if (whyMatchRec?.user) {
            setCollaborateTarget({
              user: whyMatchRec.user,
              targetCaps: whyMatchRec.matched_capabilities
            });
            setWhyMatchRec(null);
          }
        }}
      />

      <ContributorProfileModal
        user={profileUser}
        onClose={() => setProfileUser(null)}
        onSelectEvidence={(eId) => {
          setProfileUser(null);
          setCurrentTab('evidence');
        }}
        onOpenCollaborate={(contributor) => {
          setCollaborateTarget({
            user: contributor,
            targetCaps: ['cap-esp32', 'cap-mqtt']
          });
          setProfileUser(null);
        }}
      />

      {activeProject && (
        <CollaborationRequestModal
          isOpen={collaborateTarget !== null}
          onClose={() => setCollaborateTarget(null)}
          project={activeProject}
          contributor={collaborateTarget?.user || null}
          targetCapabilities={collaborateTarget?.targetCaps || []}
          onSubmit={handleSendCollaboration}
        />
      )}

      {/* Login & Single Sign-On Portal */}
      {isLoginOpen && (
        <LoginPage
          onLoginSuccess={handleLoginSuccess}
          onClose={() => setIsLoginOpen(false)}
        />
      )}

      {/* Mobile Bottom Navigation Bar */}
      <MobileBottomNav
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        onOpenCapture={() => setIsCaptureOpen(true)}
        onOpenProfile={() => setIsLoginOpen(true)}
      />
    </div>
  );
}
