export const scrollToSection = (idName) => {
  const section = document.getElementById(idName);
  if (section) {
    section.scrollIntoView({ behavior: "smooth" });
  }
};
