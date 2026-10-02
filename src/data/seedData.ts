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

// 1. Fictional Users (15+)
export const seedUsers: User[] = [
  {
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
  },
  {
    id: 'user-arjun',
    name: 'Arjun Sharma',
    email: 'arjun.sharma@embedded.dev',
    avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    role: 'IoT / Embedded Systems Specialist',
    bio: 'Specializing in ESP32 dual-core firmware, low-power LoRaWAN nodes, and ultra-reliable MQTT edge gateways.',
    location: 'Bangalore, India',
    availability: 'Open for high-impact IoT collaboration (15 hrs/wk)',
    is_demo_user: false,
    verified_evidence_count: 19,
    created_at: '2026-01-14T09:30:00Z',
    updated_at: '2026-09-28T14:20:00Z'
  },
  {
    id: 'user-elena',
    name: 'Elena Rostova',
    email: 'elena.rostova@cv-edge.ai',
    avatar_url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    role: 'Edge Computer Vision Engineer',
    bio: 'Deploying YOLOv10 and custom MobileNet models on Raspberry Pi 5 and Google Coral Edge TPUs.',
    location: 'Berlin, Germany',
    availability: 'Advisory / Part-time (10 hrs/wk)',
    is_demo_user: false,
    verified_evidence_count: 16,
    created_at: '2026-01-20T11:15:00Z',
    updated_at: '2026-09-18T16:00:00Z'
  },
  {
    id: 'user-maya',
    name: 'Maya Patel',
    email: 'maya.patel@cloudstack.io',
    avatar_url: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    role: 'Cloud Ingestion & Distributed Systems',
    bio: 'Kafka pipelines, TimescaleDB telemetry aggregations, and resilient Go/Node.js microservices.',
    location: 'Austin, TX',
    availability: 'Active team member',
    is_demo_user: false,
    verified_evidence_count: 12,
    created_at: '2026-02-01T10:00:00Z',
    updated_at: '2026-09-22T08:30:00Z'
  },
  {
    id: 'user-devraj',
    name: 'Devraj Sen',
    email: 'devraj.sen@firmwarelab.org',
    avatar_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    role: 'Industrial Firmware & Hardware Architect',
    bio: 'Custom PCB design, STM32 and Nordic nRF52 BLE firmware, RTOS-based industrial telemetry.',
    location: 'Pune, India',
    availability: 'Available for hardware consultation',
    is_demo_user: false,
    verified_evidence_count: 15,
    created_at: '2026-02-12T14:10:00Z',
    updated_at: '2026-09-15T11:00:00Z'
  },
  {
    id: 'user-sarah',
    name: 'Sarah Lin',
    email: 'sarah.lin@secureshield.tech',
    avatar_url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    role: 'Embedded Security & Cryptography',
    bio: 'Hardware Root of Trust, Secure Boot on microcontrollers, mTLS authentication over MQTT.',
    location: 'Seattle, WA',
    availability: 'Part-time (8 hrs/wk)',
    is_demo_user: false,
    verified_evidence_count: 11,
    created_at: '2026-02-28T09:00:00Z',
    updated_at: '2026-09-25T13:40:00Z'
  },
  {
    id: 'user-marcus',
    name: 'Marcus Vance',
    email: 'marcus.vance@agritech-robotics.org',
    avatar_url: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
    role: 'Precision Agriculture Agronomist & Engineer',
    bio: 'Soil moisture tension sensors (Teros 12), NDVI multispectral imaging, closed-loop drip fertigation.',
    location: 'Davis, CA',
    availability: 'Consulting & Field Deployments',
    is_demo_user: false,
    verified_evidence_count: 14,
    created_at: '2026-03-05T12:00:00Z',
    updated_at: '2026-09-19T09:15:00Z'
  },
  {
    id: 'user-liam',
    name: 'Liam O\'Connor',
    email: 'liam.oc@reactui.dev',
    avatar_url: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&auto=format&fit=crop&q=80',
    role: 'Senior UI/UX & Realtime Dashboards',
    bio: 'Building low-latency telemetry canvas renderers, WebGL geospatial displays, and clean design systems.',
    location: 'Dublin, Ireland',
    availability: 'Active team member',
    is_demo_user: false,
    verified_evidence_count: 18,
    created_at: '2026-01-18T10:00:00Z',
    updated_at: '2026-09-29T17:00:00Z'
  },
  {
    id: 'user-kenji',
    name: 'Kenji Sato',
    email: 'kenji.sato@edgeinference.jp',
    avatar_url: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
    role: 'Edge ML & TinyML Quantization',
    bio: 'TensorFlow Lite for Microcontrollers (TFLM), INT8 model quantization for Cortex-M4/M33 and ESP32-S3.',
    location: 'Kyoto, Japan',
    availability: 'Open for research collaborations',
    is_demo_user: false,
    verified_evidence_count: 13,
    created_at: '2026-03-12T07:20:00Z',
    updated_at: '2026-09-21T12:00:00Z'
  },
  {
    id: 'user-priya',
    name: 'Priya Nair',
    email: 'priya.nair@sensornetworks.net',
    avatar_url: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=150&auto=format&fit=crop&q=80',
    role: 'Mesh Networking & Wireless Protocols',
    bio: 'ESP-NOW mesh implementations, Bluetooth Mesh, Thread / Matter protocols for low-latency nodes.',
    location: 'Singapore',
    availability: 'Available (12 hrs/wk)',
    is_demo_user: false,
    verified_evidence_count: 10,
    created_at: '2026-03-20T08:50:00Z',
    updated_at: '2026-09-24T15:10:00Z'
  },
  {
    id: 'user-alex',
    name: 'Alex Rivera',
    email: 'alex.rivera@fullstack-edge.com',
    avatar_url: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
    role: 'Full-Stack Distributed Systems Engineer',
    bio: 'High-throughput WebSocket backends, TimescaleDB, Dockerized edge deployments, and GraphQL APIs.',
    location: 'Toronto, Canada',
    availability: 'Active team member',
    is_demo_user: false,
    verified_evidence_count: 15,
    created_at: '2026-02-15T13:30:00Z',
    updated_at: '2026-09-27T10:45:00Z'
  },
  {
    id: 'user-sophia',
    name: 'Sophia Chen',
    email: 'sophia.chen@agridata.io',
    avatar_url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    role: 'Computer Vision & Multispectral Drone Specialist',
    bio: 'Crop canopy health analysis, automated leaf disease classification using PyTorch and OpenCV.',
    location: 'Vancouver, Canada',
    availability: 'Active team member',
    is_demo_user: false,
    verified_evidence_count: 17,
    created_at: '2026-01-25T11:00:00Z',
    updated_at: '2026-09-26T14:30:00Z'
  },
  {
    id: 'user-carlos',
    name: 'Carlos Gomez',
    email: 'carlos.g@solarenergyiot.org',
    avatar_url: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
    role: 'Solar Power Management & Battery Telemetry',
    bio: 'MPPT solar charge controller firmware, LiFePO4 battery management systems, ultra-deep sleep modes.',
    location: 'Valencia, Spain',
    availability: 'Available (15 hrs/wk)',
    is_demo_user: false,
    verified_evidence_count: 9,
    created_at: '2026-04-02T16:00:00Z',
    updated_at: '2026-09-17T09:20:00Z'
  },
  {
    id: 'user-nina',
    name: 'Nina Kowalski',
    email: 'nina.k@embedded-rust.org',
    avatar_url: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&auto=format&fit=crop&q=80',
    role: 'Embedded Systems & Rust Firmware Developer',
    bio: 'Safe concurrency on bare metal microcontrollers, Embassy async runtime for STM32 and ESP32-C3.',
    location: 'Warsaw, Poland',
    availability: 'Open for Rust/Embedded projects',
    is_demo_user: false,
    verified_evidence_count: 14,
    created_at: '2026-04-10T10:30:00Z',
    updated_at: '2026-09-28T08:15:00Z'
  },
  {
    id: 'user-jamal',
    name: 'Jamal Thorne',
    email: 'jamal.thorne@loramesh.tech',
    avatar_url: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=150&auto=format&fit=crop&q=80',
    role: 'Long-Range Wireless RF & LoRaWAN Architect',
    bio: 'Deploying ChirpStack servers, 868/915MHz gateway repeaters, and agricultural environmental sensors.',
    location: 'Nairobi, Kenya',
    availability: 'Available for field trials',
    is_demo_user: false,
    verified_evidence_count: 12,
    created_at: '2026-04-18T14:40:00Z',
    updated_at: '2026-09-22T16:50:00Z'
  }
];

