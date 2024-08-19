import { toast } from "vue3-toastify";
import Swal from "sweetalert2";

export const createGuestNotification = () => {
  toast("Guest Profile Created !", {
    theme: "auto",
    type: "success",
    dangerouslyHTMLString: true,
  });
};

export const notification = (message, type) => {
  toast(message, {
    theme: "auto",
    type: type,
    dangerouslyHTMLString: true,
  });
};

export const showNotification = (
  title,
  text,
  icon = "success",
  confirmButtonText = "OK"
) => {
  Swal.fire({
    title: title,
    text: text,
    icon: icon,
    confirmButtonText: confirmButtonText,
  });
};
