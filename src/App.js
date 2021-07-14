import "./App.css";
import DropdownComponent from "./components/DropdownComponent.js";
import React from "react";
import {Button} from "react-bootstrap"

const list_options = [
  {
    id: 1,
    name: "One",
  },
  {
    id: 2,
    name: "Two",
  },
  {
    id: 3,
    name: "Three",
  },
  {
    id: 4,
    name: "Four",
  },
  {
    id: 5,
    name: "Five",
  },
];

function App() {
  const [mode, setMode] = React.useState();
  const [option, setOption] = React.useState({});
  const [listSelect, setListSelect] = React.useState([]);

  const handleSingleSelectChange = React.useCallback((e) => {
    setOption(list_options[e.target.value-1]);
  }, []);

  const handleMultiSelectChange = React.useCallback(
    (e) => {
      const index = listSelect.findIndex((item) => item?.id == e.target.value);

      if (index === -1) {
        setListSelect([...listSelect, list_options[e.target.value - 1]]);
      } else {
        setListSelect((list) => [
          ...list.filter((item) => item.id != e.target.value),
        ]);
      }
    },
    [listSelect]
  );

  const handleClick = React.useCallback((e) => {
    (e.target.value === "single")? setMode(false) : setMode(true);
  },[])

  return (
    <div className="App">
      <div>
        Select mode:
        <div onClick={handleClick}>
          <Button primary value="single">Single Mode</Button>
          <Button warning value="multi">Multiple mode</Button>
        </div>
      </div>
      {mode ? (
        <div>
          <span>You are in multiple mode</span>
          <DropdownComponent
            isMulti={mode}
            data={list_options}
            onSelect={handleMultiSelectChange}
          />
          <div>
            Result:
            {listSelect.map((choices) => {
              return <div key={choices.id}>{choices?.name}</div>;
            })}
          </div>
        </div>
      ) : (
        <div>
          <span>You are in single mode</span>
          <DropdownComponent
            isMulti={mode}
            data={list_options}
            onSelect={handleSingleSelectChange}
          />
          Result: {option.name}
        </div>
      )}
    </div>
  );
}

export default App;