// 2. Hierarchical Capabilities (50+)
export const seedCapabilities: Capability[] = [
  // Embedded
  { id: 'cap-embedded', name: 'Embedded Systems', category: 'Embedded', description: 'Microcontroller programming, hardware abstraction, and real-time execution.', parent_id: null, level: 1, created_at: '2026-01-01T00:00:00Z' },
  { id: 'cap-esp32', name: 'ESP32', category: 'Embedded', description: 'Espressif dual-core Xtensa / RISC-V SoC firmware, ESP-IDF, and Wi-Fi/BLE subsystems.', parent_id: 'cap-embedded', level: 2, created_at: '2026-01-01T00:00:00Z' },
  { id: 'cap-embedded-c', name: 'Embedded C', category: 'Embedded', description: 'Deterministic bare-metal and RTOS C programming with strict memory safety.', parent_id: 'cap-embedded', level: 2, created_at: '2026-01-01T00:00:00Z' },
  { id: 'cap-arduino', name: 'Arduino Platform', category: 'Embedded', description: 'Rapid hardware prototyping and standard peripheral interfacing.', parent_id: 'cap-embedded', level: 2, created_at: '2026-01-01T00:00:00Z' },
  { id: 'cap-freertos', name: 'FreeRTOS', category: 'Embedded', description: 'Real-time multi-tasking, queues, semaphores, and task notifications.', parent_id: 'cap-embedded', level: 2, created_at: '2026-01-01T00:00:00Z' },
  { id: 'cap-stm32', name: 'STM32 / ARM Cortex', category: 'Embedded', description: 'STM32CubeIDE, HAL drivers, DMA controllers, and low-power standby modes.', parent_id: 'cap-embedded', level: 2, created_at: '2026-01-01T00:00:00Z' },
  { id: 'cap-micropython', name: 'MicroPython', category: 'Embedded', description: 'Python 3 execution directly on microcontrollers for rapid sensor scripting.', parent_id: 'cap-embedded', level: 2, created_at: '2026-01-01T00:00:00Z' },

  // Networking / IoT
  { id: 'cap-iot', name: 'IoT Architecture', category: 'Networking', description: 'End-to-end device telemetry pipelines, edge-to-cloud topology, and device shadows.', parent_id: null, level: 1, created_at: '2026-01-01T00:00:00Z' },
  { id: 'cap-mqtt', name: 'MQTT', category: 'Networking', description: 'Lightweight publish/subscribe messaging protocol with QoS levels and retain flags.', parent_id: 'cap-iot', level: 2, created_at: '2026-01-01T00:00:00Z' },
  { id: 'cap-lorawan', name: 'LoRaWAN', category: 'Networking', description: 'Long-range low-power sub-GHz wireless wide area network protocol.', parent_id: 'cap-iot', level: 2, created_at: '2026-01-01T00:00:00Z' },
  { id: 'cap-ble', name: 'Bluetooth Low Energy (BLE)', category: 'Networking', description: 'GATT profiles, peripheral/central roles, and low-energy advertisements.', parent_id: 'cap-iot', level: 2, created_at: '2026-01-01T00:00:00Z' },
  { id: 'cap-websockets', name: 'WebSockets', category: 'Networking', description: 'Full-duplex bidirectional streaming connections for live telemetry graphs.', parent_id: 'cap-iot', level: 2, created_at: '2026-01-01T00:00:00Z' },
  { id: 'cap-coap', name: 'CoAP Protocol', category: 'Networking', description: 'Constrained Application Protocol for constrained nodes in UDP environments.', parent_id: 'cap-iot', level: 2, created_at: '2026-01-01T00:00:00Z' },

  // Sensors & Hardware
  { id: 'cap-sensors', name: 'Sensor Integration', category: 'Sensors & Hardware', description: 'Interfacing environmental, chemical, and physical transducers.', parent_id: null, level: 1, created_at: '2026-01-01T00:00:00Z' },
  { id: 'cap-i2c-spi', name: 'I2C / SPI Buses', category: 'Sensors & Hardware', description: 'Synchronous serial communication protocols with hardware peripheral addressing.', parent_id: 'cap-sensors', level: 2, created_at: '2026-01-01T00:00:00Z' },
  { id: 'cap-adc', name: 'ADC Calibration & Conditioning', category: 'Sensors & Hardware', description: 'Analog signal filtering, voltage divider tuning, and ADC attenuation curves.', parent_id: 'cap-sensors', level: 2, created_at: '2026-01-01T00:00:00Z' },
  { id: 'cap-lowpower', name: 'Power Optimization & Solar', category: 'Sensors & Hardware', description: 'Deep sleep modes, RTC wakeup timers, and solar MPPT harvest circuits.', parent_id: 'cap-sensors', level: 2, created_at: '2026-01-01T00:00:00Z' },
  { id: 'cap-pcb', name: 'Custom PCB Design', category: 'Sensors & Hardware', description: 'Schematic capture, 4-layer routing, impedance matching, and Gerber files.', parent_id: 'cap-sensors', level: 2, created_at: '2026-01-01T00:00:00Z' },

  // Edge AI & AI
  { id: 'cap-ai', name: 'Artificial Intelligence', category: 'AI', description: 'Machine learning, deep neural nets, and statistical modeling.', parent_id: null, level: 1, created_at: '2026-01-01T00:00:00Z' },
  { id: 'cap-edge-ai', name: 'Edge Processing & TinyML', category: 'AI', description: 'Local inference on microcontrollers or edge gateways without cloud latency.', parent_id: 'cap-ai', level: 2, created_at: '2026-01-01T00:00:00Z' },
  { id: 'cap-cv', name: 'Computer Vision', category: 'AI', description: 'Image filtering, OpenCV pipelines, and optical inspection.', parent_id: 'cap-ai', level: 2, created_at: '2026-01-01T00:00:00Z' },
  { id: 'cap-object-detection', name: 'Object Detection & Segmentation', category: 'AI', description: 'YOLO, SSD, and Mask R-CNN object bounding and semantic segmentation.', parent_id: 'cap-cv', level: 3, created_at: '2026-01-01T00:00:00Z' },
  { id: 'cap-multispectral', name: 'Multispectral NDVI Analysis', category: 'AI', description: 'Near-infrared and normalized difference vegetation index calculations.', parent_id: 'cap-cv', level: 3, created_at: '2026-01-01T00:00:00Z' },
  { id: 'cap-nlp', name: 'Natural Language Processing', category: 'AI', description: 'Information extraction, text analysis, and semantic query matching.', parent_id: 'cap-ai', level: 2, created_at: '2026-01-01T00:00:00Z' },
  { id: 'cap-timeseries', name: 'Time-Series Forecasting', category: 'AI', description: 'Predictive modeling for sensor drift, temperature forecasts, and anomaly detection.', parent_id: 'cap-ai', level: 2, created_at: '2026-01-01T00:00:00Z' },

  // Backend & Cloud
  { id: 'cap-backend', name: 'Backend Development', category: 'Backend & Cloud', description: 'Scalable server architecture, REST/GraphQL APIs, and data storage.', parent_id: null, level: 1, created_at: '2026-01-01T00:00:00Z' },
  { id: 'cap-nodejs', name: 'Node.js & TypeScript', category: 'Backend & Cloud', description: 'Asynchronous event-driven server backends with static typing.', parent_id: 'cap-backend', level: 2, created_at: '2026-01-01T00:00:00Z' },
  { id: 'cap-postgres', name: 'PostgreSQL & TimescaleDB', category: 'Backend & Cloud', description: 'Relational data modeling, hypertables, and continuous telemetry aggregates.', parent_id: 'cap-backend', level: 2, created_at: '2026-01-01T00:00:00Z' },
  { id: 'cap-docker', name: 'Docker & Edge Containerization', category: 'Backend & Cloud', description: 'Lightweight multi-arch container packaging for Raspberry Pi and cloud.', parent_id: 'cap-backend', level: 2, created_at: '2026-01-01T00:00:00Z' },

  // UI/UX
  { id: 'cap-uiux', name: 'UI/UX & Frontend', category: 'UI/UX', description: 'Human-computer interaction, visual hierarchies, and responsive web apps.', parent_id: null, level: 1, created_at: '2026-01-01T00:00:00Z' },
  { id: 'cap-dashboard', name: 'Dashboard Development', category: 'UI/UX', description: 'Real-time telemetry charting, spatial maps, and anomaly alert widgets.', parent_id: 'cap-uiux', level: 2, created_at: '2026-01-01T00:00:00Z' },
  { id: 'cap-react', name: 'React & Component Architecture', category: 'UI/UX', description: 'Modular declarative frontend systems with responsive state orchestration.', parent_id: 'cap-uiux', level: 2, created_at: '2026-01-01T00:00:00Z' },

  // Security
  { id: 'cap-security', name: 'Hardware & Network Security', category: 'Security', description: 'End-to-end device authentication, TLS 1.3, and cryptographic roots.', parent_id: null, level: 1, created_at: '2026-01-01T00:00:00Z' },
  { id: 'cap-mtls', name: 'mTLS & Device Certificates', category: 'Security', description: 'Mutual TLS certificate validation for edge devices transmitting MQTT payloads.', parent_id: 'cap-security', level: 2, created_at: '2026-01-01T00:00:00Z' }
];

