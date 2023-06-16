const CheckBoxChoice = ({ title, choiceData, checkBoxId, onChange }) => {
  const handleCheckboxChange = (e) => {
    onChange(e, choiceData);
  };

  return (
    <label
      for={`checkbox-${checkBoxId}`}
      className="flex gap-2 group cursor-pointer"
    >
      <input
        id={`checkbox-${checkBoxId}`}
        type={"checkbox"}
        onChange={(e) => handleCheckboxChange(e)}
        value={title}
        className="w-4 mb-1"
      ></input>
      <p>{title}</p>
    </label>
  );
};

export default CheckBoxChoice;
