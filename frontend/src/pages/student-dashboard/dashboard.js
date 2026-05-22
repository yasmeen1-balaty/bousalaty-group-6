import { GPACalculator } from "./gpacalculator";
import { SavedMajors } from "./savedmajors";
import { StudyTip } from "./tips";
import { useState, useEffect } from "react";

const API_URL = "https://bousalaty-group-6-ixn3.onrender.com";

export function Dashboard() {
  const [myMajors, setMyMajors] = useState([]);

  const savedUser = JSON.parse(localStorage.getItem("user"));
  const studentID = savedUser?.studentID || savedUser?.id || savedUser?.userID;

  const handleRemoveMajor = async (majorID) => {
    try {
      const response = await fetch(
        `${API_URL}/students/${studentID}/remove-saved-major`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            majorID,
            studentID,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("فشل حذف التخصص");
      }

      setMyMajors((prevMajors) =>
        prevMajors.filter((major) => major.majorID !== majorID)
      );

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!studentID) return;

    fetch(`${API_URL}/students/${studentID}/saved-majors`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched saved majors:", data);
        setMyMajors(data.savedMajors || []);
      })
      .catch((err) => console.error("Error fetching saved majors:", err));
  }, [studentID]);

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 col-lg-8 mt-4">
          <SavedMajors majors={myMajors} onRemove={handleRemoveMajor} />
          <StudyTip />
        </div>

        <div className="col-12 col-lg-4">
          <GPACalculator />
        </div>
      </div>
    </div>
  );
}