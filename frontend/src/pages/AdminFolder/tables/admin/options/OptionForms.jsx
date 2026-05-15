import QuestionsTable from "../../QuestionsTable";
import OptionsTable from "../../OptionsTable";

export default function OptionForms({
  activeForm,
  questions,
  options,

  optionID,
  setOptionID,

  optionText,
  setOptionText,

  optionQuestionID,
  setOptionQuestionID,

  addOption,
  updateOption,
  deleteOption,
}) {
  return (
    <>
      {activeForm === "addOption" && (
        <div className="container">
          <div className="row">
            <div className="col-4">
              <QuestionsTable questions={questions} />
            </div>

            <div className="col-4">
              <form onSubmit={addOption} className="card p-4 shadow">
                <h4 className="text-center mb-3">إضافة خيار</h4>

                <input
                  className="form-control mb-3"
                  placeholder="رقم الخيار optionID"
                  value={optionID}
                  onChange={(e) => setOptionID(e.target.value)}
                  required
                />

                <input
                  className="form-control mb-3"
                  placeholder="رقم السؤال questionID"
                  value={optionQuestionID}
                  onChange={(e) => setOptionQuestionID(e.target.value)}
                  required
                />

                <input
                  className="form-control mb-3"
                  placeholder="نص الخيار"
                  value={optionText}
                  onChange={(e) => setOptionText(e.target.value)}
                  required
                />

                <button className="btn btn-success">حفظ</button>
              </form>
            </div>

            <div className="col-4">
              <OptionsTable options={options} />
            </div>
          </div>
        </div>
      )}

      {activeForm === "updateOption" && (
        <div className="container">
          <div className="row">
            <div className="col-4">
              <OptionsTable options={options} />
            </div>

            <div className="col-4">
              <form onSubmit={updateOption} className="card p-4 shadow">
                <h4 className="text-center mb-3">تعديل خيار</h4>

                <input
                  className="form-control mb-3"
                  placeholder="رقم الخيار optionID"
                  value={optionID}
                  onChange={(e) => setOptionID(e.target.value)}
                  required
                />

                <input
                  className="form-control mb-3"
                  placeholder="رقم السؤال questionID"
                  value={optionQuestionID}
                  onChange={(e) => setOptionQuestionID(e.target.value)}
                  required
                />

                <input
                  className="form-control mb-3"
                  placeholder="نص الخيار الجديد"
                  value={optionText}
                  onChange={(e) => setOptionText(e.target.value)}
                  required
                />

                <button className="btn btn-warning text-white">تعديل</button>
              </form>
            </div>
          </div>
        </div>
      )}

      {activeForm === "deleteOption" && (
        <div className="container">
          <div className="row">
            <div className="col-4">
              <OptionsTable options={options} />
            </div>

            <div className="col-4">
              <form onSubmit={deleteOption} className="card p-4 shadow">
                <h4 className="text-center mb-3">حذف خيار</h4>

                <input
                  className="form-control mb-3"
                  placeholder="رقم الخيار optionID"
                  value={optionID}
                  onChange={(e) => setOptionID(e.target.value)}
                  required
                />

                <button className="btn btn-danger">حذف</button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}