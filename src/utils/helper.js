export const scrollToSection = (idName) => {
  const section = document.getElementById(idName);
  console.log(`Scrolling to section: ${idName}`, section); // Debugging log
  if (section) {
    section.scrollIntoView({ behavior: "smooth", block: "start" });
    console.log(`Scrolled to section: ${idName}`); // Confirm scroll
  } else {
    console.error(`Section with ID ${idName} not found`);
  }
};
