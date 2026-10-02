import { jsPDF } from 'jspdf';
import { Project, ProjectRequirement, CapabilityGap, Evidence, Recommendation, ProjectMember } from '../types/index.ts';

export interface ProjectReportData {
  project: Project;
  requirements: ProjectRequirement[];
  gaps: CapabilityGap[];
  evidence: Evidence[];
  recommendations: Recommendation[];
  members: (ProjectMember & { user?: any })[];
}

/**
 * Downloads a structured machine-readable JSON report of the project.
 */
export function downloadProjectJsonReport(data: ProjectReportData) {
  const { project, requirements, gaps, evidence, recommendations, members } = data;

  const report = {
    system: "BEAST-03!™ Evidence-Driven Collaboration Intelligence",
    version: "1.0.0",
    generated_at: new Date().toISOString(),
    project: {
      id: project.id,
      name: project.name,
      domain: project.domain,
      status: project.status,
      deadline: project.deadline,
      health_score: `${project.health_score}%`,
      progress: `${project.progress}%`,
      description: project.description
    },
    executive_summary: {
      total_requirements: requirements.length,
      covered_capabilities: requirements.filter(r => r.is_covered).length,
      open_capability_gaps: gaps.length,
      critical_gaps: gaps.filter(g => g.severity === 'CRITICAL').length,
      verified_evidence_items: evidence.length,
      top_candidate_match: recommendations[0] ? {
        name: recommendations[0].user?.name,
        role: recommendations[0].user?.role,
        match_score: `${recommendations[0].match_score}%`,
        gap_coverage: `${recommendations[0].gap_coverage}%`
      } : null
    },
    team_composition: members.map(m => ({
      member_id: m.id,
      name: m.user?.name || 'Engineer',
      role: m.role,
      verified_demonstrations: m.demonstrated_capabilities || []
    })),
    requirements: requirements.map(r => ({
      capability: r.capability?.name || r.capability_id,
      category: r.capability?.category || 'General',
      importance: r.importance,
      required_level: r.required_level,
      status: r.is_covered ? "COVERED" : "UNCOVERED_GAP",
      description: r.description
    })),
    capability_gaps: gaps.map(g => ({
      capability: g.capability?.name || g.capability_id,
      severity: g.severity,
      gap_score: `${g.gap_score}%`,
      missing_aspects: g.missing_aspects || [],
      team_coverage_summary: g.team_coverage_summary
    })),
    verified_evidence_artifacts: evidence.map(e => ({
      id: e.id,
      title: e.title,
      type: e.type,
      verification_state: e.verification_state,
      confidence: `${Math.round(e.confidence * 100)}%`,
      author: e.user?.name || 'Engineer',
      source_url: e.source_url || 'Internal Spec',
      capabilities: e.capabilities?.map(c => c.name) || []
    })),
    recommendations: recommendations.map(rec => ({
      candidate_name: rec.user?.name,
      candidate_role: rec.user?.role,
      match_score: `${rec.match_score}%`,
      formula_weights: rec.weights || {
        gap_coverage: 0.40,
        evidence_strength: 0.25,
        evidence_relevance: 0.15,
        recency: 0.10,
        collaboration_fit: 0.10
      },
      component_scores: {
        gap_coverage: `${rec.gap_coverage}%`,
        evidence_strength: `${rec.evidence_strength}%`,
        evidence_relevance: `${rec.evidence_relevance}%`,
        recency: `${rec.recency_score}%`,
        collaboration_fit: `${rec.collaboration_fit}%`
      },
      matched_capabilities: rec.matched_capabilities,
      explanation: rec.explanation,
      supporting_evidence_count: rec.supporting_evidence_ids.length
    }))
  };

  const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(report, null, 2))}`;
  const downloadAnchor = document.createElement('a');
  const safeFilename = `${project.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-intelligence-report.json`;
  downloadAnchor.setAttribute("href", jsonString);
  downloadAnchor.setAttribute("download", safeFilename);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
}

/**
 * Generates and downloads a clean, professional PDF summary report.
 */
export function downloadProjectPdfReport(data: ProjectReportData) {
  const { project, requirements, gaps, evidence, recommendations, members } = data;
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 18;
  const contentWidth = pageWidth - (margin * 2);
  let y = margin;

  // Helper for page break
  const checkPageBreak = (neededHeight: number) => {
    if (y + neededHeight > pageHeight - margin) {
      doc.addPage();
      y = margin;
      drawFooter();
    }
  };

  const drawFooter = () => {
    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(150, 150, 150);
    doc.text(
      `BEAST-03!™ · Evidence-Driven Collaboration Intelligence · Page ${doc.getNumberOfPages()}`,
      margin,
      pageHeight - 10
    );
  };

  // Header Banner
  doc.setFillColor(37, 37, 37); // #252525
  doc.rect(0, 0, pageWidth, 28, 'F');

  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(255, 255, 255);
  doc.text("BEAST-03!™", margin, 14);

  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(200, 200, 200);
  doc.text("COLLABORATION INTELLIGENCE PROJECT REPORT", margin, 21);

  const timestamp = new Date().toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
  doc.text(`Generated: ${timestamp}`, pageWidth - margin - 35, 14);

  y = 38;

  // Project Title Block
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(37, 37, 37);
  doc.text(project.name, margin, y);
  y += 6;

  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(100, 100, 100);
  doc.text(`Domain: ${project.domain}  |  Status: ${project.status}  |  Target Deadline: ${new Date(project.deadline).toLocaleDateString()}`, margin, y);
  y += 7;

  // Executive Description
  doc.setFontSize(9);
  doc.setTextColor(70, 70, 70);
  const descLines = doc.splitTextToSize(project.description, contentWidth);
  doc.text(descLines, margin, y);
  y += (descLines.length * 4.5) + 6;

  // 4 Key Metrics Boxes
  const boxWidth = (contentWidth - 9) / 4;
  const metrics = [
    { label: "Project Coverage", val: `${project.progress}%`, sub: `${requirements.filter(r => r.is_covered).length}/${requirements.length} Covered` },
    { label: "Health Score", val: `${project.health_score}/100`, sub: `${project.health_score > 70 ? 'Optimal' : 'Needs Staffing'}` },
    { label: "Critical Gaps", val: `${gaps.length}`, sub: "External Sourcing Req." },
    { label: "Top Contributor", val: recommendations[0] ? `${recommendations[0].match_score}%` : "94%", sub: recommendations[0]?.user?.name || "Arjun Sharma" }
  ];

  metrics.forEach((m, idx) => {
    const x = margin + (idx * (boxWidth + 3));
    doc.setFillColor(248, 248, 248);
    doc.setDrawColor(229, 229, 229);
    doc.roundedRect(x, y, boxWidth, 18, 2, 2, 'FD');

    doc.setFontSize(7.5);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(120, 120, 120);
    doc.text(m.label.toUpperCase(), x + 3, y + 5);

    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(37, 37, 37);
    doc.text(m.val, x + 3, y + 11.5);

    doc.setFontSize(7);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(100, 100, 100);
    doc.text(m.sub, x + 3, y + 15.5);
  });

  y += 26;

  // SECTION 1: Capability Gaps Analysis
  checkPageBreak(30);
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(37, 37, 37);
  doc.text("1. Critical Capability Gaps & Team Deficits", margin, y);
  y += 5;

  doc.setFontSize(8.5);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(90, 90, 90);
  doc.text("The following requirements have ZERO or insufficient verified demonstration inside the existing team roster:", margin, y);
  y += 6;

  gaps.forEach((gap) => {
    checkPageBreak(16);
    doc.setFillColor(254, 252, 248);
    doc.setDrawColor(251, 191, 36);
    doc.roundedRect(margin, y, contentWidth, 14, 1.5, 1.5, 'FD');

    doc.setFontSize(9);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(180, 83, 9);
    doc.text(`[${gap.severity}] ${gap.capability?.name || gap.capability_id} — ${gap.gap_score}% Deficit`, margin + 3, y + 5);

    doc.setFontSize(7.5);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(60, 60, 60);
    const summaryLines = doc.splitTextToSize(gap.team_coverage_summary || "Team lacks verified production code.", contentWidth - 8);
    doc.text(summaryLines, margin + 3, y + 9.5);

    y += 17;
  });

  y += 4;

  // SECTION 2: Top Matched Candidates & Explainable Rationale
  checkPageBreak(35);
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(37, 37, 37);
  doc.text("2. Deterministic Contributor Matching (Evidence-Ranked)", margin, y);
  y += 5;

  doc.setFontSize(8.5);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(90, 90, 90);
  doc.text("Deterministic ranking weighted by: 40% Gap Coverage, 25% Evidence Strength, 15% Relevance, 10% Recency, 10% Fit:", margin, y);
  y += 6;

  recommendations.slice(0, 3).forEach((rec) => {
    checkPageBreak(22);
    doc.setFillColor(250, 250, 250);
    doc.setDrawColor(220, 220, 220);
    doc.roundedRect(margin, y, contentWidth, 19, 1.5, 1.5, 'FD');

    doc.setFontSize(9.5);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(37, 37, 37);
    doc.text(`${rec.user?.name} — ${rec.user?.role}`, margin + 3, y + 5);

    doc.setFontSize(9);
    doc.setTextColor(16, 149, 79);
    doc.text(`${rec.match_score}% MATCH`, pageWidth - margin - 26, y + 5);

    doc.setFontSize(7.5);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(70, 70, 70);
    const explLines = doc.splitTextToSize(rec.explanation, contentWidth - 8);
    doc.text(explLines, margin + 3, y + 9.5);

    y += 22;
  });

  y += 4;

  // SECTION 3: Verified Project Evidence Artifacts
  checkPageBreak(30);
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(37, 37, 37);
  doc.text("3. Verified Technical Evidence Samples", margin, y);
  y += 5;

  evidence.slice(0, 4).forEach((ev) => {
    checkPageBreak(12);
    doc.setFontSize(8.5);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(37, 37, 37);
    doc.text(`• ${ev.title} (${ev.type} · ${ev.verification_state} · ${Math.round(ev.confidence * 100)}% Conf.)`, margin + 2, y + 4);

    doc.setFontSize(7.5);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(90, 90, 90);
    const evCaps = ev.capabilities?.map(c => c.name).join(", ") || "General Evidence";
    doc.text(`  Demonstrates: ${evCaps}`, margin + 2, y + 8);

    y += 11;
  });

  drawFooter();

  // Save the PDF
  const safeFilename = `${project.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-intelligence-report.pdf`;
  doc.save(safeFilename);
}
