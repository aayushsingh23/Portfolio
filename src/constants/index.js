import {
  mobile,
  backend,
  creator,
  web,
  javascript,
  typescript,
  html,
  css,
  reactjs,
  kubernetes,
  linux,
  nodejs,
  mySQL,
  git,
  figma,
  docker,
  credex,
  Mayoor,
  thapar,
  oryggi,
  Gfg,
  erp,
  jobit,
  tripguide,
  cpp,
  angular,
} from "../assets";

export const navLinks = [
  {
    id: "about",
    title: "About",
  },
  {
    id: "work",
    title: "Work",
  },
  {
    id: "contact",
    title: "Contact",
  },
];

const services = [
  {
    title: "Student",
    icon: mobile,
  },
  {
    title: "Web Developer",
    icon: web,
  },
  {
    title: "Aspiring Data Scientist",
    icon: backend,
  },
  {
    title:"Cloud/Dev Ops",
    icon: creator
  },
];

const technologies = [
  {
    name: "HTML 5",
    icon: html,
  },
  {
    name: "CSS 3",
    icon: css,
  },
  {
    name: "JavaScript",
    icon: javascript,
  },
  {
    name: "React JS",
    icon: reactjs,
  },
  {
    name: "TypeScript",
    icon: typescript,
  },
  {
    name:"Angular",
    icon: angular
  },
  {
    name: "Kubernetes",
    icon: kubernetes,
  },
  {
    name: "linux CSS",
    icon: linux,
  },
  {
    name: "Node JS",
    icon: nodejs,
  },
  {
    name: "mySQL",
    icon: mySQL,
  },
  {
    name: "C++",
    icon: cpp,
  },
  {
    name: "git",
    icon: git,
  },
  // {
  //   name: "figma",
  //   icon: figma,
  // },
  {
    name: "docker",
    icon: docker,
  },
];

const experiences = [
  {
    title: "High School",
    company_name: "Mayoor School",
    icon: Mayoor,
    iconBg: "#FFFFFF",
    date: "Passed-2022",
    points: [
      "Graduated Class-XII with 94.2%",
      "Scored 94.6% in Class-X CBSE Board examination",

    ],
  },
  {
    title: "Bachelors of Engineering",
    company_name: "Thapar Institue of Engineering and Technology",
    icon: thapar,
    iconBg: "#FFFFFF",
    date: "July 2022 - Present",
    points: [
      "B.E. in Computer Engineering",
      "Current CGPA: 8.59",
      "Made Experential Learning Projects such as Mobile app Developement",
      "Worked and studied working of automated Buggy and Mangonel",
    ],
  },
  {
    title: "Angular JS Intern",
    company_name: "Oryggi Technologies Pvt. Ltd ",
    icon: oryggi,
    iconBg: "#FFFFFF",
    date: "June 2023 - July 2023",
    points: [
      "Learned and worked with Angular CLI and Angular JS",
      "Made a basic ERP system with an Express server",
      "Currently doing a project on designing and printing Identity Card",
    ],
  },
  {
    title: "Cloud Ops Intern",
    company_name: "Credex Technology",
    icon: credex,
    iconBg: "#FFFFFF",
    date: "June 2024 - Present",
    points: [
      "Learnt about Docker and Linux",
      "Worked with Kubernetes",
      "Implementing Docker and Linux bases systems cross-server compatibility.",
      "Participating in code reviews and providing constructive feedback to other developers.",
    ],
  },
];

const testimonials = [
  {
    testimonial:
      "I thought it was impossible to make a website as beautiful as our product, but Rick proved me wrong.",
    name: "Sara Lee",
    designation: "CFO",
    company: "Acme Co",
    image: "https://randomuser.me/api/portraits/women/4.jpg",
  },
  {
    testimonial:
      "I've never met a web developer who truly cares about their clients' success like Rick does.",
    name: "Chris Brown",
    designation: "COO",
    company: "DEF Corp",
    image: "https://randomuser.me/api/portraits/men/5.jpg",
  },
  {
    testimonial:
      "After Rick optimized our website, our traffic increased by 50%. We can't thank them enough!",
    name: "Lisa Wang",
    designation: "CTO",
    company: "456 Enterprises",
    image: "https://randomuser.me/api/portraits/women/6.jpg",
  },
];

const projects = [
  {
    name: "Guide for Guides",
    description:
      "It's a platform that brings together both parties - the tourists and the guides.Hiring a trusted guide for your travel expeditions through a centralised platform.The project aims at enabling the customers to hire guides as seamlessly as they order food online. ",
    tags: [
      {
        name: "JavaScript",
        color: "blue-text-gradient",
      },
      {
        name: "WebFlow",
        color: "green-text-gradient",
      },
      {
        name: "RazorPay API",
        color: "pink-text-gradient",
      },
    ],
    image: Gfg,
    source_code_link: "https://github.com/aayushsingh23/Guide-for-Guides",
  },
  {
    name: "Angular ERP",
    description:
      "It is a basic ERP system that stores information about employees of a company with their photograph. It also displays the list of employees and is able to fetch from the list of employees. It can be uses ng-forms and localstorage from where the data can be fed to the database.",
    tags: [
      {
        name: "TypeScript",
        color: "blue-text-gradient",
      },
      {
        name: "Angular",
        color: "pink-text-gradient",
      },
      {
        name: "ExpressJS",
        color: "orange-text-gradient",
      },
    ],
    image: erp,
    source_code_link: "https://github.com/aayushsingh23/Basic-ERP",
  },
  
];

export { services, technologies, experiences, testimonials, projects };