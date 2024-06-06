import { instanceBanks } from '@/api/api';
import {
	FeatureWithCurrencies,
	GeoJSONFeature,
} from '@/components/Map/interfaces';
import { API_OPEN_TRIP } from '@/constants/api';
import { getRandomCurrencies } from '@/utils/getRandomCurrencies';

export const fetchAllBank = async (lon: string, lat: string) => {
	try {
		const { data } = await instanceBanks.get(
			`radius?radius=2000&lon=${lon}&lat=${lat}&kinds=banks&apikey=${API_OPEN_TRIP}`
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
