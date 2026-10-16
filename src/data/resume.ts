// Facts come from ~/Personal/resumes/resume_master.yaml — select and trim, never invent.

const gh = (repo: string) => `https://github.com/Kamrulhasan12345/${repo}`;

export const profile = {
	name: "Mohammad Kamrul Hasan",
	role: "AI Engineer · On-Device Inference · Backend",
	location: "Dhaka, Bangladesh",
	email: "kamrulhasan59246@gmail.com",
	github: "https://github.com/Kamrulhasan12345",
	linkedin: "https://linkedin.com/in/kamrulhasan12345",
	orcid: "https://orcid.org/0009-0005-3843-6832",
	availability: "Open to internships and research roles",
	timezone: "UTC+6",
	intro: "I make AI models run fast on small hardware, like phones, single-board computers and microcontrollers, and I build the backends around them.",
	proof: "Made llama.cpp decode 2.2–2.6× faster with up to 3.3× less energy on Android phones.",
};

export const about = {
	text: [
		"Most of my work sits where machine learning meets the hardware it runs on. I've made llama.cpp run 2.2–2.6× faster on Android phones, built a medical triage app whose AI works without internet, and benchmarked vision models for production search.",
		"Right now I'm working toward my own LLM inference engine, and writing drivers for the ESP32-S3. I've been programming since grade 5.",
	],
	focus: [
		{
			title: "AI Engineering",
			text: "Making models fast and cheap to run: LLM inference on phones, quantized on-device models, retrieval and vision benchmarks.",
		},
		{
			title: "Embedded Systems",
			text: "Microcontrollers and low-level code: an ESP32-S3 display driver, profiling Arm Cortex-A cores, reverse engineering x86 binaries.",
		},
		{
			title: "Backend",
			text: "Production services at Version3.ai: multi-tenant databases, store integrations, message queues.",
		},
	],
	now: [
		"Writing an SH1106 OLED driver for ESP32-S3",
		"Working toward my own LLM inference engine",
	],
};

export const experience = [
	{
		role: "Backend Developer Intern",
		org: "Version3.ai",
		orgNote: "Conversational-commerce AI for online stores",
		when: "Jun 2026 — Present",
		points: [
			"Own the multi-tenant database platform end to end, keeping every store's data strictly isolated (NestJS, MongoDB, RabbitMQ).",
			"Built the WooCommerce and Shopify integrations, so stores connect securely in one click (OAuth PKCE, signed requests, encrypted secrets, a retry-safe job queue).",
			"Fixed a bug that made WooCommerce permanently delete a store's API keys on connect, caused by the server returning the wrong HTTP status.",
			"Picked the image model for visual product search by benchmarking 4 models on 132K product images; the winner finds the right product first try 67% of the time.",
			"Showed vector compression in Qdrant costs almost no accuracy (median −0.4 pts), so search can run on cheap CPU servers.",
		],
		stack: ["NestJS", "MongoDB", "RabbitMQ", "Qdrant", "SigLIP2"],
	},
	{
		role: "Software Engineering Intern",
		org: "Edulytics",
		when: "Dec 2025 — Mar 2026",
		points: [
			"Shipped several core user flows for a React Native MVP on tight sprints, ramping up quickly on a large existing codebase.",
			"Worked through feature branches and pull requests with a remote team.",
		],
		stack: ["React Native", "TypeScript"],
	},
];

export const education = [
	{
		school: "Bangladesh University of Engineering and Technology (BUET)",
		degree: "B.Sc. in Computer Science and Engineering",
		when: "2025 — 2028 (expected)",
		gradYear: 2028,
		grade: "CGPA 3.77/4.00",
		note: "Ranked 79th nationwide in the BUET admission merit list",
		location: "Dhaka, Bangladesh",
	},
];

