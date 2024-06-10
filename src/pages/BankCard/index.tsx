import { Component } from 'react';

import MapComponent from '@/components/Map';
import { Search } from '@/components/ui/Search';

import * as styles from './styles.module.scss';

interface IState {
	inputValue: string;
}
interface IProps {}
class BankCard extends Component<IProps, IState> {
	constructor(props: IProps) {
		super(props);
		this.state = {
			inputValue: '',
		};
	}

	setInputValue = (newValue: string): void => {
		this.setState((prevState) => ({ ...prevState, inputValue: newValue }));
	};

	override render() {
		const { inputValue } = this.state;
		return (
			<div className={styles.mapContainer}>
				<Search inputValue={inputValue} setInputValue={this.setInputValue} />
				<MapComponent inputValue={inputValue} />
			</div>
		);
	}
}
export default BankCard;
