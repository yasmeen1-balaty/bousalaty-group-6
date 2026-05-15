import React from "react";

export default function AdminCards({
  title,
  onAdd,
  onUpdate,
  onDelete,
}) {
  return (
    <div className="col-md-4">
      <div className="card shadow border-0 h-100 rounded-4">
        <div className="card-body text-center p-4">

          <h3 className="fw-bold mb-4">{title}</h3>

          <div className="d-grid gap-3">

            <button onClick={onAdd} className="btn btn-success rounded-pill" >
              إضافة
            </button>

            <button onClick={onUpdate} className="btn btn-warning text-white rounded-pill" >
              تعديل
            </button>

            <button  onClick={onDelete} className="btn btn-danger rounded-pill" >
              حذف
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}