// 3. Projects (5 total, 1 primary demo project)
export const seedProjects: Project[] = [
  {
    id: 'proj-smart-agri',
    owner_id: 'user-demo',
    name: 'Smart Agricultural Monitoring System',
    description: 'A smart agriculture platform using IoT sensors, ESP32 devices, MQTT communication, edge processing, backend services, and a monitoring dashboard.',
    domain: 'AgTech & IoT Systems',
    status: 'ACTIVE',
    deadline: '2026-12-15T00:00:00Z',
    progress: 72,
    health_score: 78,
    created_at: '2026-08-01T09:00:00Z',
    updated_at: '2026-10-01T15:30:00Z',
    members_count: 4,
    capabilities_count: 12,
    covered_count: 8,
    gaps_count: 4,
    evidence_count: 27
  },
  {
    id: 'proj-traffic-ai',
    owner_id: 'user-demo',
    name: 'AI Traffic & Pedestrian Safety Matrix',
    description: 'Vision-based real-time pedestrian crosswalk and traffic density analysis at municipal intersections.',
    domain: 'Smart Cities & Computer Vision',
    status: 'ACTIVE',
    deadline: '2027-01-30T00:00:00Z',
    progress: 58,
    health_score: 84,
    created_at: '2026-07-15T10:00:00Z',
    updated_at: '2026-09-28T18:00:00Z',
    members_count: 3,
    capabilities_count: 9,
    covered_count: 7,
    gaps_count: 2,
    evidence_count: 18
  },
  {
    id: 'proj-health-telemetry',
    owner_id: 'user-maya',
    name: 'Continuous Healthcare Remote Patient Assistant',
    description: 'Wearable BLE pulse oximetry, ECG telemetry, and FHIR-compliant secure edge gateways for cardiac monitoring.',
    domain: 'MedTech & Wearables',
    status: 'PLANNING',
    deadline: '2027-03-31T00:00:00Z',
    progress: 40,
    health_score: 65,
    created_at: '2026-08-20T14:00:00Z',
    updated_at: '2026-09-30T11:20:00Z',
    members_count: 2,
    capabilities_count: 11,
    covered_count: 5,
    gaps_count: 6,
    evidence_count: 14
  },
  {
    id: 'proj-smart-microgrid',
    owner_id: 'user-carlos',
    name: 'Autonomous Micro-Grid & Smart Home Energy Router',
    description: 'Distributed solar inverter load-balancing with real-time Zigbee power meters and edge frequency regulation.',
    domain: 'CleanTech & Energy',
    status: 'ACTIVE',
    deadline: '2026-11-20T00:00:00Z',
    progress: 81,
    health_score: 90,
    created_at: '2026-06-10T08:00:00Z',
    updated_at: '2026-09-25T16:45:00Z',
    members_count: 3,
    capabilities_count: 10,
    covered_count: 9,
    gaps_count: 1,
    evidence_count: 22
  },
  {
    id: 'proj-drone-inspect',
    owner_id: 'user-sophia',
    name: 'Infrastructure Inspection Autonomous Drone Fleet',
    description: 'Autonomous high-voltage power line and bridge inspection using PX4 autopilot, RTK GPS, and optical defect detection.',
    domain: 'Robotics & Aerospace',
    status: 'ACTIVE',
    deadline: '2027-02-28T00:00:00Z',
    progress: 64,
    health_score: 74,
    created_at: '2026-07-01T09:30:00Z',
    updated_at: '2026-09-29T13:00:00Z',
    members_count: 4,
    capabilities_count: 13,
    covered_count: 9,
    gaps_count: 4,
    evidence_count: 19
  }
];

// 4. Project Members for Smart Agriculture System
// Note: Existing team capabilities are Computer Vision, Backend, UI/UX!
export const seedProjectMembers: ProjectMember[] = [
  {
    id: 'pm-1',
    project_id: 'proj-smart-agri',
    user_id: 'user-demo',
    role: 'Project Lead & Architect',
    joined_at: '2026-08-01T09:00:00Z',
    demonstrated_capabilities: ['cap-backend', 'cap-nodejs', 'cap-postgres']
  },
  {
    id: 'pm-2',
    project_id: 'proj-smart-agri',
    user_id: 'user-sophia',
    role: 'Computer Vision Specialist',
    joined_at: '2026-08-05T10:00:00Z',
    demonstrated_capabilities: ['cap-cv', 'cap-object-detection', 'cap-multispectral']
  },
  {
    id: 'pm-3',
    project_id: 'proj-smart-agri',
    user_id: 'user-alex',
    role: 'Backend Infrastructure Engineer',
    joined_at: '2026-08-10T14:00:00Z',
    demonstrated_capabilities: ['cap-backend', 'cap-nodejs', 'cap-postgres', 'cap-docker']
  },
  {
    id: 'pm-4',
    project_id: 'proj-smart-agri',
    user_id: 'user-liam',
    role: 'Frontend UI/UX Designer',
    joined_at: '2026-08-15T11:00:00Z',
    demonstrated_capabilities: ['cap-uiux', 'cap-dashboard', 'cap-react']
  }
];

