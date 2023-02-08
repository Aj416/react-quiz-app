import axios from "axios";
import { useContext, createContext, useReducer } from "react";
import reducer from "./reducer";
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

const API_ENDPOINT = "https://opentdb.com/api.php?";

const initialState = {
  loading: false,
  waiting: true,
  questions: [],
  index: 0,
  correct: 0,
  error: false,
  modalOpen: false,
  quiz: {
    amount: 10,
    category: "21",
    difficulty: "easy",
  },
};

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchQuestions = async (url) => {
    dispatch({ type: SET_LOADING, payload: true });
    dispatch({ type: SET_WAITING, payload: false });
    const response = await axios(url).catch((err) => console.log(err));
    if (response) {
      const data = response.data.results;
      if (data.length > 0) {
        dispatch({ type: SET_QUESTIONS, payload: data });
      } else {
        dispatch({ type: SET_WAITING, payload: true });
        dispatch({ type: SET_ERROR, payload: true });
      }
    } else {
      dispatch({ type: SET_WAITING, payload: true });
    }
  };

  const nextQuestion = () => {
    dispatch({ type: SET_INDEX });
  };

  const submitAnswer = (value) => {
    dispatch({ type: HANDLE_CORRECT_ANSWER, payload: value });
  };

  const closeModal = () => {
    dispatch({ type: SET_MODAL_OPEN, payload: false });
  };

  const setupQuiz = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    dispatch({ type: SET_QUIZ, payload: { name, value } });
  };

  const createQuiz = (e) => {
    e.preventDefault();
    const { amount, category, difficulty } = state.quiz;
    const tempUrl = `${API_ENDPOINT}amount=${amount}&difficulty=${difficulty}&category=${category}&type=multiple`;
    fetchQuestions(tempUrl);
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        nextQuestion,
        submitAnswer,
        closeModal,
        setupQuiz,
        createQuiz,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
