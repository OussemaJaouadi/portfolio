import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaPhone, // Importing phone icon
} from "react-icons/fa";

export const links = [
  {
    index: 0,
    title: "Find me on Github",
    href: "https://github.com/OussemaJaouadi",
    icon: <FaGithub />,
  },
  {
    index: 1,
    title: "Find me on LinkedIn",
    href: "https://www.linkedin.com/in/oussema-jaouadi/",
    icon: <FaLinkedin />,
  },
  {
    index: 2,
    title: "Contact me via email",
    href: "mailto:oussama.jaouadi@insat.ucar.tn",
    icon: <FaEnvelope />,
  },
  {
    index: 3,
    title: "Call me",
    href: "tel:+21695394673", // Use tel: scheme for phone numbers
    icon: <FaPhone />,
  },
];
