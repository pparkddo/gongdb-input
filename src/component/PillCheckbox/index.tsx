import React, { useState } from 'react';
import { Form } from "react-bootstrap";
import "./pill-checkbox.css";

interface Props {
  name: string
  label: string
}

const accentColor = "#14a4be";
const secondaryColor = "#ffffff";

const PillCheckbox = (props: Props) => {
  const [isChecked, setChecked] = useState<boolean>(false);
  const [isFocused, setFocused] = useState<boolean>(false);

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
        onChange={() => setChecked(!isChecked)}
        onBlur={() => setFocused(false)}
        onFocus={() => setFocused(true)}
        onKeyPress={(event: React.KeyboardEvent<HTMLInputElement>) => {
          if (event.key === "Enter") {
            setChecked(!isChecked);
          }
        }}
      />
      <span className={`pill-label ${isChecked ? "checked" : ""} ${isFocused ? "focused" : ""}`}>{props.label}</span>
    </label>
  );
};

export default PillCheckbox;