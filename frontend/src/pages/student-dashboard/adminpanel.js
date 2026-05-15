import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

import AdminCards from "./admin/AdminCards";

import SkillForms from "./admin/skills/SkillForms";
import OpportunityForms from "./admin/opportunities/OpportunityForms";
import OptionForms from "./admin/options/OptionForms";
import QuestionForms from "./admin/questions/QuestionForms";
import ExpertForms from "./admin/experts/ExpertForms";
import MajorForms from "./admin/majors/MajorForms";
import FacultyForms from "./admin/faculties/FacultyForms";

export default function AdminPanel() {

  const [faculties, setFaculties] = useState([]);
  const [majors, setMajors] = useState([]);
  const [experts, setExperts] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [options, setOptions] = useState([]);
  const [skills, setSkills] = useState([]);
  const [opportunities, setOpportunities] = useState([]);

  const fetchFaculties = async () => {
    try {
      const res = await fetch("http://localhost:3001/faculties");
      const data = await res.json();
      setFaculties(data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchMajors = async () => {
    try {
      const res = await fetch("http://localhost:3001/majors");
      const data = await res.json();
      setMajors(data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchExperts = async () => {
    try {
      const res = await fetch("http://localhost:3001/experts");
      const data = await res.json();
      setExperts(data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchQuestions = async () => {
  try {
    const res = await fetch("http://localhost:3001/questions");
    const data = await res.json();
    setQuestions(data);
  } catch (err) {
    console.log(err);
  }
};
const fetchOptions = async () => {
  try {
    const res = await fetch("http://localhost:3001/options");
    const data = await res.json();

    console.log("Options from backend:", data);

    if (Array.isArray(data)) {
      setOptions(data);
    } else if (Array.isArray(data.options)) {
      setOptions(data.options);
    } else {
      setOptions([]);
    }
  } catch (err) {
    console.log(err);
  }
};


const fetchSkills = async () => {
  try {
    const res = await fetch("http://localhost:3001/skills");
    const data = await res.json();

    console.log("Skills from backend:", data);

    if (Array.isArray(data)) {
      setSkills(data);
    } else {
      setSkills([]);
    }
  } catch (err) {
    console.log(err);
  }
};

const fetchOpportunities = async () => {
  try {
    const res = await fetch("http://localhost:3001/opportunities");
    const data = await res.json();

    console.log("Opportunities from backend:", data);

    if (Array.isArray(data)) {
      setOpportunities(data);
    } else {
      setOpportunities([]);
    }
  } catch (err) {
    console.log(err);
  }
};



useEffect(() => {
  fetchFaculties();
  fetchMajors();
  fetchExperts();
  fetchQuestions();
  fetchOptions();
  fetchSkills();
  fetchOpportunities();
}, []);




  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const isAdmin = user?.role === "admin";

  const [activeForm, setActiveForm] = useState("");

  // Faculty states
  const [facultyID, setFacultyID] = useState("");
  const [facultyName, setFacultyName] = useState("");

  // Major states
  const [majorID, setMajorID] = useState("");
  const [majorName, setMajorName] = useState("");
  const [majorFacultyID, setMajorFacultyID] = useState("");
  const [acceptanceGrade, setAcceptanceGrade] = useState("");
  const [creditHours, setCreditHours] = useState("");
  const [costPerHour, setCostPerHour] = useState("");
  const [studyPlanURL, setStudyPlanURL] = useState("");

  // Expert states
  const [expertID, setExpertID] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [expertEmail, setExpertEmail] = useState("");
  const [expertFacultyID, setExpertFacultyID] = useState("");


  // Question states
const [questionID, setQuestionID] = useState("");
const [questionText, setQuestionText] = useState("");


// Option states
const [optionID, setOptionID] = useState("");
const [optionText, setOptionText] = useState("");
const [optionQuestionID, setOptionQuestionID] = useState("");


// Skill states
const [skillID, setSkillID] = useState("");
const [skillMajorID, setSkillMajorID] = useState("");
const [skill, setSkill] = useState("");



// Opportunity states
const [oppoID, setOppoID] = useState("");
const [opportunityMajorID, setOpportunityMajorID] = useState("");
const [opportunity, setOpportunity] = useState("");


  useEffect(() => {
    if (!isAdmin) {
      alert("you are not an admin");
      navigate("/login");
    }
  }, [isAdmin, navigate]);

  if (!isAdmin) return null;

  const resetForms = () => {
    setFacultyID("");
    setFacultyName("");

    setMajorID("");
    setMajorName("");
    setMajorFacultyID("");
    setAcceptanceGrade("");
    setCreditHours("");
    setCostPerHour("");
    setStudyPlanURL("");

    setExpertID("");
    setFirstName("");
    setLastName("");
    setExpertEmail("");
    setExpertFacultyID("");


    setQuestionID("");
    setQuestionText(""); 


   setOptionID("");
  setOptionText("");
   setOptionQuestionID("");



setSkillID("");
setSkillMajorID("");
setSkill("");


setOppoID("");
setOpportunityMajorID("");
setOpportunity("");


  };

  // ================= FACULTY =================

  const addFaculty = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3001/faculties", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ facultyName })
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "حدث خطأ");
        return;
      }

      alert("تمت إضافة الكلية بنجاح");
      resetForms();
      setActiveForm("");
      fetchFaculties();
    } catch (error) {
      console.log(error);
      alert("Server error");
    }
  };

  const updateFaculty = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:3001/faculties/${facultyID}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ facultyName })
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "حدث خطأ");
        return;
      }

      alert("تم تعديل الكلية بنجاح");
      resetForms();
      setActiveForm("");
      fetchFaculties();
    } catch (error) {
      console.log(error);
      alert("Server error");
    }
  };

  const deleteFaculty = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:3001/faculties/${facultyID}`, {
        method: "DELETE"
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "حدث خطأ");
        return;
      }

      alert("تم حذف الكلية بنجاح");
      resetForms();
      setActiveForm("");
      fetchFaculties();
    } catch (error) {
      console.log(error);
      alert("Server error");
    }
  };

  // ================= MAJOR =================

  const addMajor = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3001/majors", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          majorName,
          facultyID: majorFacultyID,
          acceptanceGrade,
          creditHours,
          costPerHour,
          studyPlanURL
        })
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "حدث خطأ");
        return;
      }

      alert("تمت إضافة التخصص بنجاح");
      resetForms();
      setActiveForm("");
    } catch (error) {
      console.log(error);
      alert("Server error");
    }
  };

  const updateMajor = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:3001/majors/${majorID}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          majorName,
          facultyID: majorFacultyID,
          acceptanceGrade,
          creditHours,
          costPerHour,
          studyPlanURL
        })
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "حدث خطأ");
        return;
      }

      alert("تم تعديل التخصص بنجاح");
      resetForms();
      setActiveForm("");
    } catch (error) {
      console.log(error);
      alert("Server error");
    }
  };

  const deleteMajor = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:3001/majors/${majorID}`, {
        method: "DELETE"
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "حدث خطأ");
        return;
      }

      alert("تم حذف التخصص بنجاح");
      resetForms();
      setActiveForm("");
    } catch (error) {
      console.log(error);
      alert("Server error");
    }
  };

  // ================= EXPERT =================

  const addExpert = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3001/experts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email: expertEmail,
          facultyID: expertFacultyID
        })
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "حدث خطأ");
        return;
      }

      alert("تمت إضافة الخبير بنجاح");
      resetForms();
      setActiveForm("");
    } catch (error) {
      console.log(error);
      alert("Server error");
    }
  };

  // ================= QUESTIONS =================

