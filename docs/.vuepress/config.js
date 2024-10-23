module.exports = {
	base: "/",
	locales: {
		"/en": {
			lang: "en-US", // this will be set as the lang attribute on <html>
			title: "Introduction to Vue.js",
			description: "Discover Vue.js framework through this 2-days training",
		},

		"/": {
			lang: "fr-FR",
			title: "Introduction à Vue.js",
			description: "Découvrez le framework Vue.js version 3",
		},
	},

	themeConfig: {
		locales: {
			"/en/": {
				selectText: "Language",
				label: "English",
				sidebar: [
					"/en/",
					"/en/presentation/",
					"/en/tooling/",
					"/en/views/",
					"/en/directives/",
					"/en/components/",
					"/en/reactivity/",
					"/en/state/",
					"/en/routing/",
					"/en/http/",
					"/en/tests/",
					"/en/reusability/",
					"/en/ecosystem/",
				],
			},

			"/": {
				selectText: "Langue",
				label: "Français",
				sidebar: [
					"/",
					"/presentation/",
					"/outillage/",
					"/vues/",
					"/directives/",
					"/composants/",
					"/reactivite/",
					"/etat/",
					"/routage/",
					"/http/",
					"/tests/",
					"/reutilisabilite/",
					"/ecosysteme/",
				],
			},
		},
	},

	plugins: [
		require("./plugins/copy-code/"),
		"vuepress-plugin-global-toc"
	],
}