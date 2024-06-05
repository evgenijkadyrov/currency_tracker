import axios from 'axios';

import { FeatureWithCurrencies, GeoJSONFeature } from '@/Map/interfaces';
import { getRandomCurrencies } from '@/utils/getRandomCurrencies';

const instance = axios.create({
	baseURL: 'https://api.opentripmap.com/0.1/en/places/',
});

export const fetchAllBank = async (lon: string, lat: string) => {
	try {
		const { data } = await instance.get(
			`radius?radius=2000&lon=${lon}&lat=${lat}&kinds=banks&apikey=5ae2e3f221c38a28845f05b642f5a374169ff110ff90b6699fd8a767`
		);
		return data?.features.map(
			(feature: GeoJSONFeature): FeatureWithCurrencies => ({
				...feature,
				currencies: getRandomCurrencies(),
			})
		);
	} catch (error) {
		return [];
	}
};
