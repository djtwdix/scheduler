import React from "react";

export default function Empty(props) {
  const { onAdd } = props;

  const handleClick = () => {
    onAdd();
  };

  return (
    <main className="appointment__add">
      <img
        onClick={handleClick}
        className="appointment__add-button"
        src="images/add.png"
        alt="Add"
      />
    </main>
  );
}
