// Facts come from ~/Personal/resumes/resume_master.yaml — select and trim, never invent.
// Project numbers were re-checked against each repo's README on 2026-10-16.

const gh = (repo: string) => `https://github.com/Kamrulhasan12345/${repo}`;

export const profile = {
	name: "Mohammad Kamrul Hasan",
	// a fact, not a job title: the target role changes per application
	role: "CSE undergraduate at BUET",
	location: "Dhaka, Bangladesh",
	email: "kamrulhasan59246@gmail.com",
	github: "https://github.com/Kamrulhasan12345",
	linkedin: "https://linkedin.com/in/kamrulhasan12345",
	orcid: "https://orcid.org/0009-0005-3843-6832",
	availability: "Open to internships and research roles",
	timezone: "UTC+6",
	intro: "I speed up language models on edge devices, and I build backends as an intern at Version3.ai.",
	proof: "My latest project, LITTLETai, makes llama.cpp generate text up to 2.6× faster on a budget Android phone, using up to 3.3× less energy.",
};

export const about = {
	text: [
		"At Version3.ai I work on backend services and store integrations, and I've tested image models for visual product search.",
		"On my own I like finding out where software wastes time. LITTLETai started when I counted the instructions llama.cpp burns while its threads wait on each other. I also enjoy database design and reading binaries. I've been programming since grade 5.",
	],
	focus: [
		{
			title: "Backend",
			text: "NestJS and Spring Boot services, PostgreSQL and MongoDB schema design, message queues, OAuth integrations. At Version3.ai and in Ilham.",
		},
		{
			title: "ML systems",
			text: "Image-search benchmarks at Version3.ai; LLM inference speed on Arm phones in LITTLETai.",
		},
		{
			title: "Low-level",
			text: "Reverse engineering (see the crackme write-ups) and CPU profiling with simpleperf and Perfetto. Learning embedded on the ESP32-S3.",
		},
	],
	now: ["Building a small LLM inference engine of my own (early stage)", "Writing an OLED display driver for the ESP32-S3"],
};

export const experience = [
	{
		role: "Backend Developer Intern",
		org: "Version3.ai",
		orgNote: "Conversational-commerce AI for online stores",
		when: "Jun 2026 — Present",
		// site version stays general; the detailed bullets go only in résumés sent directly
		points: [
			"Work on the backend services behind the store product catalogue.",
			"Built the WooCommerce and Shopify store integrations.",
			"Benchmarked image models and vector-search settings for visual product search.",
		],
		stack: ["NestJS", "MongoDB", "RabbitMQ", "Qdrant"],
	},
	{
		role: "Software Engineering Intern",
		org: "Edulytics",
		when: "Dec 2025 — Mar 2026",
		points: ["Built the mobile app MVP in React Native, and worked on their web app."],
		stack: ["React Native", "TypeScript"],
	},
];

export const education = [
	{
		school: "Bangladesh University of Engineering and Technology (BUET)",
		degree: "B.Sc. in Computer Science and Engineering",
		when: "2025 — 2028 (expected)",
		grade: "CGPA 3.77/4.00",
		note: "Ranked 79th in the national BUET admission merit list",
		location: "Dhaka, Bangladesh",
	},
];

