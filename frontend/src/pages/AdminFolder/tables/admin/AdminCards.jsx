export default function AdminCards({ resetForms, setActiveForm }) {
  const cards = [
    {
      title: "إدارة الكليات",
      add: "addFaculty",
      update: "updateFaculty",
      delete: "deleteFaculty",
      addText: "إضافة كلية",
      updateText: "تعديل كلية",
      deleteText: "حذف كلية",
    },
    {
      title: "إدارة التخصصات",
      add: "addMajor",
      update: "updateMajor",
      delete: "deleteMajor",
      addText: "إضافة تخصص",
      updateText: "تعديل تخصص",
      deleteText: "حذف تخصص",
    },
    {
      title: "إدارة الخبراء",
      add: "addExpert",
      update: "updateExpert",
      delete: "deleteExpert",
      addText: "إضافة خبير",
      updateText: "تعديل خبير",
      deleteText: "حذف خبير",
    },
    {
      title: "إدارة الأسئلة",
      add: "addQuestion",
      update: "updateQuestion",
      delete: "deleteQuestion",
      addText: "إضافة سؤال",
      updateText: "تعديل سؤال",
      deleteText: "حذف سؤال",
    },
    {
      title: "إدارة الخيارات",
      add: "addOption",
      update: "updateOption",
      delete: "deleteOption",
      addText: "إضافة خيار",
      updateText: "تعديل خيار",
      deleteText: "حذف خيار",
    },
    {
      title: "إدارة المهارات",
      add: "addSkill",
      update: "updateSkill",
      delete: "deleteSkill",
      addText: "إضافة مهارة",
      updateText: "تعديل مهارة",
      deleteText: "حذف مهارة",
    },
    {
      title: "إدارة فرص العمل",
      add: "addOpportunity",
      update: "updateOpportunity",
      delete: "deleteOpportunity",
      addText: "إضافة فرصة",
      updateText: "تعديل فرصة",
      deleteText: "حذف فرصة",
    },
  ];

  const openForm = (formName) => {
    resetForms();
    setActiveForm(formName);
  };

  return (
    <div className="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-4">
      {cards.map((card) => (
        <div className="col" key={card.title}>
          <div className="card shadow border-0 h-100 rounded-4">
            <div className="card-body text-center p-4">
              <h5 className="fw-bold mb-4">{card.title}</h5>

              <div className="d-grid gap-3">
                <button
                  onClick={() => openForm(card.add)}
                  className="btn btn-success rounded-pill"
                >
                  {card.addText}
                </button>

                <button
                  onClick={() => openForm(card.update)}
                  className="btn btn-warning text-white rounded-pill"
                >
                  {card.updateText}
                </button>

                <button
                  onClick={() => openForm(card.delete)}
                  className="btn btn-danger rounded-pill"
                >
                  {card.deleteText}
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}