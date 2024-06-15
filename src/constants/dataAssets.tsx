import { ReactNode } from 'react';

import AustralianDollar from '@/assets/icons/Australian Dollar Icon.svg';
import Bitcoin from '@/assets/icons/Bitcoin Icon.svg';
import Bovespa from '@/assets/icons/Bovespa Icon.svg';
import Dollar from '@/assets/icons/Dollar Icon.svg';
import Euro from '@/assets/icons/Euro Icon.svg';
import Ifix from '@/assets/icons/IFIX.svg';
import Libra from '@/assets/icons/Libra Icon.svg';
import ArgentinePeso from '@/assets/icons/Peso Argentino Icon.svg';
import Yuan from '@/assets/icons/Won Icon.svg';
import Yen from '@/assets/icons/Yen Icon.svg';

interface DataAssetType {
	id: number;
	title: string;
	icon: ReactNode;
	symbol: string;
}

export interface IDataAssets {
	[key: string]: DataAssetType;
}

export const DataAssets: IDataAssets = {
	USDT: {
		id: 1,
		title: 'Commercial Dollar',
		icon: <Dollar width={80} height={80} />,
		symbol: 'USDT',
	},
	ARS: {
		id: 2,
		title: 'Argentine Peso',
		icon: <ArgentinePeso width={80} height={80} />,
		symbol: 'ARS',
	},
	CAD: {
		id: 3,
		title: 'Canadian Dollar',
		icon: <Dollar width={80} height={80} />,
		symbol: 'CAD',
	},
	JPY: {
		id: 4,
		title: 'Yen',
		icon: <Yen width={80} height={80} />,
		symbol: 'JPY',
	},
	AUD: {
		id: 5,
		title: 'Australian Dollar',
		icon: <AustralianDollar width={80} height={80} />,
		symbol: 'AUD',
	},
	CNY: {
		id: 6,
		title: 'Yuan',
		icon: <Yuan width={80} height={80} />,
		symbol: 'CNY',
	},
	EUR: {
		id: 7,
		title: 'Euro',
		icon: <Euro width={80} height={80} />,
		symbol: 'EUR',
	},
	BTC: {
		id: 8,
		title: 'Bitcoin',
		icon: <Bitcoin width={80} height={80} />,
		symbol: 'BTC',
	},
	ETH: {
		id: 9,
		title: 'Libra',
		icon: <Libra width={80} height={80} />,
		symbol: 'ETH',
	},
	'Bovespa Index': {
		id: 10,
		title: 'Bovespa Index',
		icon: <Bovespa width={80} height={80} />,
		symbol: 'ETH',
	},
	IFIX: {
		id: 11,
		title: 'IFIX',
		icon: <Ifix width={80} height={80} />,
		symbol: 'ETH',
	},
};

export const dataStocks = {
	asset_id_base: 'IFIX',
	rates: [
		{
			time: '2024-05-31T03:50:14.0000000Z',
			asset_id_quote: 'IFIX',
			rate: 0.025,
		},
		{
			time: '2024-05-31T03:50:14.0000000Z',
			asset_id_quote: 'Bovespa Index',
			rate: 0.663,
		},
	],
};
