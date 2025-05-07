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
    delete: "bg-red-500 hover:bg-red-600 focus:ring-red-700 p-0",
    edit: "bg-yellow-500 hover:bg-yellow-600 focus:ring-yellow-700",
    submit: "bg-green-500 hover:bg-green-600 focus:ring-green-700",
    default: "bg-blue-500 hover:bg-blue-600 focus:ring-blue-700",
  };
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`rounded-md px-4 py-2 text-white focus:ring-2 focus:outline-none ${
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
