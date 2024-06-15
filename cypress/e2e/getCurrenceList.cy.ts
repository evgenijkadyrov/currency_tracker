import { IDataAssets } from '@/constants/dataAssets';

describe('getAssetsList', () => {
	it('returns a comma-separated list of asset keys', () => {
		const testData = {
			USDT: {
				id: 1,
				title: 'Commercial Dollar',
				icon: null,
				symbol: 'USDT',
			},
			ARS: {
				id: 2,
				title: 'Argentine Peso',
				icon: null,
				symbol: 'ARS',
			},
			CAD: {
				id: 3,
				title: 'Canadian Dollar',
				icon: null,
				symbol: 'CAD',
			},
		};
		const getAssetsList = (value: any) => Object.keys(value).join(',');

		const result = getAssetsList(testData);
		const expectedList = 'USDT,ARS,CAD';

		expect(result).to.equal(expectedList);
	});
});