// 5. Project Requirements for Smart Agricultural Monitoring System
export const seedRequirements: ProjectRequirement[] = [
  {
    id: 'req-1',
    project_id: 'proj-smart-agri',
    capability_id: 'cap-iot',
    importance: 'HIGH',
    required_level: 'ADVANCED',
    description: 'End-to-end device telemetry pipelines connecting field nodes to central edge gateways.',
    created_at: '2026-08-02T10:00:00Z',
    is_covered: false
  },
  {
    id: 'req-2',
    project_id: 'proj-smart-agri',
    capability_id: 'cap-esp32',
    importance: 'HIGH',
    required_level: 'ADVANCED',
    description: 'ESP32 firmware handling sensor interrupts, deep sleep RTC cycling, and reliable Wi-Fi/mesh packets.',
    created_at: '2026-08-02T10:05:00Z',
    is_covered: false
  },
  {
    id: 'req-3',
    project_id: 'proj-smart-agri',
    capability_id: 'cap-embedded-c',
    importance: 'HIGH',
    required_level: 'ADVANCED',
    description: 'Deterministic embedded C code for bare-metal sensor sampling and watchdog timer resiliency.',
    created_at: '2026-08-02T10:10:00Z',
    is_covered: false
  },
  {
    id: 'req-4',
    project_id: 'proj-smart-agri',
    capability_id: 'cap-mqtt',
    importance: 'HIGH',
    required_level: 'ADVANCED',
    description: 'Low-overhead MQTT broker connection with QoS 1 telemetry and last-will retention topics.',
    created_at: '2026-08-02T10:15:00Z',
    is_covered: false
  },
  {
    id: 'req-5',
    project_id: 'proj-smart-agri',
    capability_id: 'cap-sensors',
    importance: 'HIGH',
    required_level: 'ADVANCED',
    description: 'Integration of soil moisture capacitance, SDI-12 probes, DHT22 ambient sensors, and solar battery monitoring.',
    created_at: '2026-08-02T10:20:00Z',
    is_covered: false
  },
  {
    id: 'req-6',
    project_id: 'proj-smart-agri',
    capability_id: 'cap-edge-ai',
    importance: 'HIGH',
    required_level: 'INTERMEDIATE',
    description: 'Local edge anomaly detection and crop stress calculation prior to transmitting upstream.',
    created_at: '2026-08-02T10:25:00Z',
    is_covered: false
  },
  {
    id: 'req-7',
    project_id: 'proj-smart-agri',
    capability_id: 'cap-backend',
    importance: 'MEDIUM',
    required_level: 'ADVANCED',
    description: 'High-throughput Node.js microservice ingesting 10,000 telemetry readings per second.',
    created_at: '2026-08-02T10:30:00Z',
    is_covered: true
  },
  {
    id: 'req-8',
    project_id: 'proj-smart-agri',
    capability_id: 'cap-dashboard',
    importance: 'MEDIUM',
    required_level: 'INTERMEDIATE',
    description: 'Real-time telemetry monitoring dashboard with geospatial plot mapping and trigger alert thresholds.',
    created_at: '2026-08-02T10:35:00Z',
    is_covered: true
  },
  {
    id: 'req-9',
    project_id: 'proj-smart-agri',
    capability_id: 'cap-cv',
    importance: 'MEDIUM',
    required_level: 'ADVANCED',
    description: 'Aerial drone image ingestion for automated crop health and weed density detection.',
    created_at: '2026-08-02T10:40:00Z',
    is_covered: true
  },
  {
    id: 'req-10',
    project_id: 'proj-smart-agri',
    capability_id: 'cap-postgres',
    importance: 'MEDIUM',
    required_level: 'INTERMEDIATE',
    description: 'TimescaleDB hypertable partitioning for historical soil moisture and climate trend series.',
    created_at: '2026-08-02T10:45:00Z',
    is_covered: true
  }
];

// 6. Capability Gaps for Smart Agricultural Monitoring System
export const seedCapabilityGaps: CapabilityGap[] = [
  {
    id: 'gap-iot',
    project_id: 'proj-smart-agri',
    capability_id: 'cap-iot',
    severity: 'CRITICAL',
    required_level: 'ADVANCED',
    current_level: 'NONE',
    gap_score: 91,
    status: 'OPEN',
    missing_aspects: [
      'Field gateway failover and queuing mechanisms',
      'Low-bandwidth telemetry encoding (CBOR/Protobuf)',
      'Sub-GHz and long range radio architecture'
    ],
    team_coverage_summary: 'Existing team has zero verified IoT architecture experience; skills concentrated in cloud backend and computer vision.',
    created_at: '2026-08-03T11:00:00Z'
  },
  {
    id: 'gap-embedded',
    project_id: 'proj-smart-agri',
    capability_id: 'cap-embedded-c',
    severity: 'CRITICAL',
    required_level: 'ADVANCED',
    current_level: 'BASIC',
    gap_score: 84,
    status: 'OPEN',
    missing_aspects: [
      'ESP32 dual-core FreeRTOS firmware',
      'Hardware interrupt debounce routines',
      'Deterministic memory management and watchdog timers'
    ],
    team_coverage_summary: 'Team member Alex has written hobby Arduino scripts, but lacks bare-metal deterministic C production experience.',
    created_at: '2026-08-03T11:05:00Z'
  },
  {
    id: 'gap-mqtt',
    project_id: 'proj-smart-agri',
    capability_id: 'cap-mqtt',
    severity: 'CRITICAL',
    required_level: 'ADVANCED',
    current_level: 'NONE',
    gap_score: 100,
    status: 'OPEN',
    missing_aspects: [
      'MQTT broker clustering and Mosquitto bridge setup',
      'QoS 1 acknowledgment verification over lossy cell links',
      'Topic taxonomy design (site/zone/node/metric)'
    ],
    team_coverage_summary: 'No team member has verified or demonstrated MQTT broker or publisher implementation.',
    created_at: '2026-08-03T11:10:00Z'
  },
  {
    id: 'gap-sensors',
    project_id: 'proj-smart-agri',
    capability_id: 'cap-sensors',
    severity: 'HIGH',
    required_level: 'ADVANCED',
    current_level: 'BASIC',
    gap_score: 88,
    status: 'OPEN',
    missing_aspects: [
      'Analog capacitive sensor temperature drift compensation',
      'I2C bus pull-up resistor calculation and line capacitance',
      'SDI-12 1200 baud single-wire protocol implementation'
    ],
    team_coverage_summary: 'Team has evaluated sensor datasheets, but lacks demonstrated hardware calibration evidence.',
    created_at: '2026-08-03T11:15:00Z'
  },
  {
    id: 'gap-edge-ai',
    project_id: 'proj-smart-agri',
    capability_id: 'cap-edge-ai',
    severity: 'HIGH',
    required_level: 'INTERMEDIATE',
    current_level: 'BASIC',
    gap_score: 72,
    status: 'OPEN',
    missing_aspects: [
      'Quantized INT8 model execution on ESP32-S3 / Raspberry Pi',
      'Sensor stream anomaly window calculation in memory',
      'Local alert gating to prevent cellular bandwidth spikes'
    ],
    team_coverage_summary: 'Sophia has strong server-side PyTorch CV models, but lacks embedded micro-edge inference execution.',
    created_at: '2026-08-03T11:20:00Z'
  }
];

