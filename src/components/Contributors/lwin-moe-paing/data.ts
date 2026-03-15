export const aboutData = {
  description:
    'In Myanmar, there is a toy called "Pyit-Taing-Htaung" that never stays down, no matter how hard it is thrown. I\'m Lwin Moe Paing, a frontend developer with over 8 years of experience, always rising and moving forward. 🔥',

  books: [
    {
      title: "HTML & CSS : Beginner to Super Beginner",
      text: "Welcome to \"HTML & CSS - Beginner to Super Beginner,\" your ultimate guide to learning the basics of web design and development. Whether you're an absolute beginner or an intermediate learner,",
      image: "/contributors/lwinmoepaing/books/html-css.jpg",
      link: "https://drive.google.com/file/d/1EcXt3WrOzLh-PR6ywdEXR1kIMr0DxK3s/view?usp=sharing",
    },
    {
      title: "TypeScript Baby",
      text: "This structure introduces TypeScript in a friendly and practical way, providing clear examples and actionable steps for beginners to follow.",
      image: "/contributors/lwinmoepaing/books/typescript-baby.jpg",
      link: "https://drive.google.com/file/d/1T5qUG7PH289nAxw0BdL7JX7QdN8L3amO/view?usp=sharing",
    },
    {
      title: "Figma For Developer",
      text: "While mentoring junior developers, one of my mentees received a job offer with a take-home assignment requiring a pixel-perfect design from a Figma file. He had to learn Figma from scratch.",
      image: "/contributors/lwinmoepaing/books/figma-for-dev.jpg",
      link: "https://drive.google.com/file/d/1vGDFD-F5ViIgOomYMxrkw-tqnQjkMqSj/view?usp=sharing",
    },
  ],
} as const;

export type AchievementDataType = {
  awards: {
    title: string;
    text: string;
    image: string;
  }[];
  activities: {
    title: string;
    text: string;
  }[];
};

export const achievementData: AchievementDataType = {
  awards: [
    {
      title: "WIT Champion 2020",
      text: "Honored with the Web Innovation Award (WIT) in 2020 for outstanding achievement in Business Idea.",
      image: "/contributors/lwinmoepaing/awards/wit-2020.jpg",
    },
    {
      title: "WIT Design Award 2018",
      text: "Presented by Spiceworks Myanmar, a Japan-Myanmar organization. Honored with the Web Innovation Award (WIT) in 2018 for outstanding achievement in web design.",
      image: "/contributors/lwinmoepaing/awards/wit-2018.jpg",
    },
    {
      title: "Unihack Champion 2018",
      text: "Unihack, Myanmar University's most challenging hackathon at the time. Awarded Champion in 2018 for developing an innovative web application using cutting-edge",
      image: "/contributors/lwinmoepaing/awards/unihack-2018.jpg",
    },
  ],

  activities: [
    {
      title: "Erudite Monthly Challenge",
      text: "Erudite Monthly Challenge is a focused, month-long learning mission where community members commit to building, learning, or shipping one meaningful thing together. It's designed to turn consistency into a habit — less talk, more action — while everyone shares progress, struggles, and wins as a group.",
    },
    {
      title: "Build Erudite Community",
      text: "I'm building the Erudite Community as a space where curious minds learn together, share knowledge freely, and grow through consistent practice rather than hype. It's not just a community you joined — it's one you're deliberately shaping, day by day, with learning, building, and mutual support at the core.",
    },
    {
      title: "Knowledge Sharing : How to Learn as Junior",
      text: "I help my juniors be more productive when I'm free. It's like a hobby — I love helping out. This picture was taken from Sunday, 13th of 2023 @ WTC Community.",
    },
  ],
};

export type ExpDataType = {
  company: string;
  companyWebsite: string;
  position: string;
  date: string;
  list?: {
    title: string;
    para: string;
  }[];
};

export const expData: ExpDataType[] = [
  {
    company: "Gardi Craft",
    companyWebsite: "gardicraft.link",
    position: "Fullstack Developer",
    date: "Community Project: Dec 2025 - Present",
    list: [
      {
        title: "A Garden That Speaks for You",
        para: "Imagine sending someone a garden where every flower hides a feeling you couldn't say out loud. They open the link, tap a plant, and a small message blossoms — your hopes, your surprises, your love. By the time they reach the final rose, they're smiling with teary eyes. This isn't just a garden. It's a moment you created.",
      },
    ],
  },
  {
    company: "Erudite Myanmar",
    companyWebsite: "eruditemm.com",
    position: "Community Builder",
    date: "Hybrid: Aug 2025 - Present",
    list: [
      {
        title: "Erudite Challenge",
        para: "Best Study and Dev Community In Myanmar.",
      },
    ],
  },
  {
    company: "BinaryLab, Co",
    companyWebsite: "binarylab.io",
    position: "Senior NextJs Developer",
    date: "Hybrid: Jul 2023 - Present",
    list: [
      {
        title: "Newsmast Social Application",
        para: "Newsmast is a social platform built on Mastodon, aiming to provide real-time updates.",
      },
      {
        title: "Croucher Foundation (croucher.org.hk)",
        para: "Working on a project for the Croucher Foundation based in Hong Kong. Updating Old WordPress to Next.js, incorporating CMS Editor Tools.",
      },
    ],
  },
  {
    company: "MoMoney",
    companyWebsite: "mo.com.mm",
    position: "Senior React Native Developer",
    date: "Fulltime: Jan 2023 ~ June 2023",
    list: [
      {
        title: "MoMoney Application",
        para: "Played a pivotal role in fostering collaboration with the Vietnam team. Focus was on articulating for feature development using React Native.",
      },
    ],
  },
  {
    company: "uab Bank",
    companyWebsite: "uab.com.mm",
    position: "Senior React Native Developer",
    date: "Fulltime: Jul 2021 ~ May 2022",
    list: [
      {
        title: "uabPay Application",
        para: "Responsible for overseeing the transition from v1 to v2, and implementing the exciting Gold-exchange feature for the banking app.",
      },
    ],
  },
  {
    company: "MoveMove Everything (venuslab.co)",
    companyWebsite: "linkedin.com/company/venuslab",
    position: "Senior Frontend Developer",
    date: "Fulltime: Jan 2021 ~ Jun 2021",
    list: [
      {
        title: "MoveMove Internal System",
        para: "Successfully contributed to the development of several Internal Dashboards.",
      },
    ],
  },
  {
    company: "Marathon Myanmar",
    companyWebsite: "marathonmyanmar.com",
    position: "Senior VueJS Frontend Developer",
    date: "Fulltime: Jan 2020 ~ Dec 2020",
    list: [
      {
        title: "Marathon Myanmar Portal",
        para: "The integration of UX/UI design with Coding for the Marathon Web platform.",
      },
    ],
  },
  {
    company: "Fairway Technology",
    companyWebsite: "fairway.com.mm",
    position: "Internship to Junior",
    date: "Fulltime: May 2019 ~ Jan 2020",
    list: [
      {
        title: "6 months Internship Program",
        para: "Intern and actively contributed.",
      },
      {
        title: "3 months Junior Program",
        para: "Opportunity to work with ReactJS on the career listing page on a large project, similar to a job-finding platform.",
      },
    ],
  },
  {
    company: "Spiceworks Myanmar",
    companyWebsite: "spiceworksmyanmar.com",
    position: "Junior Frontend Developer",
    date: "Hybrid: Mar 2018 ~ Nov 2018",
    list: [
      {
        title: "Spiceworks Web Design",
        para: "Pixel-perfect designs and client-side frontend development using HTML, CSS, and JavaScript.",
      },
    ],
  },
];
