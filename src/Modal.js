import { useGlobalContext } from "./context";

const Modal = () => {
  const { modalOpen, correct, questions, closeModal } = useGlobalContext();
  return (
    <div className={`modal-container ${modalOpen && "isOpen"}`}>
      <div className="modal-content">
        <h2>result !!!</h2>
        <p>
          you answered {((correct / questions.length) * 100).toFixed(0)}% of
          questions correctly
        </p>
        <button className="close-btn" onClick={closeModal}>
          play again
        </button>
      </div>
    </div>
  );
};

export default Modal;