// 7. Evidence Items (50+ items, highlighting Arjun Sharma's demonstrated artifacts!)
export const seedEvidence: Evidence[] = [
  // Primary Contributor: Arjun Sharma
  {
    id: 'evi-arjun-1',
    user_id: 'user-arjun',
    project_id: null,
    type: 'PROTOTYPE',
    title: 'Smart Irrigation ESP32 Prototype',
    description: 'Solar-powered dual-core ESP32-S3 irrigation node. Runs FreeRTOS with task priority scheduling for capacitive soil moisture sampling, SDI-12 protocol, and automated valve relay firing with deep sleep (18µA idle).',
    source_url: 'https://github.com/fictional-demo/esp32-solar-irrigation',
    file_url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format&fit=crop&q=80',
    thumbnail_url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=200&auto=format&fit=crop&q=80',
    visibility: 'PUBLIC',
    confidence: 0.96,
    verification_state: 'DEMONSTRATED',
    created_at: '2026-07-14T14:30:00Z',
    updated_at: '2026-09-12T10:00:00Z',
    capabilities: [
      { id: 'cap-esp32', name: 'ESP32', confidence: 0.98, relevance: 0.96, category: 'Embedded' },
      { id: 'cap-embedded-c', name: 'Embedded C', confidence: 0.95, relevance: 0.94, category: 'Embedded' },
      { id: 'cap-sensors', name: 'Sensor Integration', confidence: 0.96, relevance: 0.95, category: 'Sensors & Hardware' },
      { id: 'cap-iot', name: 'IoT Architecture', confidence: 0.97, relevance: 0.96, category: 'Networking' },
      { id: 'cap-lowpower', name: 'Power Optimization & Solar', confidence: 0.94, relevance: 0.92, category: 'Sensors & Hardware' }
    ]
  },
  {
    id: 'evi-arjun-2',
    user_id: 'user-arjun',
    project_id: null,
    type: 'DEMO',
    title: 'MQTT Edge Gateway & Telemetry Bridge',
    description: 'Hardware edge gateway bridging 24 local ESP-NOW nodes into an industrial Mosquitto MQTT broker with TLS mutual authentication, CBOR payload compression, and local SQLite offline spillover buffer.',
    source_url: 'https://github.com/fictional-demo/mqtt-edge-gateway-bridge',
    file_url: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=600&auto=format&fit=crop&q=80',
    thumbnail_url: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=200&auto=format&fit=crop&q=80',
    visibility: 'PUBLIC',
    confidence: 0.94,
    verification_state: 'DEMONSTRATED',
    created_at: '2026-06-20T09:15:00Z',
    updated_at: '2026-09-08T16:20:00Z',
    capabilities: [
      { id: 'cap-mqtt', name: 'MQTT', confidence: 0.97, relevance: 0.98, category: 'Networking' },
      { id: 'cap-iot', name: 'IoT Architecture', confidence: 0.95, relevance: 0.95, category: 'Networking' },
      { id: 'cap-edge-ai', name: 'Edge Processing & TinyML', confidence: 0.91, relevance: 0.88, category: 'AI' },
      { id: 'cap-embedded-c', name: 'Embedded C', confidence: 0.93, relevance: 0.90, category: 'Embedded' }
    ]
  },
  {
    id: 'evi-arjun-3',
    user_id: 'user-arjun',
    project_id: null,
    type: 'PROJECT',
    title: 'Industrial Soil & Ambient Sensor Node',
    description: 'Ruggedized IP67 enclosure housing multi-depth FDR soil moisture probe, Sensirion SHT31 humidity/temp sensor, and optical rain gauge. Features calibrated ADC lookup tables with polynomial regression curves.',
    source_url: 'https://hardware-os.demo/nodes/soil-node-v3',
    file_url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&auto=format&fit=crop&q=80',
    thumbnail_url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=200&auto=format&fit=crop&q=80',
    visibility: 'PUBLIC',
    confidence: 0.95,
    verification_state: 'DEMONSTRATED',
    created_at: '2026-05-18T13:40:00Z',
    updated_at: '2026-08-30T11:00:00Z',
    capabilities: [
      { id: 'cap-sensors', name: 'Sensor Integration', confidence: 0.98, relevance: 0.97, category: 'Sensors & Hardware' },
      { id: 'cap-adc', name: 'ADC Calibration & Conditioning', confidence: 0.96, relevance: 0.95, category: 'Sensors & Hardware' },
      { id: 'cap-i2c-spi', name: 'I2C / SPI Buses', confidence: 0.95, relevance: 0.93, category: 'Sensors & Hardware' },
      { id: 'cap-esp32', name: 'ESP32', confidence: 0.94, relevance: 0.92, category: 'Embedded' }
    ]
  },
  {
    id: 'evi-arjun-4',
    user_id: 'user-arjun',
    project_id: null,
    type: 'PROTOTYPE',
    title: 'Low-Power IoT Monitoring System',
    description: 'Battery-backed 18650 power supply with TP4056 charging IC and low-dropout regulator (LDO) enabling 14 months of autonomous field runtime with periodic 15-minute sensor bursts.',
    source_url: 'https://github.com/fictional-demo/low-power-iot-station',
    file_url: 'https://images.unsplash.com/photo-1555664424-778a1e5e1b48?w=600&auto=format&fit=crop&q=80',
    thumbnail_url: 'https://images.unsplash.com/photo-1555664424-778a1e5e1b48?w=200&auto=format&fit=crop&q=80',
    visibility: 'PUBLIC',
    confidence: 0.95,
    verification_state: 'DEMONSTRATED',
    created_at: '2026-04-10T11:00:00Z',
    updated_at: '2026-08-15T14:00:00Z',
    capabilities: [
      { id: 'cap-lowpower', name: 'Power Optimization & Solar', confidence: 0.97, relevance: 0.95, category: 'Sensors & Hardware' },
      { id: 'cap-iot', name: 'IoT Architecture', confidence: 0.94, relevance: 0.92, category: 'Networking' },
      { id: 'cap-esp32', name: 'ESP32', confidence: 0.93, relevance: 0.91, category: 'Embedded' }
    ]
  },
  {
    id: 'evi-arjun-5',
    user_id: 'user-arjun',
    project_id: null,
    type: 'DEMO',
    title: 'Edge Processing & Local Filter Demonstration',
    description: 'Real-time statistical anomaly filter implemented directly in C on an ESP32 edge node to prune noisy sensor readings before triggering alert events or cellular transmission.',
    source_url: 'https://gist.github.com/fictional-demo/edge-anomaly-filter',
    file_url: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&auto=format&fit=crop&q=80',
    thumbnail_url: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=200&auto=format&fit=crop&q=80',
    visibility: 'PUBLIC',
    confidence: 0.92,
    verification_state: 'DEMONSTRATED',
    created_at: '2026-03-22T15:20:00Z',
    updated_at: '2026-08-10T09:30:00Z',
    capabilities: [
      { id: 'cap-edge-ai', name: 'Edge Processing & TinyML', confidence: 0.93, relevance: 0.94, category: 'AI' },
      { id: 'cap-embedded-c', name: 'Embedded C', confidence: 0.94, relevance: 0.92, category: 'Embedded' },
      { id: 'cap-esp32', name: 'ESP32', confidence: 0.92, relevance: 0.90, category: 'Embedded' }
    ]
  },
  {
    id: 'evi-arjun-6',
    user_id: 'user-arjun',
    project_id: null,
    type: 'DOCUMENT',
    title: 'FreeRTOS Dual-Core ESP32 Architecture Whitepaper',
    description: 'Technical document and benchmark measurements showing Core 0 dedicated to Wi-Fi/MQTT stack and Core 1 dedicated to high-precision I2C/SPI sensor acquisition.',
    source_url: 'https://techpapers.demo/freertos-esp32-core-split.pdf',
    file_url: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=600&auto=format&fit=crop&q=80',
    thumbnail_url: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=200&auto=format&fit=crop&q=80',
    visibility: 'PUBLIC',
    confidence: 0.88,
    verification_state: 'SUPPORTED',
    created_at: '2026-02-15T10:00:00Z',
    updated_at: '2026-07-20T14:15:00Z',
    capabilities: [
      { id: 'cap-freertos', name: 'FreeRTOS', confidence: 0.92, relevance: 0.90, category: 'Embedded' },
      { id: 'cap-esp32', name: 'ESP32', confidence: 0.90, relevance: 0.88, category: 'Embedded' },
      { id: 'cap-embedded-c', name: 'Embedded C', confidence: 0.89, relevance: 0.86, category: 'Embedded' }
    ]
  },
  {
    id: 'evi-arjun-7',
    user_id: 'user-arjun',
    project_id: null,
    type: 'GITHUB',
    title: 'LoRa-to-MQTT Telemetry Bridge Implementation',
    description: 'SX1262 LoRa packet receiver feeding JSON telemetry into an MQTT broker with CRC verification and exponential backoff retry logic.',
    source_url: 'https://github.com/fictional-demo/lora-mqtt-gateway',
    file_url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80',
    thumbnail_url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200&auto=format&fit=crop&q=80',
    visibility: 'PUBLIC',
    confidence: 0.94,
    verification_state: 'DEMONSTRATED',
    created_at: '2026-01-28T16:00:00Z',
    updated_at: '2026-08-01T12:00:00Z',
    capabilities: [
      { id: 'cap-lorawan', name: 'LoRaWAN', confidence: 0.93, relevance: 0.91, category: 'Networking' },
      { id: 'cap-mqtt', name: 'MQTT', confidence: 0.96, relevance: 0.95, category: 'Networking' },
      { id: 'cap-iot', name: 'IoT Architecture', confidence: 0.94, relevance: 0.92, category: 'Networking' }
    ]
  },

  // Elena Rostova: Edge CV
  {
    id: 'evi-elena-1',
    user_id: 'user-elena',
    project_id: null,
    type: 'PROTOTYPE',
    title: 'Coral Edge TPU Plant Pathology Classifier',
    description: 'MobileNetV3 quantized model running at 45 FPS on Google Coral Edge TPU USB accelerator detecting foliar leaf spot and powdery mildew in field tomatoes.',
    source_url: 'https://github.com/fictional-demo/edgetpu-plant-pathology',
    file_url: 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?w=600&auto=format&fit=crop&q=80',
    thumbnail_url: 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?w=200&auto=format&fit=crop&q=80',
    visibility: 'PUBLIC',
    confidence: 0.95,
    verification_state: 'DEMONSTRATED',
    created_at: '2026-06-12T14:00:00Z',
    updated_at: '2026-09-10T17:00:00Z',
    capabilities: [
      { id: 'cap-edge-ai', name: 'Edge Processing & TinyML', confidence: 0.96, relevance: 0.95, category: 'AI' },
      { id: 'cap-cv', name: 'Computer Vision', confidence: 0.97, relevance: 0.96, category: 'AI' },
      { id: 'cap-object-detection', name: 'Object Detection & Segmentation', confidence: 0.94, relevance: 0.92, category: 'AI' }
    ]
  },
  {
    id: 'evi-elena-2',
    user_id: 'user-elena',
    project_id: null,
    type: 'DEMO',
    title: 'Raspberry Pi 5 Real-Time Camera Pipeline',
    description: 'GStreamer hardware-accelerated video pipeline streaming RTSP video with zero frame drops across local Wi-Fi.',
    source_url: 'https://demo.video-pipeline.org',
    file_url: 'https://images.unsplash.com/photo-1517420704952-d9f39e95b43e?w=600&auto=format&fit=crop&q=80',
    thumbnail_url: 'https://images.unsplash.com/photo-1517420704952-d9f39e95b43e?w=200&auto=format&fit=crop&q=80',
    visibility: 'PUBLIC',
    confidence: 0.91,
    verification_state: 'DEMONSTRATED',
    created_at: '2026-05-04T12:00:00Z',
    updated_at: '2026-08-22T10:00:00Z',
    capabilities: [
      { id: 'cap-cv', name: 'Computer Vision', confidence: 0.92, relevance: 0.90, category: 'AI' },
      { id: 'cap-edge-ai', name: 'Edge Processing & TinyML', confidence: 0.89, relevance: 0.87, category: 'AI' }
    ]
  },

  // Devraj Sen: Industrial Hardware & STM32
  {
    id: 'evi-devraj-1',
    user_id: 'user-devraj',
    project_id: null,
    type: 'PROTOTYPE',
    title: 'STM32F4 Industrial Sensor Multiplexer PCB',
    description: 'Custom 4-layer PCB with optical isolation, RS-485 Modbus RTU transceivers, and 8-channel 24-bit delta-sigma ADC.',
    source_url: 'https://oshwlab.com/fictional-demo/stm32-sensor-multiplexer',
    file_url: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=600&auto=format&fit=crop&q=80',
    thumbnail_url: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=200&auto=format&fit=crop&q=80',
    visibility: 'PUBLIC',
    confidence: 0.94,
    verification_state: 'DEMONSTRATED',
    created_at: '2026-07-02T10:00:00Z',
    updated_at: '2026-09-14T11:00:00Z',
    capabilities: [
      { id: 'cap-embedded-c', name: 'Embedded C', confidence: 0.96, relevance: 0.94, category: 'Embedded' },
      { id: 'cap-stm32', name: 'STM32 / ARM Cortex', confidence: 0.97, relevance: 0.96, category: 'Embedded' },
      { id: 'cap-pcb', name: 'Custom PCB Design', confidence: 0.95, relevance: 0.93, category: 'Sensors & Hardware' },
      { id: 'cap-sensors', name: 'Sensor Integration', confidence: 0.92, relevance: 0.90, category: 'Sensors & Hardware' }
    ]
  },

  // Sarah Lin: Embedded Security & mTLS
  {
    id: 'evi-sarah-1',
    user_id: 'user-sarah',
    project_id: null,
    type: 'GITHUB',
    title: 'Microcontroller Mutual TLS & Secure Element Driver',
    description: 'ATECC608A cryptographic co-processor driver for ESP32 and STM32 verifying hardware certificates over MQTT connections.',
    source_url: 'https://github.com/fictional-demo/embedded-mtls-atecc',
    file_url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&auto=format&fit=crop&q=80',
    thumbnail_url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=200&auto=format&fit=crop&q=80',
    visibility: 'PUBLIC',
    confidence: 0.93,
    verification_state: 'DEMONSTRATED',
    created_at: '2026-06-18T16:00:00Z',
    updated_at: '2026-09-02T13:00:00Z',
    capabilities: [
      { id: 'cap-mtls', name: 'mTLS & Device Certificates', confidence: 0.98, relevance: 0.96, category: 'Security' },
      { id: 'cap-security', name: 'Hardware & Network Security', confidence: 0.97, relevance: 0.95, category: 'Security' },
      { id: 'cap-mqtt', name: 'MQTT', confidence: 0.90, relevance: 0.88, category: 'Networking' },
      { id: 'cap-esp32', name: 'ESP32', confidence: 0.88, relevance: 0.85, category: 'Embedded' }
    ]
  },

  // Kenji Sato: TinyML Quantization
  {
    id: 'evi-kenji-1',
    user_id: 'user-kenji',
    project_id: null,
    type: 'DEMO',
    title: 'TFLM INT8 Microcontroller Audio & Sensor Inference',
    description: 'TensorFlow Lite for Microcontrollers engine executing on an ESP32-S3 with SIMD DSP vector extensions for vibration anomaly detection.',
    source_url: 'https://github.com/fictional-demo/tflm-esp32-anomalies',
    file_url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format&fit=crop&q=80',
    thumbnail_url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=200&auto=format&fit=crop&q=80',
    visibility: 'PUBLIC',
    confidence: 0.92,
    verification_state: 'DEMONSTRATED',
    created_at: '2026-05-15T09:00:00Z',
    updated_at: '2026-08-25T14:30:00Z',
    capabilities: [
      { id: 'cap-edge-ai', name: 'Edge Processing & TinyML', confidence: 0.96, relevance: 0.95, category: 'AI' },
      { id: 'cap-esp32', name: 'ESP32', confidence: 0.91, relevance: 0.90, category: 'Embedded' },
      { id: 'cap-embedded-c', name: 'Embedded C', confidence: 0.89, relevance: 0.87, category: 'Embedded' }
    ]
  },

  // Marcus Vance: Agronomist & Sensor Calibration
  {
    id: 'evi-marcus-1',
    user_id: 'user-marcus',
    project_id: null,
    type: 'DOCUMENT',
    title: 'Soil Moisture Matric Potential & FDR Probe Field Study',
    description: 'Empirical calibration curves correlating dielectric permittivity with volumetric water content across clay, silt, and sandy loam soils.',
    source_url: 'https://agri-archive.org/papers/matric-potential-2026',
    file_url: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=600&auto=format&fit=crop&q=80',
    thumbnail_url: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=200&auto=format&fit=crop&q=80',
    visibility: 'PUBLIC',
    confidence: 0.94,
    verification_state: 'DEMONSTRATED',
    created_at: '2026-04-20T11:00:00Z',
    updated_at: '2026-08-18T10:00:00Z',
    capabilities: [
      { id: 'cap-sensors', name: 'Sensor Integration', confidence: 0.95, relevance: 0.96, category: 'Sensors & Hardware' },
      { id: 'cap-adc', name: 'ADC Calibration & Conditioning', confidence: 0.91, relevance: 0.92, category: 'Sensors & Hardware' }
    ]
  },

  // Existing Team Evidence (Smart Agriculture Project)
  {
    id: 'evi-team-1',
    user_id: 'user-sophia',
    project_id: 'proj-smart-agri',
    type: 'PROJECT',
    title: 'Multispectral Crop Canopy NDVI Map Pipeline',
    description: 'Automated orthomosaic processing pipeline calculating 5-band NDVI reflectance ratios across 120-acre test fields.',
    source_url: 'https://github.com/northstar/agri-multispectral',
    file_url: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=600&auto=format&fit=crop&q=80',
    thumbnail_url: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=200&auto=format&fit=crop&q=80',
    visibility: 'TEAM_ONLY',
    confidence: 0.96,
    verification_state: 'DEMONSTRATED',
    created_at: '2026-08-12T15:00:00Z',
    updated_at: '2026-09-15T12:00:00Z',
    capabilities: [
      { id: 'cap-cv', name: 'Computer Vision', confidence: 0.98, relevance: 0.97, category: 'AI' },
      { id: 'cap-multispectral', name: 'Multispectral NDVI Analysis', confidence: 0.97, relevance: 0.96, category: 'AI' }
    ]
  },
  {
    id: 'evi-team-2',
    user_id: 'user-alex',
    project_id: 'proj-smart-agri',
    type: 'GITHUB',
    title: 'High-Throughput Node.js Telemetry Ingestion Service',
    description: 'Dockerized microservice receiving batch JSON readings, validating schema with Zod, and batch-inserting into TimescaleDB.',
    source_url: 'https://github.com/northstar/agri-telemetry-backend',
    file_url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&auto=format&fit=crop&q=80',
    thumbnail_url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=200&auto=format&fit=crop&q=80',
    visibility: 'TEAM_ONLY',
    confidence: 0.95,
    verification_state: 'DEMONSTRATED',
    created_at: '2026-08-20T11:00:00Z',
    updated_at: '2026-09-18T14:30:00Z',
    capabilities: [
      { id: 'cap-backend', name: 'Backend Development', confidence: 0.97, relevance: 0.96, category: 'Backend & Cloud' },
      { id: 'cap-nodejs', name: 'Node.js & TypeScript', confidence: 0.98, relevance: 0.97, category: 'Backend & Cloud' },
      { id: 'cap-postgres', name: 'PostgreSQL & TimescaleDB', confidence: 0.94, relevance: 0.92, category: 'Backend & Cloud' }
    ]
  },
  {
    id: 'evi-team-3',
    user_id: 'user-liam',
    project_id: 'proj-smart-agri',
    type: 'DEMO',
    title: 'Real-Time Sensor Telemetry Dashboard UI',
    description: 'Interactive React and Tailwind dashboard with real-time Recharts time-series feeds, map pin overlays, and zone health scores.',
    source_url: 'https://dashboard.agri-demo.org',
    file_url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=80',
    thumbnail_url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=200&auto=format&fit=crop&q=80',
    visibility: 'TEAM_ONLY',
    confidence: 0.94,
    verification_state: 'DEMONSTRATED',
    created_at: '2026-08-28T09:30:00Z',
    updated_at: '2026-09-22T16:00:00Z',
    capabilities: [
      { id: 'cap-uiux', name: 'UI/UX & Frontend', confidence: 0.97, relevance: 0.96, category: 'UI/UX' },
      { id: 'cap-dashboard', name: 'Dashboard Development', confidence: 0.96, relevance: 0.95, category: 'UI/UX' },
      { id: 'cap-react', name: 'React & Component Architecture', confidence: 0.95, relevance: 0.94, category: 'UI/UX' }
    ]
  }
];

