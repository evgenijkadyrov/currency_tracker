import { ChangeEvent } from 'react';

interface IInputProps {
	type: string;
	name: string;
	value: string | number;
	className: string;
	onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
	placeholder?: string;
	disabled?: boolean;
}

export const Input = ({
	type,
	name,
	value,
	className,
	onChange,
	placeholder = 'placeholder',
	disabled = false,
}: IInputProps) => {
	const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		if (onChange) {
			onChange(event);
		}
	};

	return (
		<input
			disabled={disabled}
			type={type}
			data-test="input"
			name={name}
			value={value}
			className={className}
			onChange={handleInputChange}
			placeholder={placeholder}
		/>
	);
};
