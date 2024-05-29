import logo from '@/assets/diagram-svgrepo-com 1.png';
import * as styles from '@/components/navPanel/styles.module.scss';

export const Logo = () => (
	<div className={styles.containerImage}>
		<img src={logo} alt="logo" width={40} height={41} />
	</div>
);
