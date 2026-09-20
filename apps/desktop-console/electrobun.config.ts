import type { ElectrobunConfig } from "electrobun";

export default {
	app: {
		name: "project0-desktop",
		identifier: "dev.project0.desktop",
		version: "1.0.0",
	},
	build: {
		mainProcess: "cottontail",
		cottontail: {
			entrypoint: "src/bun/index.ts",
		},
		views: {},
		copy: {},
		mac: {
			bundleCEF: false,
		},
		linux: {
			bundleCEF: false,
		},
		win: {
			bundleCEF: false,
		},
	},
} satisfies ElectrobunConfig;
