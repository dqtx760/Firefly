/**
 * Based on the discussion at https://github.com/expressive-code/expressive-code/issues/153#issuecomment-2282218684
 */
import { definePlugin } from "@expressive-code/core";

export function pluginLanguageBadge() {
	return definePlugin({
		name: "Language Badge",
		baseStyles: `
		      [data-language]::before {
		        position: absolute;
		        z-index: 2;
		        right: 1.5rem;
		        top: 0.25rem;
		        padding: 0.1rem 0.5rem;
		        content: attr(data-language);
		        font-size: 0.7rem;
		        font-weight: bold;
		        text-transform: uppercase;
		        color: oklch(0.75 0.1 var(--hue));
		        background: oklch(0.33 0.035 var(--hue));
		        border-radius: 0.4rem;
		        pointer-events: none;
		        transition: opacity 0.3s;
		        opacity: 0;
		      }
		      /* 未指定语言的代码块显示 CODE 标记 */
		      [data-language="plaintext"]::before,
		      [data-language="Plain"]::before {
		        content: "CODE";
		      }
		      /* 空闲时显示语言标记 */
		      .frame:not(.has-title):not(.is-terminal) [data-language]::before {
		        opacity: 0.35;
		      }
		      /* hover 时保持可见 */
		      .frame:not(.has-title):not(.is-terminal):hover [data-language]::before {
		        opacity: 0.3;
		      }
		    `,
	});
}