const addQuestion = async (e) => {
  e.preventDefault();

  try {
    const res = await fetch("http://localhost:3001/questions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        questionText
      })
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "حدث خطأ");
      return;
    }

    alert("تمت إضافة السؤال بنجاح");
    resetForms();
    setActiveForm("");
    fetchQuestions();
  } catch (error) {
    console.log(error);
    alert("Server error");
  }
};

const updateQuestion = async (e) => {
  e.preventDefault();

  try {
    const res = await fetch(`http://localhost:3001/questions/${questionID}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        questionText
      })
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "حدث خطأ");
      return;
    }

    alert("تم تعديل السؤال بنجاح");
    resetForms();
    setActiveForm("");
    fetchQuestions();
  } catch (error) {
    console.log(error);
    alert("Server error");
  }
};

const deleteQuestion = async (e) => {
  e.preventDefault();

  try {
    const res = await fetch(`http://localhost:3001/questions/${questionID}`, {
      method: "DELETE"
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "حدث خطأ");
      return;
    }

    alert("تم حذف السؤال بنجاح");
    resetForms();
    setActiveForm("");
    fetchQuestions();
  } catch (error) {
    console.log(error);
    alert("Server error");


  }

};

  const updateExpert = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:3001/experts/${expertID}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email: expertEmail,
          facultyID: expertFacultyID
        })
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "حدث خطأ");
        return;
      }

      alert("تم تعديل الخبير بنجاح");
      resetForms();
      setActiveForm("");
    } catch (error) {
      console.log(error);
      alert("Server error");
    }
  };

  const deleteExpert = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:3001/experts/${expertID}`, {
        method: "DELETE"
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "حدث خطأ");
        return;
      }

      alert("تم حذف الخبير بنجاح");
      resetForms();
      setActiveForm("");
    } catch (error) {
      console.log(error);
      alert("Server error");
    }




  }
  // ================= OPTIONS =================

const addOption = async (e) => {
  e.preventDefault();

  if (!optionID || !optionQuestionID || !optionText) {
    alert("رقم الخيار ورقم السؤال ونص الخيار مطلوبة");
    return;
  }

  try {
    const res = await fetch("http://localhost:3001/options", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        optionID: optionID,
        questionID: optionQuestionID,
        optionText: optionText,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || data.error || "حدث خطأ");
      return;
    }

    alert("تمت إضافة الخيار بنجاح");
    resetForms();
    setActiveForm("");
    fetchOptions();
  } catch (error) {
    console.log(error);
    alert("Server error");
  }
};

const updateOption = async (e) => {
  e.preventDefault();

  try {
    const res = await fetch(`http://localhost:3001/options/${optionID}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        optionText,
        questionID: optionQuestionID
      })
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "حدث خطأ");
      return;
    }

    alert("تم تعديل الخيار بنجاح");
    resetForms();
    setActiveForm("");
    fetchOptions();
  } catch (error) {
    console.log(error);
    alert("Server error");
  }
};

