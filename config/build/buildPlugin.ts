import HtmlWebpackPlugin from 'html-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import webpack, { Configuration, DefinePlugin } from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { BuildsOptions } from './types';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';
import path from 'path';

export const buildPlugins = ({
	mode,
	paths,
	analyzer,
	platform,
}: BuildsOptions): Configuration['plugins'] => {
	const isProd = mode === 'production';
	const isDev = mode === 'development';
	const plugins: Configuration['plugins'] = [
		new HtmlWebpackPlugin({ template: paths.html }),
		new DefinePlugin({
			platform: JSON.stringify(platform),
		}),
		new ForkTsCheckerWebpackPlugin(),
		new ReactRefreshWebpackPlugin(),
	];

	if (isProd) {
		plugins.push(
			new MiniCssExtractPlugin({
				filename: 'css/[name].[contenthash:8].css',
				chunkFilename: 'css/[name].[contenthash:8].css',
			})
		);
		if (analyzer) {
			plugins.push(new BundleAnalyzerPlugin());
		}
		plugins.push(
			new CopyPlugin({
				patterns: [
					{
						from: path.resolve(paths.public, 'images'),
						to: path.resolve(paths.output, 'images'),
					},
				],
			})
		);
	}
	if (isDev) {
		plugins.push(new webpack.ProgressPlugin());
	}
	return plugins;
};
