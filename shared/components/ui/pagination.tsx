import * as React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  total: number;
  current: number;
  onChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({ total, current, onChange }) => {
  const prevDisabled = current === 1;
  const nextDisabled = current === total;

  return (
    <div className="flex justify-center items-center gap-4">
      <button
        className={`p-2 ${prevDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={prevDisabled}
        onClick={() => onChange(current - 1)}
      >
        <ChevronLeft className="h-4 w-4" />
      </button>
      {Array.from({ length: total }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          className={`px-4 py-2 rounded ${page === current ? 'bg-[#244545] text-white' : ''}`}
          onClick={() => onChange(page)}
        >
          {page}
        </button>
      ))}
      <button
        className={`p-2 ${nextDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={nextDisabled}
        onClick={() => onChange(current + 1)}
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
};