export const research = [
	{
		title: "From Wearable Data to Risk Literacy: Visualizing Physiological Heat Stress for Rickshaw Pullers in Dhaka",
		kind: "Conference paper",
		authors: ["M. Rahaman", "S. S. Rahman", "M. S. M. Noor", "K. S. S. Siddiquee", "M. K. Hasan", "et al."],
		venue: "UbiComp/ISWC 2026, ISWC Notes & Briefs · ACM",
		detail: "Turned 3 years of wearable data from 100 rickshaw pullers into heat-risk visuals that low-literacy workers can read. BUET × UC San Diego. I'm 5th of 11 authors; I transcribed the interviews behind the qualitative analysis.",
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

// Only projects with a public repo that backs every claim. Dropped on 2026-10-16:
// KXCache, Kafka Clone, AyahBot v4 (no public repo), NoteNao, StoraGem (near-empty repos).
export const projects: Project[] = [
	{
		slug: "littletai",
		name: "LITTLETai",
		title: "Faster, lower-energy llama.cpp on Android phones",
		year: "2026",
		categories: ["AI / ML", "Embedded & Systems"],
		context: "Submitted to the Arm Create: AI Optimization Challenge",
		summary: "Picks CPU cores and thread counts so llama.cpp decodes 2.2–2.6× faster with 2.6–3.3× less energy per token than its defaults (Helio G81 phone, Qwen2 1B Q4_0).",
		points: [
			"Profiled decode with simpleperf: the default 8 threads retired up to 5× more instructions per token, spin-waiting at thread barriers.",
			"Wrote a POSIX shell launcher that picks cores and thread counts from the CPU topology (2× Cortex-A75 + 6× Cortex-A55), no root needed.",
			"Found llama.cpp's CPU-affinity flag was silently ignored on Android (99.5% of cycles stayed on the big cores), so the launcher uses taskset. Since fixed upstream in llama.cpp PR #26838.",
			"Reproducible harness: thermal cooldowns, randomized run order, energy logging, 209 test assertions that run without a phone.",
		],
		stack: ["llama.cpp", "POSIX shell", "Python", "simpleperf", "Perfetto"],
		link: gh("LITTLETai"),
		featured: true,
	},
	{
		slug: "ilham",
		name: "Ilham",
		title: "Hadith study platform on PostgreSQL",
		year: "2026",
		categories: ["Backend"],
		context: "Database course project, team of 2",
		summary: "Database and ETL for 14,941 hadiths and 20,957 narrators, with 99.6% of narrators matched.",
		points: [
			"Each hadith's chain strength is computed in SQL from the weakest link in its chain.",
			"Schema with an ISA user hierarchy, weak entities, triggers and an audit log.",
			"The reference corpus is locked with REVOKE after loading, so the application cannot modify it.",
		],
		stack: ["PostgreSQL", "Node.js", "Express", "TypeScript"],
		link: gh("ilham"),
		featured: true,
	},
	{
		slug: "sentinel",
		name: "Sentinel",
		title: "Offline medical triage app for Android",
		year: "2025",
		categories: ["AI / ML", "Apps"],
		context: "Lead developer, team of 3",
		summary: "Sorts symptom descriptions into 52 first-aid intents and Critical, Urgent or Routine, with no internet connection.",
		points: [
			"An on-device 1D-CNN (TensorFlow Lite) classifies first; below 65% confidence it falls back to int8 all-MiniLM-L6-v2 embeddings (20 MB) matched by cosine similarity.",
			"Voice input, local history and one-tap emergency calling; released as an APK.",
		],
		stack: ["React Native", "TypeScript", "TensorFlow Lite", "Keras"],
		link: gh("sentinel"),
		featured: true,
	},
	{
		slug: "bayyinah",
		name: "Bayyinah",
		title: "Collaborative desktop Quran app",
		year: "2026",
		categories: ["Backend", "Apps"],
		summary: "Offline full-text verse search (SQLite FTS5) in a JavaFX client, plus live group reading sessions with real-time audio.",
		points: [
			"Group sessions use WebRTC audio with STOMP signaling on a Spring Boot server; bookmarks sync when back online.",
		],
		stack: ["Java", "JavaFX", "Spring Boot", "WebRTC", "SQLite", "PostgreSQL"],
		link: gh("bayyinah"),
		featured: true,
	},
	{
		slug: "nodecommerce",
		name: "NodeCommerce",
		title: "Demand-forecasting backend",
		year: "2026",
		categories: ["AI / ML", "Backend"],
		context: "AI Buildfest hackathon",
		summary: "Prototype forecasting pipeline: LightGBM on 94 engineered features with SHAP explanations, plus a map dashboard. Runs on synthetic data; not yet evaluated for accuracy.",
		points: [],
		stack: ["Python", "FastAPI", "LightGBM", "SHAP", "PostgreSQL"],
		link: gh("nodecommerce-backend"),
	},
	{
		slug: "dronecam",
		name: "DroneCam",
		title: "Person and car detection in drone images",
		year: "2026",
		categories: ["AI / ML"],
		context: "Internship take-home task",
		summary: "Fine-tuned YOLOv8n at 1280 px on VisDrone merged into two classes: 0.728 mAP@0.5 on validation. Added SAHI tiled inference and ByteTrack tracking.",
		points: [],
		stack: ["Python", "Ultralytics YOLOv8", "SAHI"],
		link: gh("dronecam"),
	},
	{
		slug: "bayyinah-ai",
		name: "Bayyinah-AI",
		title: "Verse recommendation API",
		year: "2026",
		categories: ["AI / ML", "Backend"],
		summary: "FAISS semantic search with re-ranking for relevance and variety; optional LLM reflections via Groq, falling back to the Hugging Face Inference API, with a 1-hour cache. Deployed on Hugging Face Spaces.",
		points: [],
		stack: ["Python", "FastAPI", "sentence-transformers", "FAISS"],
		link: gh("bayyinah-ai"),
	},
	{
		slug: "poramorshok",
		name: "Poramorshok",
		title: "Health companion web app",
		year: "2025",
		categories: ["AI / ML", "Apps"],
		context: "Hackathon",
		summary: "Symptom checker, diet and exercise plans and reminders, in English and Bengali, with Supabase auth.",
		points: [],
		stack: ["React", "TypeScript", "Supabase"],
		link: gh("Poramorshok-ai-hackathon-1.0"),
	},
	{
		slug: "qbert",
		name: "Q*bert",
		title: "Arcade game remake in C++",
		year: "2025",
		categories: ["Apps"],
		context: "First-year course project, team of 2",
		summary: "Isometric rendering on the course's OpenGL/GLUT library, BFS-based enemy pursuit, level loading and high scores.",
		points: [],
		stack: ["C++", "OpenGL", "GLUT"],
		link: gh("qbert-project"),
	},
	{
		slug: "bondhupath",
		name: "BondhuPath",
		title: "WebSocket chat backend",
		year: "2026",
		categories: ["Backend"],
		status: "In progress",
		summary: "Clients refresh their JWT over the open socket before a grace deadline, so live connections aren't dropped.",
		points: [],
		stack: ["Bun", "ElysiaJS", "PostgreSQL", "Drizzle ORM"],
		link: gh("bondhupath-backend"),
	},
	{
		slug: "imageproc",
		name: "ImageProc",
		title: "Image-processing API",
		year: "2026",
		categories: ["Backend"],
		summary: "Configurable OpenCV pipelines and presets behind a FastAPI upload endpoint, with pytest tests.",
		points: [],
		stack: ["Python", "FastAPI", "OpenCV", "pytest"],
		link: gh("ImageProc"),
	},
];

// Only skills a project or job above actually uses.
export const skills = [
	{ group: "Languages", items: ["C", "C++", "Python", "TypeScript", "JavaScript", "Java", "SQL", "POSIX shell"] },
	{ group: "ML & inference", items: ["llama.cpp", "PyTorch", "TensorFlow Lite", "Keras", "Hugging Face Transformers", "sentence-transformers", "FAISS", "Qdrant", "LightGBM", "Ultralytics YOLO", "OpenCV"] },
	{ group: "Backend & data", items: ["NestJS", "FastAPI", "Spring Boot", "Express", "ElysiaJS", "WebSockets", "WebRTC", "OAuth 2.0", "PostgreSQL", "MongoDB", "RabbitMQ", "SQLite", "Supabase"] },
	{ group: "Tools", items: ["Linux", "Git", "GitHub Actions", "simpleperf", "Perfetto", "adb", "IDA", "Ghidra"] },
];
