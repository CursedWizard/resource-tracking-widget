import React, { CSSProperties, useEffect, useState } from "react";

interface Props {
  style?: CSSProperties;
}

const AddIcon: React.FC<Props> = (props) => {
  const styles: CSSProperties = {
    ...props.style,
    transition: "ease-in-out",
    transitionDuration: "200ms",
    transitionProperty: "all",
  };

  return (
    <>
      <svg
        style={styles}
        xmlns="http://www.w3.org/2000/svg"
        width="8"
        height="8"
        viewBox="0 0 20 20"
      >
        <path d="M19 9h-8V1H9v8H1v2h8v8h2v-8h8V9z" />
      </svg>
    </>
  );
};

export default AddIcon;
