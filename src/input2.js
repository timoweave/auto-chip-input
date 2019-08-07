import React from "react";
import PropTypes from "prop-types";
import Select from "react-select";

const AutoChipInput2 = props => {
  const { placeholder, isMulti } = props;
  const { search, setSearch, suggestedList, selectedList } = props;
  const { setSelectedList, onSelectedList } = props;

  const onChange = value => {
    setSelectedList(value);
    onSelectedList(value);
  };

  return (
    <Select
      inputId="react-select-multiple"
      placeholder={placeholder}
      value={selectedList}
      onChange={onChange}
      inputValue={search}
      onInputChange={setSearch}
      options={suggestedList}
      isMulti={isMulti}
      disabled={true}
    />
  );
};

AutoChipInput2.propTypes = {
  title: PropTypes.string,
  placeholder: PropTypes.string,
  isMulti: PropTypes.bool,
  search: PropTypes.string,
  suggestedList: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string
    })
  ),
  selectedList: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string
    })
  ),
  setSelectedList: PropTypes.func,
  setSearch: PropTypes.func,
  isLoading: PropTypes.bool,
  onSelectedList: PropTypes.func,
  disabled: PropTypes.bool
};

AutoChipInput2.defaultProps = {
  title: "Search Options",
  placeholder: "Enter option",
  isMulti: false,
  isLoading: false,
  disabled: true,
  onSelectedList: value => {
    console.warn({
      message: "provide your own callback",
      value
    });
  }
};

export default AutoChipInput2;
