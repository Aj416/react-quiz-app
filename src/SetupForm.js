import { useGlobalContext } from "./context";

const SetupForm = () => {
  const { quiz, error, setupQuiz, createQuiz } = useGlobalContext();
  return (
    <main>
      <section className="quiz quiz-small">
        <form className="setup-form">
          <div className="form-control">
            <label htmlFor="amount">number of questions</label>
            <input
              type="number"
              name="amount"
              id="amount"
              value={quiz.amount}
              className="form-input"
              min={1}
              max={50}
              onChange={setupQuiz}
            />
          </div>
          <div className="form-control">
            <label htmlFor="category">category</label>
            <select
              name="category"
              id="category"
              className="form-input"
              value={quiz.category}
              onChange={setupQuiz}
            >
              <option value="9">general knowledge</option>
              <option value="20">mythology</option>
              <option value="21">sports</option>
              <option value="22">geography</option>
              <option value="23">history</option>
              <option value="24">politics</option>
              <option value="26">celebrities</option>
              <option value="27">animals</option>
              <option value="28">vehicles</option>
            </select>
          </div>
          <div className="form-control">
            <label htmlFor="difficulty">select difficulty</label>
            <select
              name="difficulty"
              id="difficulty"
              className="form-input"
              value={quiz.difficulty}
              onChange={setupQuiz}
            >
              <option value="easy">easy</option>
              <option value="medium">medium</option>
              <option value="hard">hard</option>
            </select>
          </div>
          {error && (
            <p className="error">
              can't generate questions, please try different options
            </p>
          )}
          <button className="submit-btn" type="submit" onClick={createQuiz}>
            start
          </button>
        </form>
      </section>
    </main>
  );
};

export default SetupForm;
