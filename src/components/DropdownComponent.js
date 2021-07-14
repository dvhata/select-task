import React from "react";

const DropdownComponent = (props) => {
  const { isMulti, data, onSelect} = props;
  const [singleChoice,setSingleChoice] = React.useState();

  const handleSingleChoice = React.useCallback((e) => {
    setSingleChoice((data[e.target.value-1]));
  })
  
  
  return !isMulti ? (
    <div>
      <div
        className="custom-select"
      >
        {data.map((options) => {
          return (
            <>
              <input
              type="radio"
              value={options.id}
              onClick={handleSingleChoice}
              onChange={onSelect}
              checked={options.id === singleChoice?.id}
              />
              {options.name}
            </> 
          )
        })}
      </div>
    </div>
  ) : (
    <div>
      <div
        className="custom-select"
      >
        {data.map((options) => {
          return (
            <>
              <input
              type="checkbox"
              value={options.id}
              onClick={onSelect}
              />
              {options.name}
            </>
          )
        })}
      </div>
    </div>
  );
};

export default DropdownComponent;
