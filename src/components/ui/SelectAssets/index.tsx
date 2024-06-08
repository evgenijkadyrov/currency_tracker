import { ChangeEvent } from 'react';

import { useTheme } from '@/hooks/useTheme';

interface ISelectProps {
	name: string;
	id: string;
	className: string;
	defaultValue: string;
	options: string[];
	onChange: (value: string) => void;
}

export const SelectAsset = ({
	name,
	id,
	className,
	defaultValue,
	options,
	onChange,
}: ISelectProps) => {
	const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
		const selectedValue = event.target.value;
		onChange(selectedValue);
	};

	return (
		<select
			name={name}
			id={id}
			className={className}
			defaultValue={defaultValue}
			onChange={handleSelectChange}
		>
			{options.map((symbol) => (
				<option key={symbol} value={symbol}>
					{symbol}
				</option>
			))}
		</select>
	);
};
