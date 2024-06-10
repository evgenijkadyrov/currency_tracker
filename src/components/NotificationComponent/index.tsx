import React from 'react';

import * as styles from './styles.module.scss';

export const Notification = () => (
	<section>
		<div className={styles.container}>
			<div>
				<strong className={styles.text}>Well done!</strong> Chart for 30 days
				ready!!!
			</div>
		</div>
	</section>
);
