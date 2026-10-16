import type { Category } from "@/data/resume";
import type { Glyph } from "@/components/PixelIcon.astro";

// One color + one pixel glyph per kind of work. Color means "kind", never "importance".
export const categoryStyle: Record<Category, { glyph: Glyph; color: string; short: string }> = {
	"AI / ML": { glyph: "ml", color: "var(--cat-ml)", short: "ML" },
	"Embedded & Systems": { glyph: "embedded", color: "var(--cat-embedded)", short: "Embedded" },
	Backend: { glyph: "backend", color: "var(--cat-backend)", short: "Backend" },
	Apps: { glyph: "apps", color: "var(--cat-apps)", short: "Apps" },
};
