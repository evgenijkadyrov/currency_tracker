import { ContextType, PureComponent, SyntheticEvent } from 'react';

import { ThemeContext } from '@/components/Theme';
import { currencies } from '@/utils/getCurrenciesList';
import { getLinkClass } from '@/utils/getLinkClass.helper';

import * as styles from './styles.module.scss';

interface IState {
	isListOpen: boolean;
}

interface IProps {
	inputValue: string;
	setInputValue: (newValue: string) => void;
}

export const getFilteredSymbols = (
	symbols: string[],
	inputValue: string
): string[] =>
	symbols
		.filter((symbol) => symbol.toLowerCase().includes(inputValue.toLowerCase()))
		.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));

export class Search extends PureComponent<IProps, IState> {
	static contextType = ThemeContext;

	context!: ContextType<typeof ThemeContext>;

	constructor(props: IProps) {
		super(props);
		this.state = {
			isListOpen: true,
		};
	}

	handleItemClick = (e: SyntheticEvent): void => {
		const target = e.target as HTMLElement;
		const { setInputValue } = this.props;
		this.setState((prevState) => ({
			...prevState,
			isListOpen: false,
		}));
		setInputValue(target.textContent ?? '');
	};

	handleChange = (e: SyntheticEvent): void => {
		const { setInputValue } = this.props;
		const target = e.target as HTMLInputElement;

		setInputValue(target.value);
	};

	handleInputClick = (): void => {
		this.setState((prevState) => ({ ...prevState, isListOpen: true }));
	};

	override render() {
		const { isListOpen } = this.state;
		const { inputValue } = this.props;
		const symbols: string[] = currencies;
		const filteredSymbols = getFilteredSymbols(symbols, inputValue);
		const { theme } = this.context;
		return (
			<div>
				<h1 className={getLinkClass(styles.title, styles.titleDark, theme)}>
					Search currency in the bank
				</h1>
				<div className={styles.inputContainer}>
					<input
						type="text"
						placeholder="Сurrency search..."
						value={inputValue}
						onChange={this.handleChange}
						className={getLinkClass(styles.input, styles.inputDarkTheme, theme)}
						onClick={this.handleInputClick}
					/>
					<ul className={styles.currencyList}>
						{inputValue.length !== 0 &&
							isListOpen &&
							filteredSymbols.map((symbol) => (
								<li key={symbol} className={styles.currencyListItem}>
									<button
										type="button"
										onClick={this.handleItemClick}
										className={styles.currencyListItemButton}
									>
										{symbol}
									</button>
								</li>
							))}
					</ul>
				</div>
			</div>
		);
	}
}
