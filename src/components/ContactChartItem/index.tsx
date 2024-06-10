import React from 'react';

import { AppRoutes } from '@/constants/appRoutes';
import { useTheme } from '@/hooks/useTheme';
import { getLinkClass } from '@/utils/getLinkClass.helper';

import * as styles from './styles.module.scss';

interface IContactChartItem {
	title: string;
	text: string;
	link: string;
}
export const ContactChartItem = ({ title, text, link }: IContactChartItem) => {
	const { theme } = useTheme();
	return (
		<div
			className={getLinkClass(
				styles.contactBlockContent,
				styles.contactBlockContentDark,
				theme
			)}
		>
			<p className={styles.contactBlockContentTitle}>{title}</p>
			<p
				className={getLinkClass(
					styles.contactBlockContentText,
					styles.contactBlockContentTextDark,
					theme
				)}
			>
				{' '}
				{text}
			</p>
			<a className={styles.contactBlockContentLink} href={AppRoutes.CONTACTS}>
				{link}{' '}
			</a>
		</div>
	);
};
