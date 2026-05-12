import { GPACalculator } from "./gpacalculator";
import { SavedMajors } from "./savedmajors";
import { StudyTip } from "./tips";
import { useState, useEffect } from "react";

export function Dashboard() {
  const [myMajors, setMyMajors] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/students/1/saved-majors")
      .then((res) => res.json())
      .then((data) => { 
        console.log("Fetched saved majors:", data);
        setMyMajors(data.savedMajors);}) // data is an object, we are expecting an array, data.data is the array of majors
      .catch((err) => console.error("Error fetching saved majors:", err));
  }, []);

  return <>
    <div className="container">
      <div className="row">
        <div className=" col-12 col-lg-8 mt-4">        
          <SavedMajors majors={myMajors} />
          <StudyTip />
        </div>

        <div className="col-12 col-lg-4">
        <GPACalculator />
        </div>
      </div>
    </div>
  </>
}