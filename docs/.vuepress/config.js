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
					"/",
					"/presentation/",
					"/tooling/",
					"/views/",
					"/directives/",
					"/components/",
					"/reactivity/",
					"/state/",
					"/routing/",
					"/http/",
					"/tests/",
					"/reusability/",
					"/ecosystem/",
				],
			},

			"/": {
				selectText: "Langue",
				label: "Français",
				sidebar: [
					"/fr/",
					"/fr/presentation/",
					"/fr/outillage/",
					"/fr/vues/",
					"/fr/directives/",
					"/fr/composants/",
					"/fr/reactivite/",
					"/fr/etat/",
					"/fr/routage/",
					"/fr/http/",
					"/fr/tests/",
					"/fr/reutilisabilite/",
					"/fr/ecosysteme/",
				],
			},
		},
	},

	plugins: [
		require("./plugins/copy-code/"),
		"vuepress-plugin-global-toc"
	],
}