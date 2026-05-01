# Game Veda Website

Production-ready static website for **Game Veda**, built with:
- HTML5
- Tailwind CSS (CDN)
- Custom CSS + JavaScript animations

## Project Structure

```text
game_veda_cafe/
├── index.html
├── src/
│   ├── css/
│   │   └── styles.css
│   └── js/
│       └── main.js
└── README.md
```

## Animation Approach

- Smooth scroll reveal animations with `IntersectionObserver`
- Lightweight 3D hover tilt on hero card
- Soft hover motion on buttons and cards
- `prefers-reduced-motion` support for accessibility and stability

Animations are intentionally clean and smooth (not overly high-tech), suitable for broad device compatibility.

## Hostinger Deployment

This is a static website and can be hosted directly.

1. Zip project files (`index.html`, `src/`, and any assets).
2. In Hostinger hPanel, open **File Manager**.
3. Upload and extract files inside `public_html/`.
4. Ensure `index.html` is in the root of `public_html/`.
5. Open domain URL and hard refresh (`Ctrl + F5`) after deploy.

## Local Preview

Open `index.html` directly in browser, or serve with any local static server.

## Stability Notes

- No build step required (good for shared hosting).
- No heavy animation library dependency.
- JavaScript is defensive for missing elements.
- Reduced-motion media query avoids animation-related UX issues.
