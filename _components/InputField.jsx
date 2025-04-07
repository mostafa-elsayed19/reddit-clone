export default function InputField({
	label,
	type = "text",
	name,
	value,
	onChange,
	placeholder,
	required = false,
}) {
	return (
		<div>
			<label
				htmlFor={name}
				className="block text-sm font-medium text-gray-700"
			>
				{label}
			</label>
			<input
				type={type}
				id={name}
				name={name}
				value={value}
				onChange={onChange}
				className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md  focus:outline-none focus:ring-2 focus:ring-blue-500"
				placeholder={placeholder}
				required={required}
			/>
		</div>
	);
}
