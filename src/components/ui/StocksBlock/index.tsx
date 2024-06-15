import { useState } from 'react';

import { ICurrencyData } from '@/api/currency';
import { ExchangeBlock } from '@/components/ExchangeBlock';
import { Modal } from '@/components/Modal';
import { BasicItem } from '@/components/ui/BasicItem';
import { DataAssets } from '@/constants/dataAssets';
import { useModalAction } from '@/hooks/useModalAction';

import * as styles from './styles.module.scss';

interface IStocksBlock {
	title: string;
	data: ICurrencyData | undefined;
	disabled?: boolean | undefined;
}

export const StocksBlock = ({
	title,
	data,
	disabled = false,
}: IStocksBlock) => {
	const [currentSymbol, setCurrentSymbol] = useState('');
	const { isModalActive, handleModalOpen, handleModalClose } = useModalAction();

	const handleSymbol = (value: string | undefined) => {
		if (value) setCurrentSymbol(value);
	};
	return (
		<div className={styles.container}>
			{isModalActive && (
				<Modal title="" onClose={handleModalClose}>
					<ExchangeBlock currentSymbol={currentSymbol} />
				</Modal>
			)}
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
							setModalOpen={handleModalOpen}
							setSymbol={handleSymbol}
							disabled={disabled}
						/>
					);
				})}
			</div>
		</div>
	);
};
