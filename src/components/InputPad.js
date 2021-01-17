import React from "react";
import "./InputPad.css";

function InputPad(props) {
  let btnStyle = {
    width: props.width / 7,
    height: props.width / 7,
    fontSize: props.width / 16,
    borderWidth: props.width / 64,
    margin: props.width / 64,
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
        <button
          style={{
            ...btnStyle,
            background: "red",
            boxShadow: "0px 0px 15px 10px red",
            borderRadius: "100%",
          }}
          onClick={() => props.input(null)}
        ></button>
        <button
          style={{
            ...btnStyle,
            background: "yellow",
            boxShadow: "0px 0px 15px 10px yellow",
            borderRadius: "100%",
          }}
          onClick={() => props.input("clear")}
        ></button>
        <button
          style={{
            ...btnStyle,
            background: "green",
            boxShadow: "0px 0px 15px 10px green",
            borderRadius: "100%",
          }}
          onClick={() => props.input("input")}
        ></button>
        <button
          style={{
            ...btnStyle,
            background: "white",
            boxShadow: "0px 0px 15px 10px white",
            borderRadius: "100%",
          }}
        ></button>
        <button
          style={{
            ...btnStyle,
            background: "white",
            boxShadow: "0px 0px 15px 10px white",
            borderRadius: "100%",
          }}
          onClick={() => props.input("enter")}
        ></button>
      </div>
      <div
        style={{
          background: "white",
          width: (props.width * 2) / 3,
          height: (props.width * 3) / 4,
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
          boxShadow: "inset 0px 0px 10px 5px #000000",
        }}
      >
        <button style={btnStyle} onClick={() => props.input(1)}>
          1
        </button>
        <button style={btnStyle} onClick={() => props.input(2)}>
          2
        </button>
        <button style={btnStyle} onClick={() => props.input(3)}>
          3
        </button>
        <button style={btnStyle} onClick={() => props.input(4)}>
          4
        </button>
        <button style={btnStyle} onClick={() => props.input(5)}>
          5
        </button>
        <button style={btnStyle} onClick={() => props.input(6)}>
          6
        </button>
        <button style={btnStyle} onClick={() => props.input(7)}>
          7
        </button>
        <button style={btnStyle} onClick={() => props.input(8)}>
          8
        </button>
        <button style={btnStyle} onClick={() => props.input(9)}>
          9
        </button>
        <button style={btnStyle} onClick={() => props.input(0)}>
          0
        </button>
      </div>
    </div>
  );
}

export default InputPad;
