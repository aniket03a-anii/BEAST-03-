# BEAST-03!™ — Evidence-Driven Collaboration Intelligence

[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19-cyan.svg)](https://react.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.x-38bdf8.svg)](https://tailwindcss.com/)
[![Express](https://img.shields.io/badge/Backend-Express-green.svg)](https://expressjs.com/)
[![Gemini AI](https://img.shields.io/badge/AI-Google_Gemini-orange.svg)](https://ai.google.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.x-purple.svg)](https://vitejs.dev/)

> **“Don’t match people by what they claim. Match project needs with evidence of what people can contribute.”**

---

## 🌟 Executive Summary

**BEAST-03!™** is a project-first collaboration intelligence platform that connects engineering teams with contributors based on **demonstrated evidence of capability**, rather than self-declared resume buzzwords, endorsements, or claims.

Traditional developer platforms ask: *“Who is this person and what skills do they list?”*  
**BEAST-03!™** asks the critical engineering question: **“Who has actually demonstrated the specific capability our project is missing?”**

---

## 🔄 Core Product Principle

```
PROJECT ARCHITECTURE
         ↓
REQUIRED CAPABILITIES
         ↓
EXISTING TEAM CAPABILITIES
         ↓
CAPABILITY GAPS (Deficit Analysis)
         ↓
COMMUNITY EVIDENCE SEARCH
         ↓
CONTRIBUTOR MATCH (Deterministic Ranking)
         ↓
EVIDENCE EXPLANATION ("Why This Match?")
         ↓
COLLABORATION REQUEST
         ↓
NEW PROJECT EVIDENCE
         ↺
UPDATE CAPABILITY GRAPH
```

---

## 🚀 Key Features

### 1. Project Intelligence Matrix & Health Dashboard
- Real-time project coverage scoring ($78\%$ coverage, $8$ covered, $4$ open gaps).
- Visual status cards for Health, Gaps, Verified Evidence, and Top Matches.
- Multi-project workspace support (*Smart Agricultural Monitoring*, *AI Traffic Matrix*, *Healthcare Telemetry*, *Smart Microgrid*, *Drone Inspection*).

### 2. Capability Gap Engine ("Why is this a gap?")
- Automatically calculates capability deficits by evaluating project requirements against demonstrated team proof.
- Deep-dive breakdown contrasting **What Project Requires** vs **What Current Team Demonstrates** vs **Strictly Missing Evidence**.
- Directly links each deficit to community evidence search.

### 3. Transparent Deterministic Matching Engine
Matches are ranked using a traceable mathematical formula—never an opaque black box:
$$\text{Match Score} = (\text{Gap Coverage} \times 0.40) + (\text{Evidence Strength} \times 0.25) + (\text{Evidence Relevance} \times 0.15) + (\text{Recency} \times 0.10) + (\text{Collab Fit} \times 0.10)$$
- **"Why This Match?" Screen**: Transparent modal revealing every component weight, gap coverage bar, and direct clickable links to supporting evidence.

### 4. 5-Mode Phone-First Evidence Capture
Turn smartphones and workstations into real evidence capture tools:
- 📷 **Camera**: Real live video stream with snapshot capture for prototypes, breadboards, and hardware.
- 🎤 **Voice**: Audio recording with voice explanation transcription.
- 🖥 **Screen**: Capture oscilloscope traces, terminal outputs, and running dashboards.
- 📄 **Document**: Upload C/C++ firmware, KiCad schematics, and PDF specs.
- 🔗 **Project**: Link GitHub repositories and live demo endpoints.
- **Progressive AI Verification**: Shows live extraction pipeline steps (`Extracting capabilities...` $\rightarrow$ `Building evidence graph...` $\rightarrow$ `Checking project gaps...`).

### 5. Gemini AI Multimodal Analysis
- **Multimodal Evidence Extraction**: Extracts structured capabilities, confidence scores ($0.0 - 1.0$), and trust states from hardware photos, code snippets, and audio transcripts.
- **Project Requirements Extraction**: Automatically extracts architectural requirements directly from natural language project briefs.
- **Explainable Rationale Generation**: Synthesizes verified technical reasons for matching candidates to project gaps.

### 6. 5-Tier Evidence Trust Lifecycle
Capabilities are never labelled with arbitrary praise like *"You are an expert"*. Instead, capabilities advance through a verifiable trust lifecycle:
$$\text{CLAIMED} \longrightarrow \text{DETECTED} \longrightarrow \text{SUPPORTED} \longrightarrow \text{DEMONSTRATED} \longrightarrow \text{VERIFIED}$$

### 7. Authorized Authentication & Demo Personas
- **Single Sign-On (SSO)**: Authorized by Google Workspace, GitHub Developer, and Enterprise SAML.
- **Email & Password Authentication**: Full Sign In and Create Account portal with interactive Forgot Password support.
- **1-Click Instant Demo Personas**:
  - **Anii Demo**: *Project Builder & Architect* (Lead for Smart Agricultural Monitoring).
  - **Arjun Sharma**: *IoT / Embedded Developer* (Top 94% Match with 5 demonstrated hardware prototypes).
  - **Elena Rostova**: *Edge Computer Vision Specialist*.

### 8. Downloadable PDF & JSON Intelligence Reports
- **Summarized PDF Report**: Clean, printable executive briefing with project health score, gap analysis, top matched candidates, and verified proof artifacts.
- **Machine-Readable JSON Report**: Complete structured data export with mathematical formula weights, timestamps, and hierarchical taxonomy trees.

### 9. Interactive Capability Graph & Immutable Audit Trail
- **Visual Node Graph**: Interactive hierarchy across Embedded, Networking, Sensors & Hardware, AI, Backend & Cloud, UI/UX, and Security.
- **Audit Trail**: Realtime ledger logging every AI extraction, gap calculation, recommendation calculation, and collaboration event.

---

## 🏗 Technology Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS 4, Lucide Icons, Canvas Confetti, jsPDF.
- **Backend**: Node.js, Express, TypeScript (`tsx`).
- **AI Engine**: Google Gen AI SDK (`@google/genai`), Model: `gemini-3.8-flash`.
- **Database Architecture**: Relational in-memory store initialized with rich production-grade seed data.

---

## 🗄 Relational Database Schema

The database model follows strict relational principles across 10 tables:

1. **`users`**: User identities, roles, locations, availability, verified evidence count.
2. **`projects`**: Project specifications, domains, deadlines, health scores, and progress.
3. **`project_members`**: Team rosters and individual demonstrated capability mappings.
4. **`capabilities`**: Hierarchical taxonomy nodes with categories, parent-child links, and depth levels.
5. **`project_requirements`**: Required capabilities per project with importance (`HIGH`, `MEDIUM`, `LOW`) and target skill level.
6. **`evidence`**: Technical artifacts with types (`PROTOTYPE`, `DEMO`, `GITHUB`, `DOCUMENT`, etc.), verification states, and source URLs.
7. **`evidence_capabilities`**: Many-to-many junction linking evidence artifacts to capabilities with confidence and relevance scores.
8. **`capability_gaps`**: Identified project deficits with severity (`CRITICAL`, `HIGH`, `MODERATE`), deficit scores, and missing aspects.
9. **`recommendations`**: Scored contributor matches with mathematical weight breakdowns and explanation strings.
10. **`collaborations`**: Collaboration proposals with lifecycle states (`REQUESTED`, `ACCEPTED`, `ACTIVE`, `COMPLETED`, `DECLINED`).
11. **`audit_logs`**: Immutable event history tracking all database, AI, and user actions.

---

## 🎬 3-Minute Primary Demo Walkthrough

1. **Open Project**: The default workspace loads **Smart Agricultural Monitoring System**.
2. **Review Team Status**: Existing team demonstrates *Computer Vision*, *Backend*, and *UI/UX*.
3. **Inspect Capability Gaps**: The system detects 4 critical deficits: **IoT (91%)**, **Embedded C (84%)**, **MQTT (100%)**, and **Sensor Integration (88%)**.
4. **Find Contributors**: Click `[Find Contributors]` $\rightarrow$ System ranks community evidence.
5. **Evaluate Top Match**: **Arjun Sharma** is ranked at **94% Gap Coverage**.
6. **Click "Why This Match?"**: Inspect the deterministic formula ($40\%$ Gap Coverage, $25\%$ Evidence Strength, etc.) and supporting hardware artifacts.
7. **Inspect Evidence Artifact**: View *Smart Irrigation ESP32 Prototype* (`DEMONSTRATED`, 96% confidence).
8. **Send Collaboration Request**: Dispatch customized invitation with pre-selected missing capability tags.
9. **Export Intelligence Briefing**: Click `[Export Report]` $\rightarrow$ Download official PDF or JSON audit file.
10. **Review Audit Trail**: Verify that every step from gap detection to invitation dispatch is recorded in the activity ledger.

---

## 🛠 Local Setup & Development

### Prerequisites
- Node.js (v20+ recommended)
- npm or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/your-username/beast-03.git
cd beast-03

# Install dependencies
npm install

# Configure environment variables
cp .env.example .env
# Add your GEMINI_API_KEY to .env

# Start the full-stack development server
npm run dev
```

The application will be accessible at: `http://localhost:3000`

### Build for Production
```bash
npm run build
npm start
```

---

## 🔒 Security & Privacy

- **No Public Secret Leaks**: Gemini API keys and server secrets are strictly isolated on the backend.
- **Evidence Visibility Scopes**: Artifacts support `PUBLIC`, `COMMUNITY`, `TEAM_ONLY`, and `PRIVATE` access levels.
- **Traceable Provenance**: Every recommendation cites explicit evidence IDs; no synthetic hallucinations.

---

## 📄 License

Licensed under the Apache-2.0 License.  
Designed & built as an Evidence-Driven Collaboration Intelligence Platform.
