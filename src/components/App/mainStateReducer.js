export const ACTIONS = {
  SIGNUP_USER: "SIGNUP_USER",
  USER_LOGIN: "USER_LOGIN",
  TOGGLE_DETAILS_AVAILABLE: "TOOGLE_DETAILS_AVAILABLE",
  UPDATE_USER_ID: "UPDATE_USER_ID",
  TOGGLE_LOGIN: "TOGGLE_LOGIN",
  ADD_USER_ID: "ADD_USER_ID",
  TOGGLE_USER_ID_UPDATED: "TOGGLE_USER_ID_UPDATED",
  GET_USER_TODOS: "GET_USER_TODOS",
  UPDATE_USER_TODOS: "UPDATE_USER_TODOS",
  NEW_USER_TODO: "NEW_USER_TODO",
  TOGGLE_NEW_TODO_ADDED: "TOGGLE_NEW_TODO_ADDED",
  TOGGLE_TODO_DELETED: "TOGGLE_TODO_DELETED",
  SET_DELETED_TODO_ID: "SET_DELETED_TODO_ID",
  DELETE_TODO: "DELETE_TODO",
};

export const initialMainState = {
  userId: "",
  userIdUpdated: false,
  userSignUpDetails: {},
  userLoginDetails: {},
  signUpDetailsAvailable: false,
  login: false,
  usersToDos: [],
  newToDo: "",
  newToDoAdded: false,
  toDoDeleted: false,
  deletedToDoId: "",
};

export function mainStateReducer(state, action) {
  switch (action.type) {
    case ACTIONS.SIGNUP_USER:
      return { ...state, userSignUpDetails: action.payload };
    case ACTIONS.USER_LOGIN:
      return { ...state, userLoginDetails: action.payload };
    case ACTIONS.TOGGLE_DETAILS_AVAILABLE:
      return {
        ...state,
        signUpDetailsAvailable: !state.signUpDetailsAvailable,
      };
    case ACTIONS.UPDATE_USER_ID:
      return { ...state, userId: action.payload.user_id };
    case ACTIONS.TOGGLE_LOGIN:
      return { ...state, login: !state.login };
    case ACTIONS.ADD_USER_ID:
      return { ...state, userId: action.payload };
    case ACTIONS.TOGGLE_USER_ID_UPDATED:
      return { ...state, userIdUpdated: !state.userIdUpdated };
    case ACTIONS.GET_USER_TODOS:
      return { ...state, usersToDos: [...action.payload] };
    case ACTIONS.UPDATE_USER_TODOS:
      return { ...state, usersToDos: [...state.usersToDos, ...action.payload] };
    case ACTIONS.NEW_USER_TODO:
      return { ...state, newToDo: action.payload };
    case ACTIONS.TOGGLE_NEW_TODO_ADDED:
      return { ...state, newToDoAdded: !state.newToDoAdded };
    case ACTIONS.TOGGLE_TODO_DELETED:
      return { ...state, toDoDeleted: !state.toDoDeleted };
    case ACTIONS.SET_DELETED_TODO_ID:
      return { ...state, deletedToDoId: action.payload };
    case ACTIONS.DELETE_TODO:
      const index = state.usersToDos.indexOf(
        state.usersToDos.find((todo) => todo.id === action.payload)
      );
      return {
        ...state,
        usersToDos: [
          ...state.usersToDos.slice(0, index),
          ...state.usersToDos.slice(index + 1),
        ],
      };

    default:
      return state;
  }
}
