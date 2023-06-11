import React from "react";
import {generalFactoring, mirrors, forceSimplify, group2x2, formatEx, randomInRange} from "./generator";
import './Button.css';

const Handler = (props) => {
  const handleClick = () => {
    var text;
    switch(props.type) {
      case "3x1":
        text = mirrors(3, true)
        break;
      case "2x2":
        text = group2x2()
        break;
      case "dos":
        text = mirrors(2, true)
        break;
      default:
        text = generalFactoring(2, true)
    }
    props.solution(formatEx(text))
    props.problem(forceSimplify(text, 3))
  }

  return (
    <button id="generation" onClick={handleClick} className="button">Generate</button>
  )
}

export default Handler;