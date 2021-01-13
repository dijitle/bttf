import React from "react";
import "./InputPad.css";

function InputPad(props) {
  let btnStyle = {
    width: props.width / 8,
    height: props.width / 8,
    fontSize: props.width / 15,
    borderWidth: props.width / 75,
    margin: props.width / 42,
  };

  return (
    <div
      style={{
        background: "#777777",
        width: props.width,
        height: props.width,
        display: "flex",
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "space-around",
      }}
    >
      <div
        style={{
          width: props.width / 6,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <button style={{ ...btnStyle, background: "red" }}>O</button>
        <button style={{ ...btnStyle, background: "yellow" }}>O</button>
        <button style={{ ...btnStyle, background: "green" }}>O</button>
        <button style={btnStyle}>O</button>
        <button style={btnStyle}>O</button>
      </div>
      <div
        style={{
          background: "white",
          width: (props.width * 2) / 3,
          height: (props.width * 3) / 4,
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
        }}
      >
        <button style={btnStyle}>1</button>
        <button style={btnStyle}>2</button>
        <button style={btnStyle}>3</button>
        <button style={btnStyle}>4</button>
        <button style={btnStyle}>5</button>
        <button style={btnStyle}>6</button>
        <button style={btnStyle}>7</button>
        <button style={btnStyle}>8</button>
        <button style={btnStyle}>9</button>
        <button style={btnStyle}>0</button>
      </div>
    </div>
  );
}

export default InputPad;
