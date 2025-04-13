function Button({
  children,
  type = "button",
  onClick,
  disabled = false,
  className,
  fullWidth = false,
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:ring-2 focus:ring-blue-700 focus:outline-none ${
        disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"
      } ${fullWidth ? "w-full" : ""} ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;
