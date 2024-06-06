import { ChangeEvent } from 'react';

interface IInputProps {
	type: string;
	name: string;
	value: string | number;
	className: string;
	onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
	placeholder?: string;
}

export const Input = ({
	type,
	name,
	value,
	className,
	onChange,
	placeholder = 'placeholder',
}: IInputProps) => {
	const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		onChange(event);
	};

	return (
		<input
			type={type}
			name={name}
			value={value}
			className={className}
			onChange={handleInputChange}
			placeholder={placeholder}
		/>
	);
};
