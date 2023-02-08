import {
  SET_ERROR,
  SET_INDEX,
  SET_LOADING,
  SET_WAITING,
  SET_QUESTIONS,
  HANDLE_CORRECT_ANSWER,
  SET_MODAL_OPEN,
  SET_QUIZ,
} from "./actions";

const reducer = (state, action) => {
  let updatedIndex;
  switch (action.type) {
    case SET_WAITING:
      return { ...state, waiting: action.payload };
    case SET_LOADING:
      return { ...state, loading: action.payload };
    case SET_ERROR:
      return { ...state, error: action.payload };
    case SET_QUESTIONS:
      return {
        ...state,
        loading: false,
        waiting: false,
        error: false,
        questions: action.payload,
      };
    case SET_INDEX:
      updatedIndex = state.index + 1;
      return {
        ...state,
        index: updatedIndex > state.questions.length - 1 ? 0 : updatedIndex,
        modalOpen: updatedIndex > state.questions.length - 1 ? true : false,
      };
    case HANDLE_CORRECT_ANSWER:
      updatedIndex = state.index + 1;
      if (action.payload) {
        return {
          ...state,
          correct: state.correct + 1,
          index: updatedIndex > state.questions.length - 1 ? 0 : updatedIndex,
          modalOpen: updatedIndex > state.questions.length - 1 ? true : false,
        };
      } else {
        return {
          ...state,
          index: updatedIndex > state.questions.length - 1 ? 0 : updatedIndex,
          modalOpen: updatedIndex > state.questions.length - 1 ? true : false,
        };
      }
    case SET_MODAL_OPEN:
      if (action.payload) {
        return { ...state, modalOpen: true };
      } else {
        return {
          ...state,
          modalOpen: false,
          waiting: true,
          index: 0,
          correct: 0,
          questions: [],
        };
      }
    case SET_QUIZ:
      const updatedQuiz = {
        ...state.quiz,
        [action.payload.name]: action.payload.value,
      };
      return { ...state, quiz: updatedQuiz };
    default:
      throw new Error(`no matching action type - "${action.type}"`);
  }
};
export default reducer;
