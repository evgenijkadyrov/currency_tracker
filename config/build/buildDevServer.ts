import { BuildsOptions } from 'config/build/interfaces';

export const buildDevServer = ({ port }: BuildsOptions) => {
	return {
		port: port ?? 3000,
		historyApiFallback: true,
		hot: true,
	};
};
