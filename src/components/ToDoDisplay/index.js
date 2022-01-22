import AddToDo from "../AddToDo";
import ToDo from "../ToDo";
function ToDoDisplay({
  handleOnChange,
  handleDelete,
  mainState,
  submitHandler,
}) {
  return (
    <div>
      <AddToDo
        submitHandler={submitHandler}
        mainState={mainState}
        handleOnChange={handleOnChange}
      />
      <div>
        {mainState.usersToDos.map((toDo) => {
          return <ToDo toDo={toDo} key={toDo.id} handleDelete={handleDelete} />;
        })}
      </div>
    </div>
  );
}

export default ToDoDisplay;
