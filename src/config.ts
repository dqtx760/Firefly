import type {
	ExpressiveCodeConfig,
	GitHubEditConfig,
	ImageFallbackConfig,
	LicenseConfig,
	NavBarConfig,
	NoticeConfig,
	ProfileConfig,
	SiteConfig,
	UmamiConfig,
} from "./types/config";
import { LinkPreset } from "./types/config";

export const noticeConfig: NoticeConfig = {
	enable: false,
	level: "happy",
	content: "元宝发红包了！看置顶文章？",
};

export const siteConfig: SiteConfig = {
	title: "大强博客",
	subtitle: "大强同学｜AI 探索与技术分享",
	description:
		"大强同学(Derek Zhao)的个人技术博客，分享网络技术、服务器部署、内网穿透、静态网站搭建、CDN优化、容器化部署等技术教程与实践经验，专注于云原生、无服务器架构和前后端开发。",

	keywords: ["大强博客", "大强同学", "Derek Zhao", "dqtx", "技术博客"],
	lang: "zh_CN", // 'en', 'zh_CN', 'zh_TW', 'ja', 'ko', 'es', 'th'
	themeColor: {
		hue: 250, // 纯蓝色系 - 天蓝色调
		fixed: true, // Hide the theme color picker for visitors
		forceDarkMode: false, // Force dark mode and hide theme switcher
	},
	banner: {
		enable: false,
		src: "/xinghui.avif", // Relative to the /src directory. Relative to the /public directory if it starts with '/'

		position: "center", // Equivalent to object-position, only supports 'top', 'center', 'bottom'. 'center' by default
		credit: {
			enable: true, // Display the credit text of the banner image
			text: "Pixiv @chokei", // Credit text to be displayed

			url: "https://www.pixiv.net/artworks/122782209", // (Optional) URL link to the original artwork or artist's page
		},
	},
	background: {
		enable: false, // 没有背景图片，禁用 bg-box 覆盖层
		src: "",
		position: "center",
		size: "cover",
		repeat: "no-repeat",
		attachment: "fixed",
		opacity: 1,
	},
	toc: {
		enable: true, // Display the table of contents on the right side of the post
		depth: 2, // Maximum heading depth to show in the table, from 1 to 3
	},
	favicon: [
		// Leave this array empty to use the default favicon
		{
			src: "/avatar.jpg",
			sizes: "32x32",
		},
	],
	officialSites: [
		{ url: "https://dqtx.cc", alias: "主页" },
		{ url: "https://www.dqtx.cc", alias: "WWW" },
	],
	server: [
		{ url: "https://umami.acofork.com", text: "Umami" },
		{ url: "https://pic1.acofork.com", text: "RandomPic" },
	],
};

export const navBarConfig: NavBarConfig = {
	links: [
		LinkPreset.Home,
		LinkPreset.Archive,
		{
			name: "Gallery",
			url: "/gallery/",
			external: false,
		},
		{
			name: "Notes",
			url: "/notes/",
			external: false,
		},
		{
			name: "赞助",
			url: "/sponsors/",
			external: false,
		},
		{
			name: "Wiki",
			url: "/wiki/",
			external: true,
		},
		{
			name: "About",
			url: "https://ai.dqtx.cc/",
			external: true,
		},
		{
			name: "友链",
			url: "/friends/",
			external: false,
		},
		{
			name: "远程服务",
			url: "https://fix.dqtx.cc/",
			external: true,
		},
		{
			name: "作品集",
			url: "https://os.dqtx.cc/", // Internal links should not include the base path, as it is automatically added
			external: true, // Show an external link icon and will open in a new tab
		},
		{
			name: "工坊",
			url: "https://app.dqtx.cc/", // Internal links should not include the base path, as it is automatically added
			external: true, // Show an external link icon and will open in a new tab
		},
		{
			name: "RSS",
			url: "https://dqtx.cc/rss.xml",
			external: true,
		},
	],
};

export const profileConfig: ProfileConfig = {
	avatar: "/avatar.jpg", // Relative to the /src directory. Relative to the /public directory if it starts with '/'
	name: "Derek Zhao",
	bio: "大强同学 Derek Zhao<br>Build in Public 践行者<br>AI探索 · 效率工具 · 出海实操",
	links: [
		{
			name: "微信",
			icon: "qq", // Local icon (已改为微信样式)
			url: "javascript:;", // 占位链接
		},
		{
			name: "Telegram",
			icon: "telegram", // Local icon
			url: "https://t.me/+Vk17JyylJkdjMmU1",
		},
		{
			name: "Bilibili",
			icon: "bilibili", // Local icon
			url: "https://space.bilibili.com/491358682/upload/video",
		},
		{
			name: "GitHub",
			icon: "github", // Local icon
			url: "https://github.com/dqtx760",
		},
	],
};

export const licenseConfig: LicenseConfig = {
	enable: false,
	name: "CC BY-NC-SA 4.0",
	url: "https://creativecommons.org/licenses/by-nc-sa/4.0/",
};

export const imageFallbackConfig: ImageFallbackConfig = {
	enable: false,
	originalDomain: "https://eopfapi.acofork.com/pic?img=ua",
	fallbackDomain: "https://eopfapi.acofork.com/pic?img=ua",
};

export const umamiConfig: UmamiConfig = {
	enable: true,
	baseUrl: "https://umami.acofork.com",
	shareId: "CdkXbGgZr6ECKOyK",
	timezone: "Asia/Shanghai",
};

export const expressiveCodeConfig: ExpressiveCodeConfig = {
	theme: "github-dark",
};

export const gitHubEditConfig: GitHubEditConfig = {
	enable: true,
	baseUrl: "https://github.com/dqtx760/Firefly/blob/main/src/content/posts",
};

// todoConfig removed from here