export const research = [
	{
		title: "From Wearable Data to Risk Literacy: Visualizing Physiological Heat Stress for Rickshaw Pullers in Dhaka",
		kind: "Conference paper",
		authors: ["M. Rahaman", "S. S. Rahman", "M. S. M. Noor", "K. S. S. Siddiquee", "M. K. Hasan", "et al."],
		venue: "UbiComp/ISWC 2026, ISWC Notes & Briefs · ACM",
		detail: "Turned 3 years of wearable data from 100 rickshaw pullers into heat-risk visuals that low-literacy workers can read. BUET × UC San Diego. I transcribed the interviews behind the qualitative analysis.",
		role: "Co-author",
		link: "https://doi.org/10.1145/3830727.3834827",
	},
	{
		title: "ML-guided search for magnetic-material compounds",
		kind: "Ongoing research",
		authors: [],
		venue: "BUET Physics, supervised by Prof. A.K.M. Akther Hossain",
		detail: "Early stage, started 2026.",
		role: "Undergraduate researcher",
	},
];

// Only verified accounts (name matches on the profile). Add more as { name, handle, url }.
export const profiles = [
	{
		group: "Professional",
		links: [
			{ name: "GitHub", handle: "Kamrulhasan12345", url: "https://github.com/Kamrulhasan12345" },
			{ name: "LinkedIn", handle: "kamrulhasan12345", url: "https://linkedin.com/in/kamrulhasan12345" },
		],
	},
	{
		group: "Research",
		links: [{ name: "ORCID", handle: "0009-0005-3843-6832", url: "https://orcid.org/0009-0005-3843-6832" }],
	},
	{
		group: "AI / ML",
		links: [
			{ name: "Hugging Face", handle: "kamrulhasan12345", url: "https://huggingface.co/kamrulhasan12345" },
			{ name: "Kaggle", handle: "Kamrulhasan12345", url: "https://www.kaggle.com/Kamrulhasan12345" },
		],
	},
	{
		group: "Competitive programming",
		links: [{ name: "Codeforces", handle: "Kamrulhasan12345", url: "https://codeforces.com/profile/Kamrulhasan12345" }],
	},
];

export const categories = ["AI / ML", "Embedded & Systems", "Backend", "Apps"] as const;
export type Category = (typeof categories)[number];

export type Project = {
	slug: string;
	name: string;
	title: string;
	year: string;
	categories: Category[];
	summary: string;
	points: string[];
	stack: string[];
	link?: string;
	context?: string;
	status?: "In progress";
	featured?: boolean;
};

