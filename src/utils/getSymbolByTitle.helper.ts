import { DataAssets } from '@/constants/dataAssets';

export const getSymbolByTitle = (title: string): string | undefined => {
	const assetEntries = Object.entries(DataAssets);
	const asset = assetEntries.find((item) => item[1].title === title);
	return asset?.[1]?.symbol;
};
