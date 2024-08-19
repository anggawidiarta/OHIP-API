import { toast } from "vue3-toastify";

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
