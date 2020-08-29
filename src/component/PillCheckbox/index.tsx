import React, { useState } from 'react';
import { Form } from "react-bootstrap";
import "./pill-checkbox.css";

interface Props {
  id: string
  label: string
}

const PillCheckbox = (props: Props) => {
  const [isChecked, setChecked] = useState<boolean>(false);

  return (
    <label 
      className="pill-checkbox" 
      style={{backgroundColor: isChecked ? "#14a4be" : "#ffffff"}}
    >
      <Form.Check 
        id={props.id}
        type="checkbox" 
        className="invisible position-absolute" 
        value={props.label}
        checked={isChecked}
        onChange={() => setChecked(!isChecked)}
      />
      <span className={`pill-label ${isChecked ? "checked" : ""}`}>{props.label}</span>
    </label>
  );
};

export default PillCheckbox;