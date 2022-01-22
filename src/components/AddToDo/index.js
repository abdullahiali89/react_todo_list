function AddToDo({ handleOnChange, submitHandler, mainState }) {
  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          submitHandler(e);
        }}
      >
        <label htmlFor="task">Enter ToDo:</label>
        <input
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