export const projects: Project[] = [
	{
		slug: "littletai",
		name: "LITTLETai",
		title: "Faster, lower-power LLM inference on Android phones",
		year: "2026",
		categories: ["AI / ML", "Embedded & Systems"],
		context: "Arm Create AI Optimization Challenge",
		summary: "Made llama.cpp decode 2.2–2.6× faster with 2.6–3.3× less energy on phones with mixed big and small CPU cores.",
		points: [
			"Picks the right CPU cores and thread counts for big.LITTLE phones (8.5–11× faster on Arm's KleidiAI build).",
			"Found the default was slow because threads burned up to 5× more instructions spin-waiting on each other, and that llama.cpp's core-pinning flag silently did nothing on Android.",
			"Repeatable benchmark rig with thermal cooldowns, randomized runs, energy and CPU-counter logging, and 209 tests.",
		],
		stack: ["llama.cpp", "KleidiAI", "simpleperf", "Perfetto", "Python", "shell"],
		link: gh("LITTLETai"),
		featured: true,
	},
	{
		slug: "sentinel",
		name: "Sentinel",
		title: "Offline on-device medical triage",
		year: "2025",
		categories: ["AI / ML", "Apps"],
		context: "Lead developer, team of 3",
		summary: "Grades symptoms as Critical, Urgent or Routine with no internet connection.",
		points: [
			"A small CNN classifier, with a 20 MB int8 language-model fallback when the CNN is unsure.",
			"Voice input, local history and one-tap emergency calling; released as an Android APK.",
		],
		stack: ["TensorFlow Lite", "MiniLM", "React Native", "TypeScript"],
		link: gh("sentinel"),
		featured: true,
	},
	{
		slug: "dronecam",
		name: "DroneCam",
		title: "Tiny-object detection and tracking in drone footage",
		year: "2026",
		categories: ["AI / ML"],
		summary: "Reached 0.728 mAP@0.5 on VisDrone by training at high resolution and slicing frames into tiles.",
		points: [
			"Tiled inference keeps distant people and cars from disappearing when images shrink.",
			"Two tracking modes: an accurate one for analysis and a fast one for real time.",
		],
		stack: ["Python", "YOLO", "SAHI", "ByteTrack", "BoT-SORT"],
		link: gh("dronecam"),
		featured: true,
	},
	{
		slug: "nodecommerce",
		name: "NodeCommerce",
		title: "Demand forecasting and supply matching for Bangladesh",
		year: "2026",
		categories: ["AI / ML", "Backend"],
		context: "AI Buildfest hackathon",
		summary: "Forecasts stock demand for 495 upazilas across all 64 districts, with SHAP explaining each forecast.",
		points: [
			"LightGBM on 94 engineered features per upazila and product.",
			"8 scheduled pipeline jobs (features, inference, spike detection, retraining) and a map dashboard of regional surplus and shortage.",
		],
		stack: ["Python", "FastAPI", "LightGBM", "SHAP", "Neo4j", "PostgreSQL", "Redis"],
		link: gh("nodecommerce-backend"),
		featured: true,
	},
	{
		slug: "bayyinah-ai",
		name: "Bayyinah-AI",
		title: "Semantic search and recommendation API",
		year: "2025",
		categories: ["AI / ML", "Backend"],
		summary: "Matches free-text queries to relevant Quranic verses in ~150 ms.",
		points: [
			"Vector search with re-ranking for relevance and variety.",
			"Cached LLM reflections with fallback across two providers; deployed on Hugging Face Spaces.",
		],
		stack: ["Python", "FastAPI", "sentence-transformers", "FAISS", "Docker"],
		link: gh("bayyinah-ai"),
	},
	{
		slug: "poramorshok",
		name: "Poramorshok",
		title: "AI personal health companion",
		year: "2026",
		categories: ["AI / ML", "Apps"],
		context: "Hackathon",
		summary: "Privacy-first health app with a symptom checker, diet and exercise plans, and reminders, in English and Bengali.",
		points: ["Supabase auth and sync covered by integration tests."],
		stack: ["React", "TypeScript", "Vite", "Supabase"],
		link: gh("Poramorshok-ai-hackathon-1.0"),
	},
	{
		slug: "storagem",
		name: "StoraGem",
		title: "Disk-cleanup advisor agent",
		year: "2026",
		categories: ["AI / ML"],
		status: "In progress",
		summary: "LangGraph agent that turns WizTree disk-usage exports into ranked cleanup advice with full reasoning traces.",
		points: [],
		stack: ["Python", "LangChain", "LangGraph"],
	},
	{
		slug: "kxcache",
		name: "KXCache",
		title: "Redis-style cache server",
		year: "2026",
		categories: ["Embedded & Systems", "Backend"],
		status: "In progress",
		summary: "In-memory key-value server in C++ with a non-blocking event loop, built to learn non-blocking I/O hands-on.",
		points: [],
		stack: ["C++"],
	},
	{
		slug: "qbert",
		name: "Q*bert",
		title: "3D arcade game in OpenGL",
		year: "2025",
		categories: ["Embedded & Systems", "Apps"],
		context: "Team of 2, BUET",
		summary: "Wrote the 3D graphics engine and enemy AI for a full remake of the arcade game, and led the project.",
		points: ["4 enemy AIs, levels, scoring, save/load and audio; 190+ commits."],
		stack: ["C++", "OpenGL", "GLUT", "SDL2_mixer"],
		link: gh("qbert-project"),
	},
	{
		slug: "ilham",
		name: "Ilham",
		title: "Hadith study platform with narrator-chain analytics",
		year: "2026",
		categories: ["Backend"],
		context: "DBMS term project",
		summary: "Loaded 14,941 hadiths and 139,766 narrator-chain links with 99.6% of narrators matched.",
		points: [
			"Scores each hadith's reliability in SQL from its weakest narrator.",
			"Reference data is read-only at the database level, so the app can never corrupt it.",
		],
		stack: ["PostgreSQL", "PL/pgSQL", "Node.js", "Express", "React"],
		link: gh("ilham"),
	},
	{
		slug: "bayyinah",
		name: "Bayyinah",
		title: "Offline-first collaborative desktop Quran app",
		year: "2025",
		categories: ["Backend", "Apps"],
		summary: "Instant full-text search over all 6,236 verses offline, plus live group reading sessions with real-time audio.",
		points: ["JavaFX client, Spring Boot server, offline bookmark sync, WebRTC audio; 190+ commits."],
		stack: ["Java", "JavaFX", "Spring Boot", "WebRTC", "SQLite", "PostgreSQL"],
		link: gh("bayyinah"),
	},
	{
		slug: "bondhupath",
		name: "BondhuPath",
		title: "Real-time community platform backend",
		year: "2026",
		categories: ["Backend"],
		summary: "Login that can revoke any session instantly and refresh tokens without dropping live connections.",
		points: ["Online-presence tracking per room with role-based sub-rooms."],
		stack: ["Bun", "ElysiaJS", "PostgreSQL", "Drizzle", "WebSockets"],
	},
	{
		slug: "ayahbot",
		name: "AyahBot v4",
		title: "Bot platform",
		year: "2025",
		categories: ["Backend"],
		summary: "Split the bot into a TypeScript gateway and Rust services, with a PostgreSQL job queue so many workers can run without clashing.",
		points: [],
		stack: ["TypeScript", "Rust", "gRPC", "PostgreSQL"],
	},
	{
		slug: "kafka-clone",
		name: "Kafka Clone",
		title: "Message broker from scratch",
		year: "2026",
		categories: ["Backend"],
		status: "In progress",
		summary: "Simplified message broker in Java with partitioned topics and consumer groups.",
		points: [],
		stack: ["Java"],
	},
	{
		slug: "imageproc",
		name: "ImageProc",
		title: "Image-processing service",
		year: "2025",
		categories: ["Backend", "AI / ML"],
		summary: "FastAPI service running configurable OpenCV pipelines (document scan, edges, thumbnails) with Pytest coverage.",
		points: [],
		stack: ["Python", "FastAPI", "OpenCV", "Pytest"],
	},
	{
		slug: "notenao",
		name: "NoteNao",
		title: "Collaborative note-taking app",
		year: "2026",
		categories: ["Apps"],
		status: "In progress",
		summary: "Offline-first collaborative note-taking app with real-time sync.",
		points: [],
		stack: ["React Native", "TypeScript", "Express"],
		link: gh("notenao-app"),
	},
];

