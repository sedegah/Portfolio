# Kimathi Elikplim Sedegah — Portfolio Site

Welcome to the personal portfolio of **Kimathi Elikplim Sedegah**. Hosted at [https://kimathisedegah.vercel.app](https://kimathisedegah.vercel.app), this site highlights my web development skills, project showcase, and design philosophy. Key sections include a hero banner with a dynamic typewriter text effect, skill cards with tooltips, project galleries, and interactive scroll animations.

## Table of Contents

- [Demo](#demo)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running Locally](#running-locally)
- [Deployment](#deployment)
- [Folder Structure](#folder-structure)
- [Customization](#customization)
- [Contributing](#contributing)
- [License](#license)

---

## Demo

Live demo available at: [https://kimathisedegah.vercel.app](https://kimathisedegah.vercel.app)

---

## Features

- **Dark Mode Toggle**: Persistent dark/light theme saved in `localStorage`.
- **Scroll Animations**: Sections, skill items, project cards, and competency cards fade & slide into view.
- **Typewriter Effect**: Hero heading cycles through key phrases.
- **Floating Badge**: Attention-grabbing badge that pulses up and down.
- **Skill Tooltips**: Hover over skills to see descriptive tooltips.
- **Project Card Hover**: Subtle lift and shadow on project items.
- **Progress Bars**: Animate skill-level bars into view once scrolled into viewport.
- **Scroll-to-Top Button**: Smooth scroll back to top of page after scrolling down.
- **Dynamic Year**: Current year injected automatically in the footer.
- **Background Particles**: Lightweight animated canvas particles for ambient effect.

---

## Tech Stack

- **HTML5 & CSS3** — Markup and styling
- **JavaScript (ES6+)** — Interactivity and animations
- **IntersectionObserver API** — Efficient scroll-triggered animations
- **LocalStorage** — Persist user theme choice
- **Canvas API** — Custom background particle animation
- **Vercel** — Continuous deployment from GitHub

---

## Getting Started

These instructions will help you get a copy of the project running on your local machine.

### Prerequisites

- Git (to clone the repo)
- A modern browser (Chrome, Firefox, Edge, Safari)
- (Optional) Node.js & npm if you want to serve via a local development server

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/kimathisedegah/portfolio-site.git
   cd portfolio-site
   ```
2. (Optional) Install a live server to preview:
   ```bash
   npm install -g live-server
   ```

### Running Locally

- **Without build tools**: Simply open `index.html` in your browser.
- **With a local server**:
  ```bash
  live-server
  ```

---

## Deployment

This site deploys automatically via Vercel. To set up your own deployment:

1. Push your code to a GitHub repository.
2. Log in to Vercel and import your GitHub project.
3. Set the build command to `echo "No build needed"` and the output directory to `/`.
4. Trigger a deployment — your site will be live at a Vercel-generated URL.

---

## Folder Structure

```plain
portfolio-site/
├── index.html          # Main page markup
├── css/
│   └── styles.css      # Site-wide styles and utility classes
├── js/
│   └── script.js       # All interactive and animation code
├── assets/
│   ├── images/         # All site images (photos, icons)
│   └── fonts/          # Custom web fonts (if any)
└── README.md           # Project documentation (you are here)
```

---

## Customization

- **Hero Text**: Update the phrases array in `script.js` under the Typewriter section.
- **Theme Colors**: Modify CSS variables in `styles.css` to match your brand.
- **Skill Items & Projects**: Edit the HTML in `index.html` to add or remove entries.
- **Background Particles**: Tweak particle density or color in `initParticles()` inside `script.js`.

---

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests for bug fixes and feature enhancements.

1. Fork the repo
2. Create a new branch (`git checkout -b feature/my-feature`)
3. Commit your changes (`git commit -m 'Add my feature'`)
4. Push to the branch (`git push origin feature/my-feature`)
5. Open a Pull Request

---

## License

This project is licensed under the [MIT License](LICENSE).

---

© 2025 Kimathi Elikplim Sedegah. All rights reserved.

