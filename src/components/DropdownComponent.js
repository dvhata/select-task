import React from "react";
import "./DropdownComponent.css";

const DropdownComponent = (props) => {
  const { isMulti, data, onSelect } = props;
  /* const [option, setOption] = React.useState({}); */

  const [singleChoice, setSingleChoice] = React.useState(data[0]);
  const [listSelect, setListSelect] = React.useState([]);

  const handleSingleChoice = React.useCallback((e) => {
    setSingleChoice(data[e.target.value - 1]);
  });

  const handleMultiSelectChange = React.useCallback(
    (e) => {
      console.log(e.target.value);
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
                onChange={onSelect}
              >
                {options.name}
              </option>
            );
          })}
        </select>
      </div>
      <div className="result-selection">
        Your selection: "{singleChoice.name}"
      </div>
    </div>
  ) : (
    <div>
      <div className="dropdown">
        <button className="dropbtn"></button>
        <div className="dropdown-content" /* onChange={} */>
          {data.map((options) => {
            return (
              <div
                key={options.id}
                value={options.id}
                onSelect={handleMultiSelectChange}
              >
                {options.name}
              </div>
            );
          })}
        </div>
      </div>
      Ket qua:
      <div>
        {listSelect.map((choices) => {
          return (
            <span key={choices.id} className="result-selection">
              "{choices?.name}",
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default DropdownComponent;
