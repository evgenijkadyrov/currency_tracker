import { BasicItem } from '@/components/basicItem';

import * as styles from './styles.module.scss';

interface IStocksBlock {
	title: string;
}
export const StocksBlock = ({ title }: IStocksBlock) => (
	<div className={styles.container}>
		<div className={styles.title}> {title}</div>
		<div
			style={{
				display: 'flex',
				justifyContent: 'space-between',
				marginTop: '50px',
			}}
		>
			<BasicItem />
			<BasicItem />
		</div>
	</div>
);
