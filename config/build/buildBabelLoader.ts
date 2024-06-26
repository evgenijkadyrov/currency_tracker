export function buildBabelLoader() {
	return {
		test: /\.tsx?$/,
		exclude: /node_modules/,
		use: {
			loader: 'babel-loader',
			options: {
				presets: [
					'@babel/preset-env',
					['@babel/preset-react', { runtime: 'automatic' }],
					'@babel/preset-typescript',
				],
			},
		},
	};
}
