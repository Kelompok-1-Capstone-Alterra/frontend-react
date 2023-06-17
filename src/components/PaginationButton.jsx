export default function PaginationButton({
  totalPages,
  currentPage,
  handlePageChange,
  className,
}) {
  return (
    <div className={`${className}`}>
      <div className="border rounded-lg w-fit px-[13px] py-[15px]">
        <button
          id="previousPageButton"
          className={`w-[35px] ease-in-out transition-all duration-300 hover:bg-neutral-20 h-[35px] border border-neutral-20 text-neutral-60 rounded-md me-2 `}
          onClick={() => {
            return currentPage > 1 ? handlePageChange(currentPage - 1) : null;
          }}
        >
          &lt;
        </button>
        {[...Array(totalPages)].map((_, i) => (
          <button
            id={`pageButton${i + 1}`}
            key={i}
            className={`w-[35px] h-[35px] ease-in-out transition-all duration-200 border border-neutral-20 rounded-md me-2 ${
              currentPage === i + 1
                ? "btn-primary text-neutral-10"
                : "text-neutral-60 hover:bg-neutral-20"
            }`}
            onClick={() => handlePageChange(i + 1)}
          >
            {i + 1}
          </button>
        ))}
        <button
          id="nextPageButton"
          className={`w-[35px] ease-in-out transition-all duration-200 hover:bg-neutral-20 h-[35px] border border-neutral-20 text-neutral-60 rounded-md me-2 `}
          onClick={() => {
            return currentPage < totalPages
              ? handlePageChange(currentPage + 1)
              : null;
          }}
        >
          &gt;
        </button>
      </div>
    </div>
  );
}
