import React, { useEffect, useState } from "react";
import ProgressTrackingButtons from "../components/ProgressTrackingButtons";

export default function Html({ skill }) {
  const [learningObjectives, setLearningObjectives] = useState([]);
  const fetchLearningObj = () => {
    fetch(`/api/learningobjectives/${skill}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          throw data;
        }
        setLearningObjectives(data);
      });
  };
  useEffect(fetchLearningObj, [skill]);
  // call fetch here
  function updateAchievement(newAbility, id) {
    fetch(`/api/abilities`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ability: newAbility,
        learning_obj_id: id,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          throw new Error(data.error);
        }
      })
      .then(fetchLearningObj);
    setLearningObjectives(
      learningObjectives.map((obj) => {
        if (obj.id === id) {
          return { ...obj, ability: newAbility };
        }
        return obj;
      })
    );
  }

  return (
    <div className="learning-objective-container">
      <ul>
        {learningObjectives.map(
          ({ description, id, ability, student_id }, index) => {
            function updateAbility(newAbility) {
              updateAchievement(newAbility, id);
            }

            return (
              <li key={index}>
                {description}

                <ProgressTrackingButtons
                  ability={ability}
                  updateAbility={updateAbility}
                  learningObjId={id}
                  student_id={student_id}
                />
              </li>
            );
          }
        )}
      </ul>
    </div>
  );
}
