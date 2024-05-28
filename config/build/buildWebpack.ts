import webpack from 'webpack';
import { buildDevServer } from './buildDevServer';
import { buildLoader } from './buildLoader';
import { BuildPlatform, BuildsOptions } from './types';
import { buildPlugins } from './buildPlugin';
import TerserPlugin from 'terser-webpack-plugin';

export type Mode = 'production' | 'development';

export interface EnvVariables {
	mode: Mode;
	port: number;
	platform?: BuildPlatform;
}

export function buildWebpack(options: BuildsOptions): webpack.Configuration {
	const { mode, paths } = options;
	const isDev = mode === 'development';
	const isProd = mode === 'production';
	const optimizationConfig = {
		minimize: true,
		minimizer: [new TerserPlugin()],
	};
	return {
		mode: mode ?? 'development',
		entry: paths.entry,
		devtool: isDev ? 'inline-source-map' : false,
		module: {
			rules: buildLoader(options),
		},
		resolve: {
			extensions: ['.tsx', '.ts', '.js'],
			alias: {
				'@': paths.src,
				'@router': paths.src,
			},
		},
		plugins: buildPlugins(options),
		output: {
			filename: '[name].[contenthash].js',
			path: paths.output,
			clean: true,
		},
		devServer: isDev ? buildDevServer(options) : undefined,
		optimization: isProd ? optimizationConfig : {},
		performance: {
			hints: false,
			maxEntrypointSize: 512000,
			maxAssetSize: 512000,
		},
	};
}
