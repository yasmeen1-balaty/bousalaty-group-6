import { GPACalculator } from "./gpacalculator";
import { SavedMajors } from "./savedmajors";
import { StudyTip } from "./tips";
import { useState, useEffect } from "react";

export function Dashboard() {
  const [myMajors, setMyMajors] = useState([]);

  const savedUser = JSON.parse(localStorage.getItem("user"));
  const studentID = savedUser?.studentID || savedUser?.id || savedUser?.userID;

  const handleRemoveMajor = async (majorID) => {
    try {
      const response = await fetch(
        `http://localhost:3001/students/${studentID}/remove-saved-major`,
        {
          method: "DELETE",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            majorID: majorID,
            studentID: studentID,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("فشل حذف التخصص");
      }

      // تحديث الواجهة مباشرة
      setMyMajors((prevMajors) =>
        prevMajors.filter(
          (major) => major.majorID !== majorID
        )
      );


      const data = await response.json();

      console.log(data);


    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetch(`http://localhost:3001/students/${studentID}/saved-majors`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched saved majors:", data);
        setMyMajors(data.savedMajors);
      }) // data is an object, we are expecting an array, data.data is the array of majors
      .catch((err) => console.error("Error fetching saved majors:", err));
  }, []);

  return <>
    <div className="container">
      <div className="row">
        <div className=" col-12 col-lg-8 mt-4">
          <SavedMajors majors={myMajors} onRemove={handleRemoveMajor} />
          <StudyTip />
        </div>

        <div className="col-12 col-lg-4">
          <GPACalculator />
        </div>
      </div>
    </div>
  </>
}