import "./Toaster.css";
import { useEffect } from "react";
import { Toast } from "react-bootstrap";
import useToaster from "./ToastHook";
import { ToastPresenter, ToastView } from "../../presenters/ToastPresenter";
import { useState } from "react";
import useToastListener from "./ToastListenerHook";

interface Props {
  position: string;
}

const Toaster = ({ position }: Props) => {
  const { toastList, deleteToast } = useToaster();
  const { displayErrorMessage } = useToastListener();

  const listener : ToastView = {
    displayErrorMessage: displayErrorMessage,
    deleteToast: (id: string) => deleteToast(id)
  }
  const [presenter] = useState(new ToastPresenter(listener)); 

  useEffect(() => {
    const interval = presenter.setInterval(toastList);
    return () => {
      clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toastList]);


  return (
    <>
      <div className={`toaster-container ${position}`}>
        {toastList.map((toast, i) => (
          <Toast
            id={toast.id}
            key={i}
            className={toast.bootstrapClasses}
            autohide={false}
            show={true}
            onClose={() => deleteToast(toast.id)}
          >
            <Toast.Header>
              <img
                src="holder.js/20x20?text=%20"
                className="rounded me-2"
                alt=""
              />
              <strong className="me-auto">{toast.title}</strong>
            </Toast.Header>
            <Toast.Body>{toast.text}</Toast.Body>
          </Toast>
        ))}
      </div>
    </>
  );
};

export default Toaster;
