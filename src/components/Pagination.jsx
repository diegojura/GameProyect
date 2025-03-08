function Pagination({ currentPage, totalPages, onPageChange }) {
    const pages = Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
      if (totalPages <= 5) return i + 1;
      if (currentPage <= 3) return i + 1;
      if (currentPage >= totalPages - 2) return totalPages - 4 + i;
      return currentPage - 2 + i;
    });
  
    return (
      <div className="flex justify-center gap-2 mt-8">
        <button
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-metallic-100 text-metallic-600 rounded-lg hover:bg-metallic-200 disabled:opacity-50"
        >
          Primera
        </button>
        
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-metallic-100 text-metallic-600 rounded-lg hover:bg-metallic-200 disabled:opacity-50"
        >
          Anterior
        </button>
        
        {pages.map(page => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`px-4 py-2 rounded-lg ${
              currentPage === page 
                ? 'bg-accent-200 text-white' 
                : 'bg-metallic-100 text-metallic-600 hover:bg-metallic-200'
            }`}
          >
            {page}
          </button>
        ))}
        
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-metallic-100 text-metallic-600 rounded-lg hover:bg-metallic-200 disabled:opacity-50"
        >
          Siguiente
        </button>
        
        <button
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-metallic-100 text-metallic-600 rounded-lg hover:bg-metallic-200 disabled:opacity-50"
        >
          Última
        </button>
      </div>
    );
  }
  
  export default Pagination; 