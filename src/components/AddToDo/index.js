import styles from "./AddToDo.module.css";
function AddToDo({ handleOnChange, submitHandler, mainState }) {
  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          submitHandler(e);
        }}
      >
        
        <input
          placeholder="Enter Todo"
          required
          type="text"
          name="task"
          value={mainState.newToDo}
          onChange={handleOnChange}
        />
        <button>Add</button>
      </form>
    </div>
  );
}

export default AddToDo;
