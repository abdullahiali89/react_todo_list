import React from "react";

function ToDo({ toDo, handleDelete, }) {
  return (
    <div>
      <li>
        {toDo.task_text}
        <input type="checkbox" name="compete" id={toDo.id}  />
        <button
          id={toDo.id}
          onClick={(e) => {
            handleDelete(e);
          }}
        >
          delete
        </button>
      </li>
    </div>
  );
}

export default ToDo;
