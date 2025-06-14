function Button({
  px = 'px-5',
  py = 'py-2',
  className = '',
  children,
  onClick,
}) {
  return (
    <button
      onClick={onClick}
      className={`${px} ${py} text-sm rounded transition ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;
