import React from "react";

const TableHeader = ({ onSort, selectedSort, columns }) => {
  const currentSortArrow = (item) => {
    if (item.path) {
      
      if (item.order === "asc") {
        return <i className="bi bi-caret-down-fill"></i>;
      }
      if (item.order === "desc") {
        return <i className="bi bi-caret-up-fill"></i>;
      }
    }
  };
  const handleSort = (item) => {
    if (selectedSort.path === item) {
      onSort({
        ...selectedSort,
        order: selectedSort.order === "asc" ? "desc" : "asc",
      });
    } else {
      onSort({ path: item, order: "asc" });
    }
  };

  return (
    <thead>
      <tr>
        {Object.keys(columns).map((column) => (
          <th
            key={column}
            onClick={
              columns[column].path && (() => handleSort(columns[column].path))
            }
            {...{ role: columns[column].path && "button" }}
            scope="col"
          >
            {columns[column].name}
            {(selectedSort.path ===columns[column].path) && currentSortArrow(selectedSort)}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
