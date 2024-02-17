/* eslint-disable no-unused-vars */
import React, { useState } from "react";
//import DotLoader from "react-spinners/DotLoader";
import BeatLoader from "react-spinners/BeatLoader";
//mport PacmanLoader from "react-spinners/PacmanLoader";
//import PropagateLoader from "react-spinners/PropagateLoader"
import "../App.css";

// eslint-disable-next-line react/display-name
const Question = React.forwardRef((props, ref) => {
  const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };
  //#36d7b7
  let color = "#4fbeda";
  const [question, setquestion] = useState({});

  const [value, setvalue] = useState("2x+5y=3,6x+8y=9");
  const [loading, setloading] = useState(false);
  const [response, setresponse] = useState(false);
  const handlechange = (e) => {
    setquestion({...question,[e.target.id]: e.target.value});
    console.log(question);
  };

  const handleclick = async () => {
    setloading(true);
    console.log("didn't it called?");
    const res = await fetch("http://127.0.0.1:5000/math", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(question),
    });
    const data = await res.json();
    

    console.log(data);
    setTimeout(() => {
      if (data.success === true) {
        setloading(false);
        console.log("entered in this state");
        setresponse(true);
        setvalue(data.data);
      }
    }, 3000);
  };
  return (
    <>
      
    
    </>
  );
});

export default Question;
