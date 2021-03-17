import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import filterlogo from "../res/filter.png";
import "../styles/filter.css";
const Filter = () => {
  return (
    <div className="filter">
      <Dropdown className="btn-filter-g">
        <Dropdown.Toggle
          className="btn-filter"
          variant="primary"
          id="dropdown-basic"
        >
          <img
            src={filterlogo}
            alt="filter"
            width="30px"
            style={{ paddingRight: "10px" }}
          />
          Filtrer Par...
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item href="/#/deal">le plus récent</Dropdown.Item>
          <Dropdown.Item href="#/action-2">le plus liké</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default Filter;
