import path from 'path';
import webpack from 'webpack';
import 'webpack-dev-server';
import { buildWebpack, EnvVariables } from './config/build/buildWebpack';
import { BuildPaths, BuildsOptions } from 'config/build/interfaces';

export default (env: EnvVariables) => {
	const paths: BuildPaths = {
		entry: path.resolve(__dirname, 'src', 'index.tsx'),
		html: path.resolve(__dirname, 'public', 'index.html'),
		output: path.resolve(__dirname, 'dist'),
		src: path.resolve(__dirname, 'src'),
		router: path.resolve(__dirname, 'src/router'),
		public: path.resolve(__dirname, 'public'),
		components: path.resolve(__dirname, 'src/components'),
	};
	const options: BuildsOptions = {
		port: env.port ?? 3000,
		mode: env.mode ?? 'development',
		paths,
		platform: env.platform ?? 'desktop',
	};

	const config: webpack.Configuration = buildWebpack(options);
	return config;
};
