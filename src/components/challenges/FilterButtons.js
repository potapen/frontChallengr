const FilterButtons = ({ filterItem, menuItems, resetFilters }) => {
  return (
    <>
      <div className="d-flex justify-content-center">
        {menuItems.map((Val, id) => {
          return (
            <button
              className="btn-dark text-white p-1 px-2 mx-5 btn fw-bold"
              key={id}
              onClick={() => filterItem(Val)}
            >
              {Val}
            </button>
          );
        })}
        <button
          className="btn-dark text-white p-1 px-3 mx-5 fw-bold btn"
          onClick={() => resetFilters()}
        >
          All
        </button>
      </div>
    </>
  );
};

export default FilterButtons;
