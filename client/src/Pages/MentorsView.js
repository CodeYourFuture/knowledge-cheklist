import React, { useState, useEffect } from "react";
import StudentResultsContainer from "../components/StudentResultsContainer";
import { Link, useHistory } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import useQuery from "../components/useQuery";

function MentorsView() {
  const [studentList, setStudentList] = useState([]);
  const [bg, setBg] = useState("");

  let history = useHistory();
  const [mentorName, setMentorName] = useState(null);

  useEffect(() => {
    fetch(`/api/verify`)
      .then((res) => {
        if (res.status !== 200) {
          history.push("/");
        }
        return res.json();
      })
      .then((data) => {
        setMentorName(data.name);
        if (data == "not authorized" || data.role == "Student") {
          history.push("/");
        }
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    fetch(`/api/students`)
      .then((res) => res.json())
      .then((data) => {
        setStudentList(data);
      });
  }, []);

  let studentName = "";
  const studentId = useQuery("studentId");
  if (studentId && studentList) {
    const student = studentList.filter(
      (student) => student.user_id == studentId
    )[0];

    if (student) {
      studentName = `${student.first_name} ${student.last_name}`;
    }
  }
  const editLearningObjectives = (
    <a className="student-progress" href="/MentorsEditLearningObj">
      Edit Learning Objectives
    </a>
  );

  return (
    <div className="mentorsview-page">
      <Header editLearningObjectives={editLearningObjectives} />
      <h1 className="welcome-msg">Welcome {mentorName}😊</h1>
      <div className="main-container-mentorView">
        <div className="studentName-Container">
          <h2 className="mentor-greet">Students List:</h2>
          <ul className="student-list">
            {studentList.map(({ user_id, first_name, last_name }) => {
              console.log(user_id);
              return (
                <li key={user_id} className="students-name">
                  <Link
                    onClick={() => setBg({ activeIndex: user_id })}
                    to={`./MentorsView?studentId=${user_id}`}
                    className="name-list"
                  >
                    <div
                      className={`${
                        user_id == bg.activeIndex ? "active" : "inactive"
                      }`}
                    >{`${first_name} ${last_name}`}</div>

                    <i class="fas fa-arrow-right"></i>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
        {studentId && (
          <div className="box-display-component">
            <StudentResultsContainer
              studentId={studentId}
              studentName={studentName}
            />
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default MentorsView;
