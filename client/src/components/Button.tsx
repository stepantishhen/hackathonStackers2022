import React from 'react';

interface ButtonProps {
	handleClick: () => void;
	placeholder: string;
	isActive?: boolean;
	className?: string;
}

const Button = ({ handleClick, isActive, placeholder, className }: ButtonProps) => {
	return (
		<button onClick={handleClick} className={`btn ${isActive && 'btn--active'} ${className}`}>
			{placeholder}
		</button>
	);
};

export default Button;
