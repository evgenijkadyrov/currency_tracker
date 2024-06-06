import { Mode } from './buildWebpack';
export type BuildPaths = {
	entry: string;
	output: string;
	html: string;
	src: string;
	public: string;
	router: string;
	components: string;
};
export type BuildPlatform = 'mobile' | 'desktop';
export interface BuildsOptions {
	port: number;
	paths: BuildPaths;
	mode: Mode;
	analyzer?: boolean;
	platform?: BuildPlatform;
}
