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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
        console.log("it is happening form effect");
      }
    };

  }, [dropdownRef]);

  useEffect(() => {
    console.log(apiUrl);

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => setChoices(data));
  }, [apiUrl]);

  const handleCheckBoxChange = (event, choiceData) => {
    if (event.target.checked) {
      onChooseData([...choosenData, choiceData]);
    } else {
      onChooseData(choosenData.filter((c) => c !== choiceData));
    }
  };

  function handleClick() {
    console.log("ZDZD0");
    setIsDropdownOpen(!isDropdownOpen)
    console.log("it is happening", isDropdownOpen);
  }

  return (
    <div className="relative">
      <div
        className={`outline-0 flex items-center justify-between border-2 border-ownblack ${
          isDropdownOpen ? "rounded-t-lg" : "rounded-lg"
        } px-2 py-1 cursor-pointer`}
        onClick={handleClick}
      >
        <p className="font-mtavruli">{label}</p>
        <img className={`${isDropdownOpen ? '-rotate-180' : ''} transition-all`} src="./arrow-down-black.png" />
      </div>

      <div
        ref={dropdownRef}
        className={`relative ${
          isDropdownOpen ? "h-32 border-2 border-ownblack border-lg px-2 py-1" : "h-0"
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