const deleteOption = async (e) => {
  e.preventDefault();

  try {
    const res = await fetch(`http://localhost:3001/options/${optionID}`, {
      method: "DELETE"
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "حدث خطأ");
      return;
    }

    alert("تم حذف الخيار بنجاح");
    resetForms();
    setActiveForm("");
    fetchOptions();
  } catch (error) {
    console.log(error);
    alert("Server error");
  }
};




// ================= SKILLS =================

const addSkill = async (e) => {
  e.preventDefault();

  if (!skillMajorID || !skill) {
    alert("رقم التخصص والمهارة مطلوبين");
    return;
  }

  try {
    const res = await fetch("http://localhost:3001/skills", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        majorID: skillMajorID,
        skill: skill,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "حدث خطأ");
      return;
    }

    alert("تمت إضافة المهارة بنجاح");
    resetForms();
    fetchSkills();
  } catch (error) {
    console.log(error);
    alert("Server error");
  }
};

const updateSkill = async (e) => {
  e.preventDefault();

  if (!skillID || !skillMajorID || !skill) {
    alert("رقم المهارة ورقم التخصص والمهارة مطلوبين");
    return;
  }

  try {
    const res = await fetch(`http://localhost:3001/skills/${skillID}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        majorID: skillMajorID,
        skill: skill,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "حدث خطأ");
      return;
    }

    alert("تم تعديل المهارة بنجاح");
    resetForms();
    fetchSkills();
  } catch (error) {
    console.log(error);
    alert("Server error");
  }
};

const deleteSkill = async (e) => {
  e.preventDefault();

  if (!skillID || !skillMajorID) {
    alert("رقم المهارة ورقم التخصص مطلوبين");
    return;
  }

  try {
    const res = await fetch(`http://localhost:3001/skills/${skillID}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        majorID: skillMajorID,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "حدث خطأ");
      return;
    }

    alert("تم حذف المهارة بنجاح");
    resetForms();
    fetchSkills();
  } catch (error) {
    console.log(error);
    alert("Server error");
  }
};


// ================= OPPORTUNITIES =================

const addOpportunity = async (e) => {
  e.preventDefault();

  if (!opportunityMajorID || !opportunity) {
    alert("رقم التخصص وفرصة العمل مطلوبين");
    return;
  }

  try {
    const res = await fetch("http://localhost:3001/opportunities", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        majorID: opportunityMajorID,
        opportunity: opportunity,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "حدث خطأ");
      return;
    }

    alert("تمت إضافة فرصة العمل بنجاح");
    resetForms();
    fetchOpportunities();
  } catch (error) {
    console.log(error);
    alert("Server error");
  }
};

