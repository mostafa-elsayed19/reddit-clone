function Button({
  children,
  type = "button",
  onClick,
  disabled = false,
  className,
  fullWidth = false,
  buttonType = "default",
}) {
  const btnStyles = {
    delete: "text-red-500 hover:text-red-600 p-0",
    edit: "text-yellow-500 hover:text-yellow-600  p-0",
    submit:
      "text-white px-4 py-2 bg-green-500 hover:bg-green-600 focus:ring-green-700",
    default:
      "text-white focus:ring-2 bg-blue-500 hover:bg-blue-600 focus:ring-blue-700 px-4 py-2",
  };
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`rounded-md focus:outline-none ${
        disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"
      } ${fullWidth ? "w-full" : ""} ${className} ${
        btnStyles[buttonType] || btnStyles.default
      }`}
    >
      {children}
    </button>
  );
}

export default Button;
