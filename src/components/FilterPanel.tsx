// components/FilterPanel.tsx
import { useState } from "react";

interface FilterPanelProps {
  filters: string[];
  activeFilters: string[];
  onFilterChange: (filter: string) => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  filters,
  activeFilters,
  onFilterChange,
}) => {
  const [open, setOpen] = useState(true);

  return (
    <div className="mb-6">
      <button
        onClick={() => setOpen(!open)}
        className="mb-2 text-blue-600 hover:underline"
      >
        {open ? "Ocultar filtros" : "Mostrar filtros"}
      </button>

      {open && (
        <div className="flex flex-wrap gap-2">
          {filters.map((filter) => {
            const isActive = activeFilters.includes(filter);
            return (
              <button
                key={filter}
                onClick={() => onFilterChange(filter)}
                className={`px-3 py-1 rounded-full text-sm border ${
                  isActive
                    ? "bg-blue-500 text-white border-blue-500"
                    : "bg-white text-gray-800 border-gray-300 hover:bg-gray-100"
                }`}
              >
                {filter}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default FilterPanel;
