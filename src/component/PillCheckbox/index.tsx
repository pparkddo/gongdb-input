import React, { useState } from 'react';
import { Form } from "react-bootstrap";
import "./pill-checkbox.css";

interface Props {
  id: string
  label: string
}

const getBackgroundColor = (isChecked: boolean, isFocused: boolean): string => {
  if (isFocused) {
    return "#158b9f";
  }
  if (isChecked) {
    return "#14a4be";
  }
  return "#ffffff";
}

const PillCheckbox = (props: Props) => {
  const [isChecked, setChecked] = useState<boolean>(false);
  const [isFocused, setFocused] = useState<boolean>(false);

  return (
    <label 
      className="pill-checkbox" 
      style={{backgroundColor: getBackgroundColor(isChecked, isFocused)}}
    >
      <Form.Check 
        id={props.id}
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