import { ModuleOptions } from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { BuildsOptions } from 'config/build/interfaces';
import ReactRefreshTypeScript from 'react-refresh-typescript';
import { buildBabelLoader } from './buildBabelLoader';

export const buildLoader = (options: BuildsOptions): ModuleOptions['rules'] => {
	const isDev = options.mode === 'development';
	const cssLoaderWithModules = {
		loader: 'css-loader',
		options: {
			modules: {
				localIdentName: isDev ? '[path][name]__[local]' : '[hash:base64:8]',
			},
		},
	};
	const assetLoader = {
		test: /\.(png|jpg|jpeg|gif)$/i,
		type: 'asset/resource',
	};
	const svgrLoader = {
		test: /\.svg$/i,
		issuer: /\.[jt]sx?$/,
		use: [
			{
				loader: '@svgr/webpack',
				options: {
					icon: true,
				},
			},
		],
	};

	const scssLoader = {
		test: /\.s[ac]ss$/i,
		use: [
			isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
			cssLoaderWithModules,
			'sass-loader',
		],
	};

	const tsLoader = {
		test: /\.tsx?$/,
		use: [
			{
				loader: require.resolve('ts-loader'),
				options: {
					getCustomTransformers: () => ({
						before: [isDev && ReactRefreshTypeScript()].filter(Boolean),
					}),
					transpileOnly: true,
				},
			},
		],
		exclude: /node_modules/,
	};
	const babelLoader = buildBabelLoader();
	return [scssLoader, babelLoader, assetLoader, svgrLoader];
};
