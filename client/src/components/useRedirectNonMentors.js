import { useEffect } from "react";
import { useHistory } from "react-router-dom";

export function useRedirectNonMentors(callBack = () => {}) {
  let history = useHistory();

  useEffect(() => {
    fetch(`/api/verify`)
      .then((res) => {
        if (res.status !== 200) {
          history.push("/");
        }
        return res.json();
      })
      .then((data) => {
        if (data == "not authorized" || data.role == "Student") {
          history.push("/");
        } else {
          callBack();
        }
      })
      .catch((error) => console.log(error));
  }, []);

  return null;
}
