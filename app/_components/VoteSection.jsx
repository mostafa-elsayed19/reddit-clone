function VoteSection({ flex_direction = "flex-row", votes }) {
  return (
    <>
      <div
        className={`mb-6 flex items-center gap-2 text-gray-500 ${flex_direction}`}
      >
        <button>🔼</button>
        <span>{votes}</span>
        <button>🔽</button>
      </div>
    </>
  );
}

export default VoteSection;
