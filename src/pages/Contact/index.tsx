import { ContactChartItem } from '@/components/ContactChartItem';
import { CHART_LISTS, CONTACTS_LINKS } from '@/constants/contactLists';
import { useTheme } from '@/hooks/useTheme';
import { getLinkClass } from '@/utils/getLinkClass.helper';

import * as styles from './styles.module.scss';

const Contacts = () => {
	const { theme } = useTheme();

	return (
		<div
			className={getLinkClass(styles.container, styles.containerDark, theme)}
		>
			<h2 className={styles.containerTitle}>
				Get in touch with our creator-friendly support team
			</h2>
			<div className={styles.containerSubTitle}>
				<h4>
					Our business hours are 9AM-6PM ET Monday-Friday and 9AM/5PM ET on
					weekends.
				</h4>
			</div>
			<div className={styles.containerContactBlock}>
				{CHART_LISTS.map(({ title, text, link, id }) => (
					<ContactChartItem key={id} title={title} text={text} link={link} />
				))}
			</div>
			<ul className={styles.list}>
				{CONTACTS_LINKS.map(({ id, dest, name }) => (
					<li key={id}>
						<a
							href={dest}
							className={getLinkClass(styles.link, styles.linkDark, theme)}
							target="_blank"
							rel="noreferrer"
						>
							{name}
						</a>
					</li>
				))}
			</ul>
		</div>
	);
};

export default Contacts;
