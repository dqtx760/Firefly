import fs from "node:fs";
import path from "node:path";
import type { AstroIntegration } from "astro";

export default function memoriaAssets(): AstroIntegration {
	return {
		name: "memoria-assets",
		hooks: {
			"astro:build:start": () => {
				const src = path.resolve("src/content/Memoria/attachments");
				const dest = path.resolve("public/memoria-attachments");
				if (!fs.existsSync(src)) return;
				fs.mkdirSync(dest, { recursive: true });
				for (const file of fs.readdirSync(src)) {
					fs.copyFileSync(path.join(src, file), path.join(dest, file));
				}
			},
			"astro:server:start": () => {
				const src = path.resolve("src/content/Memoria/attachments");
				const dest = path.resolve("public/memoria-attachments");
				if (!fs.existsSync(src)) return;
				fs.mkdirSync(dest, { recursive: true });
				for (const file of fs.readdirSync(src)) {
					fs.copyFileSync(path.join(src, file), path.join(dest, file));
				}
			},
		},
	};
}
