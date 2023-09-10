import { useState } from "react";

const Checkbox = ({ label, isChecked, onCheckboxClick, ...props }) => {
  //const defaultChecked = checked ? checked : false;
  //const [isChecked, setIsChecked] = useState(defaultChecked);

  return (
    <div className="checkbox-wrapper">
      <label>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={() => onCheckboxClick()}
          className={isChecked ? "checked" : "unchecked"}
          {...props}
        />
        <span>{label}</span>
      </label>
    </div>
  );
};

export default Checkbox;
