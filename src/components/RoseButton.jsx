function RoseButton({
  px = 'px-5',
  py = 'py-2',
  children,
  onClick,
}) {
  return (
    <button
      onClick={onClick}
      className={`${px} ${py} bg-[#6c2b3d] text-white text-sm rounded hover:bg-[#581d2f] transition`}
    >
      {children}
    </button>
  );
}

export default RoseButton;
