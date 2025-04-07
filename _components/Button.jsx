function Button({
	children,
	type = "button",
	onClick,
	disabled = false,
	className,
}) {
	return (
		<button
			type={type}
			onClick={onClick}
			disabled={disabled}
			className={`w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500  ${
				disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
			} ${className}`}
		>
			{children}
		</button>
	);
}

export default Button;
