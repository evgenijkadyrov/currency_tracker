import { DataAssets, IDataAssets } from '@/constants/dataAssets';

export const getAssetsList = (value: IDataAssets) =>
	Object.keys(value).join(',');
export const currencies = getAssetsList(DataAssets).split(',');
