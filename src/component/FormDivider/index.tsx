import React from 'react';

interface Props {
  title: string
}

const FormDivider = (props: Props) => {
  return (
    <p style={{fontSize: 24, borderBottom: "solid 1px #e5e5e5"}}>
      {props.title}
    </p>
  );
};

export default FormDivider;