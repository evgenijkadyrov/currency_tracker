import { ICurrencyData } from '@/api/currency';
import { BasicItem } from '@/components/basicItem';
import { DataAssets } from '@/constants/dataAssets';

import * as styles from './styles.module.scss';

interface IStocksBlock {
	title: string;
	data: ICurrencyData;
	setModalOpen: (value: boolean) => void;
	setSymbol: (value: string) => void;
}
export const StocksBlock = ({
	title,
	data,
	setModalOpen,
	setSymbol,
}: IStocksBlock) => (
	<div className={styles.container}>
		<div className={styles.title}> {title}</div>
		<div className={styles.wrapper}>
			{data?.rates.map((asset) => {
				const name = DataAssets[asset.asset_id_quote].title;
				const { icon } = DataAssets[asset.asset_id_quote];
				return (
					<BasicItem
						key={asset.asset_id_quote}
						name={name}
						value={asset.rate}
						icon={icon}
						setModalOpen={setModalOpen}
						setSymbol={setSymbol}
					/>
				);
			})}
		</div>
	</div>
);
