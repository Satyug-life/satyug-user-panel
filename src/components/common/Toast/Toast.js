import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const toastOptions = {
  position: "top-right",
  autoClose: 1000,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: false,
  hideProgressBar: true,
  theme: "dark",
};

class Toaster {
  success = (message) => {

    toast.success(message, {
      ...toastOptions,
    });
  };
  error = (message) => {
    toast.error(message, {
      ...toastOptions,
    });
  };
  warn = (message) => {
    toast.warn(message, {
      ...toastOptions,
    });
  };
  info = (message) => {
    toast.info(message, {
      ...toastOptions,
    });
  };
}
export const toasts = new Toaster();

