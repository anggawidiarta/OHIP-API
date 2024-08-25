export const scrollToSection = (idName) => {
  const section = document.getElementById(idName);
  console.log(`Scrolling to section: ${idName}`, section); // Debugging log
  if (section) {
    section.scrollIntoView({ behavior: "smooth" });
    console.log(`Scrolled to section: ${idName}`); // Confirm scroll
  } else {
    console.error(`Section with ID ${idName} not found`);
  }
};

export const getRoomDescription = (roomTypeCode) => {
  switch (roomTypeCode) {
    case "KS1B":
      return "One Bed Room Villa Kasambi";
    case "KS2B":
      return "Two Bed Room Villa Kasambi";
    case "KT1B":
      return "One Bed Room Villa Kanata";
    case "LA1B":
      return "One Bed Room Villa Lantoro";
    case "LA2B":
      return "Two Bed Room Villa Lantoro";
    case "LB1B":
      return "One Bed Room Villa Lamba";
    case "LL1B":
      return "One Bed Room Villa Lulu";
    case "LL2B":
      return "Two Bed Room Villa Lulu";
    case "MM3B":
      return "Three Bed Room Villa Mam";
    case "PC4B":
      return "Four Bed Room Villa Puncak";
    case "PI":
      return "Posting Interface";
    case "PM":
      return "Posting Master";
    case "RL1B":
      return "One Bed Room Villa Raja Lamba";
    case "MR1B":
      return "One Bed Room Villa Marangga";
    case "WA1B":
      return "One Bed Room Villa Wamoro";
    case "RK1B":
      return "One Bed Room Villa Raja Kanatar Duplex";
    case "RM2B":
      return "Two Bed Room Villa Raja Mandaka";
    case "RM1B":
      return "One Bed Room Villa Raja Mandaka";
    case "WA2B":
      return "Two Bed Room Villa Wamoro";
    default:
      return "Standard Room";
  }
};

export const getRatePlanDescription = (ratePlanCode) => {
  switch (ratePlanCode) {
    case "FITRACK":
      return "Rack Rate FIT Booking - Non Estate";
    case "FITRACK - ES":
      return "Rack Rate FIT Booking - Estate";

    default:
      return "Default Rate Plan";
  }
};
