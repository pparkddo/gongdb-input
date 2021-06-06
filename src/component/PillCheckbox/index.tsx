import React, { useState } from 'react';
import { Form } from "react-bootstrap";
import "./pill-checkbox.css";

interface PillCheckboxProps {
  name: string;
  label: string;
  onToggle: (checked: boolean) => void;
}

const accentColor = "#14a4be";
const secondaryColor = "#ffffff";

const PillCheckbox = (props: PillCheckboxProps) => {
  const [isChecked, setChecked] = useState<boolean>(false);
  const [isFocused, setFocused] = useState<boolean>(false);
  
  const toggle = () => {
    const toggled = !isChecked;
    setChecked(toggled);
    props.onToggle(toggled);
  };

  return (
    <label 
      className="pill-checkbox" 
      style={{
        backgroundColor: isChecked ? accentColor : secondaryColor,
        borderColor: isFocused ? accentColor : "#e0e0e0"
      }}
    >
      <Form.Check 
        name={props.name}
        type="checkbox" 
        className="position-absolute" 
        value={props.label}
        checked={isChecked}
        onChange={toggle}
        onBlur={() => setFocused(false)}
        onFocus={() => setFocused(true)}
        onKeyPress={(event: React.KeyboardEvent<HTMLInputElement>) => {
          if (event.key === "Enter") {
            toggle();
          }
        }}
      />
      <span className={`pill-label ${isChecked ? "checked" : ""} ${isFocused ? "focused" : ""}`}>{props.label}</span>
    </label>
  );
};

export default PillCheckbox;