const updateOpportunity = async (e) => {
  e.preventDefault();

  if (!oppoID || !opportunityMajorID || !opportunity) {
    alert("رقم الفرصة ورقم التخصص وفرصة العمل مطلوبين");
    return;
  }

  try {
    const res = await fetch(`http://localhost:3001/opportunities/${oppoID}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        majorID: opportunityMajorID,
        opportunity: opportunity,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "حدث خطأ");
      return;
    }

    alert("تم تعديل فرصة العمل بنجاح");
    resetForms();
    fetchOpportunities();
  } catch (error) {
    console.log(error);
    alert("Server error");
  }
};

const deleteOpportunity = async (e) => {
  e.preventDefault();

  if (!oppoID || !opportunityMajorID) {
    alert("رقم الفرصة ورقم التخصص مطلوبين");
    return;
  }

  try {
    const res = await fetch(`http://localhost:3001/opportunities/${oppoID}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        majorID: opportunityMajorID,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "حدث خطأ");
      return;
    }

    alert("تم حذف فرصة العمل بنجاح");
    resetForms();
    fetchOpportunities();
  } catch (error) {
    console.log(error);
    alert("Server error");
  }
};

 return (
  <div className="container py-5" dir="rtl" style={{ minHeight: "100vh" }}>
    <h1 className="text-center mb-5 fw-bold text-primary">
      لوحة تحكم الإدارة
    </h1>

    <AdminCards resetForms={resetForms} setActiveForm={setActiveForm} />

    {/* ================= FORMS ================= */}
      <div className="mt-5 mx-auto">

        
<FacultyForms
  activeForm={activeForm}
  faculties={faculties}

  facultyID={facultyID}
  setFacultyID={setFacultyID}

  facultyName={facultyName}
  setFacultyName={setFacultyName}

  addFaculty={addFaculty}
  updateFaculty={updateFaculty}
  deleteFaculty={deleteFaculty}
/>

<MajorForms
  activeForm={activeForm}
  faculties={faculties}
  majors={majors}

  majorID={majorID}
  setMajorID={setMajorID}

  majorName={majorName}
  setMajorName={setMajorName}

  majorFacultyID={majorFacultyID}
  setMajorFacultyID={setMajorFacultyID}

  acceptanceGrade={acceptanceGrade}
  setAcceptanceGrade={setAcceptanceGrade}

  creditHours={creditHours}
  setCreditHours={setCreditHours}

  costPerHour={costPerHour}
  setCostPerHour={setCostPerHour}

  studyPlanURL={studyPlanURL}
  setStudyPlanURL={setStudyPlanURL}

  addMajor={addMajor}
  updateMajor={updateMajor}
  deleteMajor={deleteMajor}
/>

<ExpertForms
  activeForm={activeForm}
  faculties={faculties}
  experts={experts}

  expertID={expertID}
  setExpertID={setExpertID}

  firstName={firstName}
  setFirstName={setFirstName}

  lastName={lastName}
  setLastName={setLastName}

  expertEmail={expertEmail}
  setExpertEmail={setExpertEmail}

  expertFacultyID={expertFacultyID}
  setExpertFacultyID={setExpertFacultyID}

  addExpert={addExpert}
  updateExpert={updateExpert}
  deleteExpert={deleteExpert}
/>


<QuestionForms
  activeForm={activeForm}
  questions={questions}

  questionID={questionID}
  setQuestionID={setQuestionID}

  questionText={questionText}
  setQuestionText={setQuestionText}

  addQuestion={addQuestion}
  updateQuestion={updateQuestion}
  deleteQuestion={deleteQuestion}
/>


<OptionForms
  activeForm={activeForm}
  questions={questions}
  options={options}

  optionID={optionID}
  setOptionID={setOptionID}

  optionText={optionText}
  setOptionText={setOptionText}

  optionQuestionID={optionQuestionID}
  setOptionQuestionID={setOptionQuestionID}

  addOption={addOption}
  updateOption={updateOption}
  deleteOption={deleteOption}
/>

<SkillForms
  activeForm={activeForm}
  majors={majors}
  skills={skills}

  skillID={skillID}
  setSkillID={setSkillID}

  skillMajorID={skillMajorID}
  setSkillMajorID={setSkillMajorID}

  skill={skill}
  setSkill={setSkill}

  addSkill={addSkill}
  updateSkill={updateSkill}
  deleteSkill={deleteSkill}
/>

<OpportunityForms
  activeForm={activeForm}
  majors={majors}
  opportunities={opportunities}

  oppoID={oppoID}
  setOppoID={setOppoID}

  opportunityMajorID={opportunityMajorID}
  setOpportunityMajorID={setOpportunityMajorID}

  opportunity={opportunity}
  setOpportunity={setOpportunity}

  addOpportunity={addOpportunity}
  updateOpportunity={updateOpportunity}
  deleteOpportunity={deleteOpportunity}
/>



      </div>
    </div>
  );
}