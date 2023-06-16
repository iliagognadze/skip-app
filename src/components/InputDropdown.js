import { useState, useEffect, useRef } from "react";
import CheckBoxChoice from "./CheckBoxChoice";

const InputDropdown = ({
  label,
  inputDropdownId,
  choosenData,
  onChooseData,
  apiUrl,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  let [choices, setChoices] = useState([]);

  let [dropdownToggleEvent, setDropdownToggleEvent] = useState("mouseup");

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
        console.log("it is happening form effect");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  useEffect(() => {
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => setChoices(data));
  }, [apiUrl]);

  const handleCheckBoxChange = (event, choiceData) => {
    const choice = event.target.value;
    if (event.target.checked) {
      onChooseData([...choosenData, choiceData]);
    } else {
      onChooseData(choosenData.filter((c) => c !== choiceData));
    }
  };

  function handleClick() {
    console.log("ZDZD0");
    setIsDropdownOpen(true);
    console.log("it is happening", isDropdownOpen);
  }

  return (
    <div className="relative">
      <div
        className={`outline-0 flex items-center justify-between border-2 border-ownbrown ${
          isDropdownOpen ? "rounded-t" : "rounded"
        }  rounded-t px-2 py-1 cursor-pointer`}
        onClick={handleClick}
      >
        <p className="font-mtavruli">{label}</p>
        <img src="./arrow-down-black.png" />
      </div>

      <div
        ref={dropdownRef}
        className={`relative ${
          isDropdownOpen ? "h-32 border-2 border-ownbrown px-2 py-1" : "h-0"
        } transition-height bg-white rounded-b w-full z-10 overflow-y-auto max-h-40`}
      >
        {choices.map((choice, i) => (
          <CheckBoxChoice
            title={choice.name}
            choiceData={choice}
            key={i}
            checkBoxId={`${inputDropdownId}-${i}`}
            choosenData={choosenData}
            onChange={handleCheckBoxChange}
          />
        ))}
      </div>
    </div>
  );
};

export default InputDropdown;