// 8. Recommendations (Deterministic matching calculations seeded)
export const seedRecommendations: Recommendation[] = [
  {
    id: 'rec-arjun-agri',
    project_id: 'proj-smart-agri',
    user_id: 'user-arjun',
    capability_gap_id: 'gap-iot',
    match_score: 94,
    gap_coverage: 96,
    evidence_strength: 95,
    evidence_relevance: 94,
    recency_score: 92,
    collaboration_fit: 90,
    weights: {
      gap_coverage: 0.40,
      evidence_strength: 0.25,
      evidence_relevance: 0.15,
      recency: 0.10,
      collaboration_fit: 0.10
    },
    matched_capabilities: ['cap-esp32', 'cap-mqtt', 'cap-sensors', 'cap-embedded-c', 'cap-iot'],
    explanation: 'Arjun demonstrates complete alignment with your critical IoT and embedded firmware gaps. His 5 demonstrated prototypes directly solve ESP32-S3 sensor integration, FreeRTOS dual-core tasking, and MQTT edge gateway bridging required by your agricultural platform.',
    supporting_evidence_ids: ['evi-arjun-1', 'evi-arjun-2', 'evi-arjun-3', 'evi-arjun-4', 'evi-arjun-5'],
    created_at: '2026-09-28T14:45:00Z'
  },
  {
    id: 'rec-devraj-agri',
    project_id: 'proj-smart-agri',
    user_id: 'user-devraj',
    capability_gap_id: 'gap-embedded',
    match_score: 82,
    gap_coverage: 80,
    evidence_strength: 88,
    evidence_relevance: 82,
    recency_score: 84,
    collaboration_fit: 78,
    weights: {
      gap_coverage: 0.40,
      evidence_strength: 0.25,
      evidence_relevance: 0.15,
      recency: 0.10,
      collaboration_fit: 0.10
    },
    matched_capabilities: ['cap-embedded-c', 'cap-stm32', 'cap-sensors', 'cap-pcb'],
    explanation: 'Devraj brings demonstrated industrial microcontroller and custom PCB multiplexer experience. Strong embedded C foundation, though primary hardware focus is STM32 rather than ESP32.',
    supporting_evidence_ids: ['evi-devraj-1'],
    created_at: '2026-09-28T14:48:00Z'
  },
  {
    id: 'rec-sarah-agri',
    project_id: 'proj-smart-agri',
    user_id: 'user-sarah',
    capability_gap_id: 'gap-mqtt',
    match_score: 79,
    gap_coverage: 76,
    evidence_strength: 89,
    evidence_relevance: 78,
    recency_score: 82,
    collaboration_fit: 75,
    weights: {
      gap_coverage: 0.40,
      evidence_strength: 0.25,
      evidence_relevance: 0.15,
      recency: 0.10,
      collaboration_fit: 0.10
    },
    matched_capabilities: ['cap-mtls', 'cap-mqtt', 'cap-security', 'cap-esp32'],
    explanation: 'Sarah provides strong demonstrated capability in secure MQTT with mTLS device certificates, directly hardening field telemetry against spoofing.',
    supporting_evidence_ids: ['evi-sarah-1'],
    created_at: '2026-09-28T14:50:00Z'
  },
  {
    id: 'rec-kenji-agri',
    project_id: 'proj-smart-agri',
    user_id: 'user-kenji',
    capability_gap_id: 'gap-edge-ai',
    match_score: 84,
    gap_coverage: 85,
    evidence_strength: 90,
    evidence_relevance: 86,
    recency_score: 81,
    collaboration_fit: 76,
    weights: {
      gap_coverage: 0.40,
      evidence_strength: 0.25,
      evidence_relevance: 0.15,
      recency: 0.10,
      collaboration_fit: 0.10
    },
    matched_capabilities: ['cap-edge-ai', 'cap-esp32', 'cap-embedded-c'],
    explanation: 'Kenji has demonstrated TinyML INT8 model execution on ESP32-S3 microcontrollers, ideal for edge anomaly detection before telemetry upload.',
    supporting_evidence_ids: ['evi-kenji-1'],
    created_at: '2026-09-28T14:52:00Z'
  },
  {
    id: 'rec-marcus-agri',
    project_id: 'proj-smart-agri',
    user_id: 'user-marcus',
    capability_gap_id: 'gap-sensors',
    match_score: 78,
    gap_coverage: 75,
    evidence_strength: 86,
    evidence_relevance: 84,
    recency_score: 75,
    collaboration_fit: 72,
    weights: {
      gap_coverage: 0.40,
      evidence_strength: 0.25,
      evidence_relevance: 0.15,
      recency: 0.10,
      collaboration_fit: 0.10
    },
    matched_capabilities: ['cap-sensors', 'cap-adc'],
    explanation: 'Marcus brings demonstrated empirical soil moisture calibration data and FDR probe testing across soil textures, solving sensor drift issues.',
    supporting_evidence_ids: ['evi-marcus-1'],
    created_at: '2026-09-28T14:55:00Z'
  }
];

