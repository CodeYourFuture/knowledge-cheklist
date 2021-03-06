import React from "react";
import TrackBtn from "./TrackBtn";
import "./BtnContainer.css";
export default function ProgressTrackingButtons({
  ability,
  updateAbility,
}) {
 
 
  return (
    <div className="btn-container">
      <TrackBtn
        classNameBtn={ability === 0 ? "btn-red" : "btn-white"}
        onClick={() => (ability === 0 ? updateAbility(null) : updateAbility(0))}
        btnText={"Not Confident"}
      />
      <TrackBtn
        classNameBtn={ability === 1 ? "btn-yellow" : "btn-white"}
        onClick={() => (ability === 1 ? updateAbility(null) : updateAbility(1))}
        btnText={"Still learning"}
      />

      <TrackBtn
        classNameBtn={ability === 2 ? "btn-green" : "btn-white"}
        onClick={() => (ability === 2 ? updateAbility(null) : updateAbility(2))}
        btnText={"Confident"}
      />
    </div>
  );
}
