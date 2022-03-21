import styles from "./ToDo.module.css";

function ToDo({ toDo, handleDelete, handleCheck, index, checked }) {
  console.log(toDo.complete);
  let check = true;
  return (
    <div>
      <li className={styles.ToDo}>
        <input
          // checked={toDo.complete === "1" ? true : false}
          type="checkbox"
          name="compete"
          id={toDo.id}
          onClick={(e) => {
            checked = !check;
            handleCheck(e, index);
          }}
        />
        {toDo.complete === "0" ? (
          <strong>{toDo.task_text} </strong>
        ) : (
          <del>{toDo.task_text}</del>
        )}

        <button
          className={styles.DeleteBtn}
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