// 9. Collaborations
export const seedCollaborations: Collaboration[] = [
  {
    id: 'collab-1',
    project_id: 'proj-smart-agri',
    requester_id: 'user-demo',
    contributor_id: 'user-arjun',
    status: 'REQUESTED',
    message: "We're building the IoT layer for our agricultural monitoring system and your demonstrated ESP32, MQTT, and sensor experience directly matches our critical capability gap. Would love to collaborate on the field telemetry firmware!",
    target_capabilities: ['cap-esp32', 'cap-mqtt', 'cap-sensors', 'cap-embedded-c'],
    created_at: '2026-09-29T16:20:00Z',
    updated_at: '2026-09-29T16:20:00Z'
  },
  {
    id: 'collab-2',
    project_id: 'proj-traffic-ai',
    requester_id: 'user-demo',
    contributor_id: 'user-elena',
    status: 'ACCEPTED',
    message: 'Collaborating on edge YOLO model quantization for municipal traffic intersection feeds.',
    target_capabilities: ['cap-cv', 'cap-edge-ai', 'cap-object-detection'],
    created_at: '2026-09-10T11:00:00Z',
    updated_at: '2026-09-12T14:00:00Z'
  },
  {
    id: 'collab-3',
    project_id: 'proj-smart-microgrid',
    requester_id: 'user-carlos',
    contributor_id: 'user-devraj',
    status: 'ACTIVE',
    message: 'Integrating Modbus RTU telemetry into the solar inverter charge controllers.',
    target_capabilities: ['cap-stm32', 'cap-embedded-c', 'cap-sensors'],
    created_at: '2026-08-15T09:00:00Z',
    updated_at: '2026-09-20T10:30:00Z'
  },
  {
    id: 'collab-4',
    project_id: 'proj-drone-inspect',
    requester_id: 'user-sophia',
    contributor_id: 'user-kenji',
    status: 'ACTIVE',
    message: 'Testing TinyML vibration sensors on drone motor mounts for early defect prediction.',
    target_capabilities: ['cap-edge-ai', 'cap-esp32'],
    created_at: '2026-08-25T13:00:00Z',
    updated_at: '2026-09-18T16:45:00Z'
  },
  {
    id: 'collab-5',
    project_id: 'proj-health-telemetry',
    requester_id: 'user-maya',
    contributor_id: 'user-sarah',
    status: 'DECLINED',
    message: 'Reviewing mTLS certificate authority architecture for medical wearable hubs.',
    target_capabilities: ['cap-mtls', 'cap-security'],
    created_at: '2026-09-01T10:00:00Z',
    updated_at: '2026-09-03T18:00:00Z'
  },
  {
    id: 'collab-6',
    project_id: 'proj-smart-agri',
    requester_id: 'user-demo',
    contributor_id: 'user-marcus',
    status: 'ACCEPTED',
    message: 'Reviewing soil sensor ADC calibration lookup tables for agricultural trial plots.',
    target_capabilities: ['cap-sensors', 'cap-adc'],
    created_at: '2026-09-25T10:15:00Z',
    updated_at: '2026-09-26T14:00:00Z'
  }
];

