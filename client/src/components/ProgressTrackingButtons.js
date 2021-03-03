import React from "react";
import TrackBtn from "./TrackBtn";
import "./BtnContainer.css";
export default function ProgressTrackingButtons({
  ability,
  updateAbility,
  deselect,
  student_id,
  learningObjId,
}) {
  console.log(ability);
  //   function handler() {
  // if ()
  //   }
  return (
    <div className="btn-container">
      <TrackBtn
        classNameBtn={ability === 0 ? "btn-red" : "btn-white"}
        onClick={() =>
          ability == null
            ? updateAbility(0)
            : ability == 0
            ? deselect(student_id, null, learningObjId)
            : updateAbility(0)
        }
        btnText={"Not Confident"}
      />
      <TrackBtn
        classNameBtn={ability === 1 ? "btn-yellow" : "btn-white"}
        onClick={() =>
          ability == null
            ? updateAbility(1)
            : ability == 1
            ? deselect(student_id, null, learningObjId)
            : updateAbility(1)
        }
        btnText={"Still learning"}
      />

      <TrackBtn
        classNameBtn={ability === 2 ? "btn-green" : "btn-white"}
        onClick={() =>
          ability == null
            ? updateAbility(2)
            : ability == 2
            ? deselect(student_id, null, learningObjId)
            : updateAbility(2)
        }
        btnText={"Confident"}
      />
    </div>
  );
}
