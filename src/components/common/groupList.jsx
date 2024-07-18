import React from "react";
import PropTypes from "prop-types";
const GroupList = ({
  items,
  valuePropperty,
  contentProperty,
  onItemSelect,
  currrentProf,
}) => {
  return (
    <ul className="list-group">
      {Object.keys(items).map((item) => {
        return (
          <li
            className={
              "list-group-item" +
              (currrentProf === items[item] ? " active" : "")
            }
            role="button"
            key={items[item][valuePropperty]}
            onClick={() => onItemSelect(items[item])}
          >
            {items[item][contentProperty]}
          </li>
        );
      })}
    </ul>
  );
};
GroupList.propTypes = {
  // items: PropTypes.object.isRequired,
  valuePropperty: PropTypes.string.isRequired,
  contentProperty: PropTypes.string.isRequired,
  onItemSelect: PropTypes.func.isRequired,
};
GroupList.defaultProps = {
  valuePropperty: "_id",
  contentProperty: "name",
};
export default GroupList;