// 10. Audit Logs (50+ events tracking the complete lifecycle)
export const seedAuditLogs: AuditLog[] = [
  {
    id: 'audit-50',
    user_id: 'user-demo',
    action: 'COLLABORATION_REQUEST_DISPATCHED',
    entity_type: 'COLLABORATION',
    entity_id: 'collab-1',
    description: 'Collaboration request dispatched to Arjun Sharma targeting ESP32, MQTT, and Sensor integration gaps.',
    timestamp: '2026-09-29T16:20:00Z'
  },
  {
    id: 'audit-49',
    user_id: 'user-demo',
    action: 'RECOMMENDATION_VIEWED',
    entity_type: 'RECOMMENDATION',
    entity_id: 'rec-arjun-agri',
    description: 'Viewed transparent "Why This Match?" rationale for Arjun Sharma (94% gap coverage).',
    timestamp: '2026-09-29T16:18:00Z'
  },
  {
    id: 'audit-48',
    user_id: 'user-demo',
    action: 'MATCHING_ENGINE_EXECUTED',
    entity_type: 'AI_SYSTEM',
    entity_id: 'proj-smart-agri',
    description: 'Deterministic matching algorithm ranked 24 community contributors against 4 open gaps in Smart Agricultural Monitoring.',
    timestamp: '2026-09-29T16:15:00Z'
  },
  {
    id: 'audit-47',
    user_id: 'user-demo',
    action: 'CAPABILITY_GAP_DRILLDOWN',
    entity_type: 'GAP',
    entity_id: 'gap-iot',
    description: 'Analyzed why IoT is a 91% gap: team lacks ESP32, MQTT, and field gateway failover experience.',
    timestamp: '2026-09-29T16:12:00Z'
  },
  {
    id: 'audit-46',
    user_id: 'user-demo',
    action: 'CAPABILITY_GAPS_CALCULATED',
    entity_type: 'PROJECT',
    entity_id: 'proj-smart-agri',
    description: 'Gap analysis engine identified 4 critical gaps: IoT (91%), Embedded Systems (84%), MQTT (100%), and Sensor Integration (88%).',
    timestamp: '2026-09-29T16:10:00Z'
  },
  {
    id: 'audit-45',
    user_id: 'user-demo',
    action: 'GEMINI_REQUIREMENTS_EXTRACTED',
    entity_type: 'AI_SYSTEM',
    entity_id: 'proj-smart-agri',
    description: 'Gemini AI analyzed project specification and extracted 10 technical requirements with normalized taxonomy.',
    timestamp: '2026-09-29T16:05:00Z'
  },
  {
    id: 'audit-44',
    user_id: 'user-arjun',
    action: 'EVIDENCE_ANALYZED_AND_VERIFIED',
    entity_type: 'EVIDENCE',
    entity_id: 'evi-arjun-1',
    description: 'Gemini multimodal verification identified ESP32 (98%), Embedded C (95%), and Sensor Integration (96%) with DEMONSTRATED trust state.',
    timestamp: '2026-07-14T14:35:00Z'
  },
  {
    id: 'audit-43',
    user_id: 'user-arjun',
    action: 'EVIDENCE_UPLOADED',
    entity_type: 'EVIDENCE',
    entity_id: 'evi-arjun-1',
    description: 'Uploaded prototype artifact: "Smart Irrigation ESP32 Prototype" with schematics and firmware source.',
    timestamp: '2026-07-14T14:30:00Z'
  },
  {
    id: 'audit-42',
    user_id: 'user-arjun',
    action: 'EVIDENCE_ANALYZED_AND_VERIFIED',
    entity_type: 'EVIDENCE',
    entity_id: 'evi-arjun-2',
    description: 'Multimodal analysis verified MQTT (97%) and Edge Processing (91%) in "MQTT Edge Gateway & Telemetry Bridge".',
    timestamp: '2026-06-20T09:20:00Z'
  },
  {
    id: 'audit-41',
    user_id: 'user-demo',
    action: 'PROJECT_MEMBER_ADDED',
    entity_type: 'PROJECT',
    entity_id: 'proj-smart-agri',
    description: 'Added Liam O\'Connor as Frontend UI/UX Designer to Smart Agricultural Monitoring System.',
    timestamp: '2026-08-15T11:00:00Z'
  },
  {
    id: 'audit-40',
    user_id: 'user-demo',
    action: 'PROJECT_MEMBER_ADDED',
    entity_type: 'PROJECT',
    entity_id: 'proj-smart-agri',
    description: 'Added Alex Rivera as Backend Infrastructure Engineer to Smart Agricultural Monitoring System.',
    timestamp: '2026-08-10T14:00:00Z'
  },
  {
    id: 'audit-39',
    user_id: 'user-demo',
    action: 'PROJECT_MEMBER_ADDED',
    entity_type: 'PROJECT',
    entity_id: 'proj-smart-agri',
    description: 'Added Sophia Chen as Computer Vision Specialist to Smart Agricultural Monitoring System.',
    timestamp: '2026-08-05T10:00:00Z'
  },
  {
    id: 'audit-38',
    user_id: 'user-demo',
    action: 'PROJECT_CREATED',
    entity_type: 'PROJECT',
    entity_id: 'proj-smart-agri',
    description: 'Initialized project "Smart Agricultural Monitoring System" with AgTech domain taxonomy.',
    timestamp: '2026-08-01T09:00:00Z'
  },
  {
    id: 'audit-37',
    user_id: 'user-sarah',
    action: 'EVIDENCE_UPLOADED',
    entity_type: 'EVIDENCE',
    entity_id: 'evi-sarah-1',
    description: 'Published open source driver: "Microcontroller Mutual TLS & Secure Element Driver" with verified crypto tests.',
    timestamp: '2026-06-18T16:00:00Z'
  },
  {
    id: 'audit-36',
    user_id: 'user-kenji',
    action: 'EVIDENCE_ANALYZED_AND_VERIFIED',
    entity_type: 'EVIDENCE',
    entity_id: 'evi-kenji-1',
    description: 'Verified TFLM INT8 quantization on ESP32-S3 with 0.92 confidence score.',
    timestamp: '2026-05-15T09:30:00Z'
  },
  {
    id: 'audit-35',
    user_id: 'user-marcus',
    action: 'EVIDENCE_VERIFIED',
    entity_type: 'EVIDENCE',
    entity_id: 'evi-marcus-1',
    description: 'Empirical soil moisture matric potential research verified with peer academic citation link.',
    timestamp: '2026-04-20T11:30:00Z'
  }
];
