export type MiniProjectData = {
  id: string;
  title: string;
  description: string;
  subtitle?: string;
  year: string;
  images: string[];
  tags: string[];
  githubUrl: string;
  demoUrl: string;
};

export const miniCatalog: MiniProjectData[] = [
  {
    id: '1001',
    title: 'Web Calculator',
    description: 'TheOdinProject activity: a simple web-based calculator built with HTML, CSS, and JavaScript. It supports basic arithmetic operations and provides a clean user interface for quick calculations.',
    year: '2023',
    images: ['/mini-projects/web-calculator/image.png'],
    tags: ['HTML', 'CSS', 'JavaScript'],
    githubUrl: 'https://github.com/Zero0blanK/odin-web-calculator',
    demoUrl: 'https://zero0blank.github.io/odin-web-calculator/'
  },
  {
    id: '1002',
    title: 'Rock Paper Scissors Game',
    description: 'TheOdinProject activity: a simple web-based game built with HTML, CSS, and JavaScript. It allows users to play the classic Rock Paper Scissors game against the computer.',
    year: '2023',
    images: ['/mini-projects/rock-paper-scissors/initial.png', '/mini-projects/rock-paper-scissors/lose.png'],
    tags: ['HTML', 'CSS', 'JavaScript'],
    githubUrl: 'https://github.com/Zero0blanK/odin-rock-paper-scissors',
    demoUrl: 'https://zero0blank.github.io/odin-rock-paper-scissor/'
  },
  {
    id: '1003',
    title: 'Etch-a-Sketch',
    description: 'TheOdinProject activity: a web-based drawing application inspired by the classic Etch-a-Sketch toy. Built with HTML, CSS, and JavaScript, it allows users to create pixel art by drawing on a grid, with options for different colors and grid sizes.',
    year: '2023',
    images: ['/mini-projects/etch-a-sketch/image.png'],
    tags: ['HTML', 'CSS', 'JavaScript'],
    githubUrl: 'https://github.com/Zero0blanK/odin-etch-a-sketch',
    demoUrl: 'https://zero0blank.github.io/odin-etch-a-sketch/'
  },
];