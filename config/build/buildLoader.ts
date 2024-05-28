import { ModuleOptions } from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { BuildsOptions } from './types';
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
		test: /\.svg$/,
		use: [
			{
				loader: '@svgr/webpack',
				options: {
					icon: true,
					svgoConfig: {
						plugins: [
							{
								name: 'convertColors',
								params: { currentColor: true },
							},
						],
					},
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
	const babelLoader = buildBabelLoader(options);
	return [
		scssLoader,
		//tsLoader,
		babelLoader,
		assetLoader,
		svgrLoader,
	];
};
