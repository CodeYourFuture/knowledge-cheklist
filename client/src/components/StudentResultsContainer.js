import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import StudentResultsDisplay from "./StudentResultsDisplay";

function StudentResultsContainer({ studentId, studentName }) {
  const [studentDetail, setStudentDetail] = useState([]);

  const fetchDetails = (skill) => {
    fetch(`/api/abilities/${studentId}`, {})
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          throw data;
        }

        setStudentDetail(data);
      });
  };

  useEffect(fetchDetails, [studentId]);
  const abilityLength = [];

  return (
    <Container className="learning-objective-container">
      <h2>{studentName}</h2>

      <StudentResultsDisplay studentDetail={studentDetail} />
    </Container>
  );
}
export default StudentResultsContainer;
