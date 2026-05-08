export default function FilterBar({ filters, activeFilter, setActiveFilter }) {
  return (
    <div className="filter-bar">
      {filters.map((filter) => (
        <button
          key={filter}
          className={activeFilter === filter ? 'filter-chip active' : 'filter-chip'}
          onClick={() => setActiveFilter(filter)}
        >
          {filter}
        </button>
      ))}
    </div>
  );
}
