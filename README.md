# Paradise Nursery

A responsive houseplant shopping experience built with React, Vite, React Router, and Redux Toolkit.

## Features

- Landing page with a botanical background, company introduction, and **Get Started** link.
- Plant catalog with 18 products across three categories.
- Add-to-cart buttons become disabled after a plant is added.
- Shared navigation with a live cart item badge.
- Cart quantity increase/decrease, remove item, clear cart, line totals, and order total.
- Checkout demo message ("Coming Soon").
- Responsive layout for desktop and mobile.

## Run locally

Requirements: Node.js 18+ and npm.

```bash
npm install
npm run dev
```

Open the local URL printed by Vite.

## Build

```bash
npm run build
npm run preview
```

## Publish to GitHub Pages

1. Create a **public** GitHub repository named `paradise-nursery` (or your chosen name).
2. Push this project to the repository.
3. If the repository is a project repository (not `YOURNAME.github.io`), edit `vite.config.js` and set `base` to `'/YOUR-REPOSITORY-NAME/'`, including both slashes.
4. In the repository settings, open **Pages** and choose **GitHub Actions** as the build and deployment source, or deploy using the `gh-pages` package below.
5. For package deployment, install dependencies and run:

```bash
npm run deploy
```

6. In GitHub repository **Settings → Pages**, choose the `gh-pages` branch if prompted.

If using `npm run deploy`, make sure `vite.config.js` has the correct `base` before building. The `deploy` script builds the site and publishes `dist/`.

## Files requested by the project rubric

- `README.md` — project overview and setup
- `src/pages/AboutUs.jsx` — company introduction
- `src/App.css` — landing background and application styling
- `src/App.jsx` — landing page and route setup
- `src/features/cart/CartSlice.jsx` — Redux Toolkit cart slice
- `src/pages/ProductList.jsx` — categorized plant listing and add-to-cart controls
- `src/pages/CartItem.jsx` — cart display, quantity controls, totals, deletion, and checkout demo

## Notes

Plant photographs are loaded from Unsplash URLs, so an internet connection is needed to display them. This is a front-end demonstration; checkout does not process payments.
