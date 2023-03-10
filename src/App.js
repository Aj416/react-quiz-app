import { useGlobalContext } from "./context";

import SetupForm from "./SetupForm";
import Loading from "./Loading";
import Modal from "./Modal";
function App() {
  const {
    loading,
    waiting,
    questions,
    index,
    correct,
    nextQuestion,
    submitAnswer,
    modalOpen,
  } = useGlobalContext();

  if (waiting) {
    return <SetupForm />;
  }
  if (loading) {
    return <Loading />;
  }
  const { question, incorrect_answers, correct_answer } = questions[index];

  const randomIndex = Math.floor(Math.random() * 3);

  const answers = [
    ...incorrect_answers.slice(0, randomIndex),
    correct_answer,
    ...incorrect_answers.slice(randomIndex),
  ];
  // const dummy
  // const answers = [...incorrect_answers, correct_answer];
  return (
    <main>
      <Modal />
      <section className="quiz">
        <p className="correct-answers">
          correct answers: {correct}/{modalOpen ? questions.length : index}
        </p>
        <article className="container">
          <h2 dangerouslySetInnerHTML={{ __html: question }} />
          <div className="btn-container">
            {answers.map((answer, index) => {
              return (
                <button
                  className="answer-btn"
                  key={index}
                  dangerouslySetInnerHTML={{ __html: answer }}
                  onClick={() => submitAnswer(answer === correct_answer)}
                />
              );
            })}
          </div>
        </article>
        <button className="next-question" onClick={nextQuestion}>
          next question
        </button>
      </section>
    </main>
  );
}

export default App;
