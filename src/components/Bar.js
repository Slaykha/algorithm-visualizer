import React from "react";
import "../assets/style/bar.css"

export const Bar = (props) => {
  const {
    bar
  } = props;

  return (
    <div className="bar">
      <div className={`singleBar ${bar.status}`} style={{height: bar.value * 10}}></div>
      <p className="barText">{bar.value}</p>
    </div>
  )
}
