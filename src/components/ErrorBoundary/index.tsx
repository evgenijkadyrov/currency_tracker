import { Component, ErrorInfo, ReactNode } from 'react';

import * as styles from './styles.module.scss';

interface ErrorBoundaryState {
	error: boolean;
}

interface ErrorBoundaryProps {
	children: ReactNode;
}

export class ErrorBoundary extends Component<
	ErrorBoundaryProps,
	ErrorBoundaryState
> {
	constructor(props: ErrorBoundaryProps) {
		super(props);
		this.state = {
			error: false,
		};
	}

	static getDerivedStateFromError() {
		return { error: true };
	}

	componentDidCatch(error: Error, errorInfo: ErrorInfo) {
		console.error('Uncaught error: ', error, errorInfo);
	}

	render() {
		const { error } = this.state;
		const { children } = this.props; // Unused prop warning fixed
		return (
			<div>
				{error ? (
					<div className={styles.errorWrapper}>
						<div className={styles.heading}>
							Something went wrong &#9785;...
						</div>
					</div>
				) : (
					children
				)}
			</div>
		);
	}
}
