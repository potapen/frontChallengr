import { Button, ButtonGroup } from "@mui/material";
import "./FilterButtons.css";

const FilterButtons = ({ filterItem, menuItems, resetFilters }) => {
  return (
    <div className="filterButtons">
      <ButtonGroup
        variant="contained"
        aria-label="outlined primary button group"
      >
        {menuItems.map((Val, id) => {
          return (
            <Button size="small" key={id} onClick={() => filterItem(Val)}>
              {Val}
            </Button>
          );
        })}
        <Button size="small" onClick={() => resetFilters()}>
          All
        </Button>
      </ButtonGroup>
    </div>
  );
};

export default FilterButtons;