export const skills = [
	{ group: "Languages", items: ["C", "C++", "Python", "Java", "TypeScript", "JavaScript", "SQL", "Rust", "Shell", "x86 Assembly"] },
	{ group: "AI / ML", items: ["llama.cpp", "GGUF / int8 quantization", "TensorFlow Lite", "PyTorch", "Hugging Face", "QLoRA", "SigLIP / CLIP", "FAISS", "Qdrant", "LightGBM", "YOLO", "OpenCV", "LangGraph"] },
	{ group: "Embedded & low-level", items: ["ESP32-S3", "ESP-IDF", "Raspberry Pi", "Arm big.LITTLE", "Ghidra", "adb", "cross-compilation"] },
	{ group: "Performance", items: ["perf", "simpleperf", "Perfetto", "Arm Streamline", "benchmark design"] },
	{ group: "Backend", items: ["NestJS", "FastAPI", "Spring Boot", "Express", "ElysiaJS", "gRPC", "REST", "WebSockets", "WebRTC", "OAuth", "JWT"] },
	{ group: "Data & infra", items: ["PostgreSQL", "MongoDB", "Redis", "RabbitMQ", "Neo4j", "SQLite", "Supabase", "Docker", "GitHub Actions", "Linux"] },
	{ group: "Frontend & mobile", items: ["React", "React Native", "Next.js", "JavaFX", "OpenGL"] },
];
