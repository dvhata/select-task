import React from "react";
import "./DropdownComponent.css";

const DropdownComponent = (props) => {
  const {isMulti, data} = props;
  const [singleChoice, setSingleChoice] = React.useState(data[0]);
  const [listSelect, setListSelect] = React.useState([]);

  const handleSingleChoice = React.useCallback((e) => {
    setSingleChoice(data[e.target.value - 1]);
  });

  const handleMultiSelectChange = React.useCallback(
    (e) => {
      e.target.style.textDecoration =
        e.target.style.textDecoration === "line-through" ? "" : "line-through";
      const index = listSelect.findIndex((item) => item.id == e.target.value);
      console.log("Hello2");
      if (index === -1) {
        setListSelect([...listSelect, data[e.target.value - 1]]);
      } else {
        setListSelect((list) => [
          ...list.filter((item) => item.id != e.target.value),
        ]);
      }
    },
    [listSelect]
  );

  return !isMulti ? (
    <div>
      <div className="box">
        <select value={singleChoice.id} onChange={handleSingleChoice}>
          {data.map((options) => {
            return (
              <option
                key={options.id}
                type="radio"
                value={options.id}
                onChange={handleSingleChoice}
              >
                {options.name}
              </option>
            );
          })}
        </select>
      </div>
      <div style={{fontWeight:"bold",color:"rgba(231, 54, 54, 0.808)"}}>Your selection: "{singleChoice.name}"</div>
    </div>
  ) : (
    <div>
      <div className="dropdown">
        <button className="dropbtn">
          <div>
            {listSelect.map((choices) => {
              return (
                <span key={choices.id} className="result-selection">
                  {choices?.name},
                </span>
              );
            })}
          </div>
        </button>
        <div className="dropdown-content">
          {data.map((options) => {
            return (
              <button
                key={options.id}
                value={options.id}
                onClick={handleMultiSelectChange}
              >
                {options.name}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DropdownComponent;
