function VoteSection({ flex_direction = "flex-row", likes }) {
  return (
    <>
      <div
        className={`mb-6 flex items-center gap-2 text-gray-500 ${flex_direction}`}
      >
        <button>🔼</button>
        <span>{likes}</span>
        <button>🔽</button>
      </div>
    </>
  );
}

export default VoteSection;
