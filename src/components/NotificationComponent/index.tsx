import * as styles from './styles.module.scss';

export const Notification = () => (
	<section>
		<div className={styles.container}>
			<strong className={styles.text}>Well done!</strong> Chart for 30 days
			ready!!!
		</div>
	</section>
);
