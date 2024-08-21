import { toast } from "vue3-toastify";
import Swal from "sweetalert2";

export const createGuestNotification = (message) => {
  return Swal.fire({
    title: message,
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading();
    },
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
  confirmButtonText = "OK",
  callback = null
) => {
  Swal.fire({
    title: title,
    text: text,
    icon: icon,
    confirmButtonText: confirmButtonText,
  }).then((result) => {
    if (result.isConfirmed && callback) {
      callback();
    }
  });
};
