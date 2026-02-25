# Zero Clarity — B.Tech Final Year Projects

![Zero Clarity Showcase](https://budurusreemohanesh-cmyk.github.io/ZeroClarity/media__1772039982873.png)

**Zero Clarity** (formerly ProjectForge) is a premium, static website serving as a portfolio and service platform for B.Tech Final Year Project development. It targets students in domains like IoT, AI, Web Development, Embedded Systems, and Machine Learning.

**🌍 Live Demo:** [Zero Clarity on GitHub Pages](https://budurusreemohanesh-cmyk.github.io/ZeroClarity)

## ✨ Core Features

- **Awwwards-Winning Design Aesthetics:** Premium dark-themed UI paired with vibrant cyan accents, utilizing glassmorphism and subtle glowing elements.
- **GSAP Powered Animations:** Fluid, stagger-based scroll reveals, timeline animations for the portfolio filtering, and SVG vector animations.
- **Lenis Smooth Scrolling:** Custom smooth scrolling physics perfectly synced with GSAP's `ScrollTrigger` architecture.
- **GPU-Accelerated Scroll Indicator:** A dynamic progress bar embedded inside the glass navbar that accurately tracks the user's scroll depth.
- **Zero Frameworks:** Built purely with modern HTML5, CSS3 Variables, and vanilla ES6 JavaScript to guarantee blazing-fast performance without React or Vue overhead.

## 🛠️ Stack & Libraries

- **HTML5 / CSS3** (Vanilla, heavily utilizing native CSS Custom Properties for theming)
- **Vanilla JavaScript** (ES6+)
- **GSAP 3.12** (GreenSock Animation Platform) + **ScrollTrigger**
- **Lenis Scroll** (For hijacked smooth-scrolling interpolation)

## 🚀 Local Development

To run this project locally, you don't need any complex build tools. A simple local web server will do!

1.  **Clone the Repository**

    ```bash
    git clone https://github.com/budurusreemohanesh-cmyk/ZeroClarity.git
    cd ZeroClarity
    ```

2.  **Install Dependencies** (For the local server and deployment scripts)

    ```bash
    npm install
    ```

3.  **Run the Local Server**
    ```bash
    npm start
    ```
    _The website will now run at `http://localhost:3000`._

## 📦 Deployment (GitHub Pages)

Deployment is handled natively via the `gh-pages` npm package. When you are ready to publish changes:

1.  Run the deploy script:
    ```bash
    npm run deploy
    ```
2.  In your GitHub Repository Settings > Pages, ensure the source is set to deploy from the `gh-pages` branch.

## 📁 Directory Structure

```text
/
├── css/
│   ├── global.css      # Resets, typography, utilities
│   ├── sections.css    # Layout and component-specific styles
│   └── variables.css   # Color palette and theme tokens
├── js/
│   ├── counters.js           # Animated number counters
│   ├── lenis-init.js         # Smooth scrolling configuration
│   ├── main.js               # Portfolio filtering, nav logic
│   ├── parallax.js           # Hero area depth effects
│   ├── scroll-animations.js  # GSAP ScrollTrigger intersection observer
│   └── svg-animations.js     # Decorative SVG animations
├── index.html          # Main HTML entrypoint
├── package.json        # NPM scripts and dependencies
└── README.md
```

## ⚖️ License

&copy; 2025 Zero Clarity. All rights reserved.
