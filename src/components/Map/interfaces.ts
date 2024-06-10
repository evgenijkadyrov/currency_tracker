export interface GeoJSONFeature {
	type: string;
	id: string;
	geometry: {
		type: string;
		coordinates: [number, number];
	};
	properties: {
		xid: string;
		name: string;
		dist: number;
		rate: number;
		osm: string;
		kinds: string;
	};
}
export interface FeatureWithCurrencies extends GeoJSONFeature {
	currencies: string[];
}
