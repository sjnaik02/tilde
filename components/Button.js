function Button({ children, onClick, className, disabled }) {
  return (
    <button
      className={`mx-2 rounded border-2 border-blue-500 py-2 px-4 font-bold text-blue-500 hover:border-blue-500 hover:bg-blue-500 hover:text-gray-100 disabled:border-gray-400 disabled:text-gray-100 disabled:hover:bg-gray-800 ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Button;
