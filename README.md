# Amogh — A different perspective

A local Vite / Three.js portfolio inspired by the supplied Instagram reel: warm paper, editorial typography, a personal 3D workspace, and dark olive / gold sections.

## Run

```powershell
npm install
npm run dev
```

`npm run build` creates `dist/`. `npm run preview` serves the production build. `npm run check` checks JavaScript syntax and runs camera-journey regression tests.

## Personal content and artwork

Edit `src/profile.js`. Professional details come from the supplied résumé. AgriConnect is described as a five-person team project; the second project is this portfolio. The PDF is `public/Amogh_Raghuwanshi_Resume.pdf`.

The portrait in `public/portraits/amogh-studio.png` was generated using the four professional photos in `Eleven Lab images` as face references. It is a transparent photographic plane within the real-time 3D scene, and also appears in About. The desk, laptop, notebook, folder, trophy, lamp, cup, and glass keepsake are procedural 3D objects. The laptop displays a capture of the actual AgriConnect homepage from `public/projects/agriconnect-screen.png`.

## Interaction decisions

- Native document scrolling drives a reversible camera journey toward the laptop. No wheel interception or scroll locking.
- Notebook opens the résumé, folder jumps to projects, and trophy opens achievements. Mobile provides a separate row of touch controls.
- Screen content wipes into AgriConnect without blending two text layers.
- The camera adapts to narrow aspect ratios, with scene dimensions explicitly reserved to prevent canvas collapse.
- Motion toggle and system reduced-motion preference are supported. Toggling motion preserves document height.
- Rendering pauses offscreen or when the page is hidden. WebGL failures show a portrait fallback with accessible links.
- Native dialogs support Escape and restore focus. Fonts are self-hosted.
- The requested rotatable project-device gallery was excluded.

## Reference and status

Reference: https://www.instagram.com/reel/DeHrqz_o9g7/

The reel capture is `reference/reel-frame.png`. This is a local adaptation, not a frame-perfect reproduction. The generated portrait and the four authorized enhancements are integrated. No public deployment has been made. See `reference/verification.md` for checks and screenshots.

## Hosting and resume updates

Build with npm run build and publish the dist directory using a static host. Asset and resume URLs are relative, so the site supports a domain root or a repository subdirectory. GitHub repository upload alone does not enable website hosting. To update the resume, replace public/Amogh_Raghuwanshi_Resume.pdf with the new PDF, keeping its filename, then rebuild and redeploy. All resume buttons use that same file.

## Netlify deployment

Import `AmoghRaghuwanshi/potfolio` into Netlify and select the `main` branch. The root `netlify.toml` supplies the build command (`npm run check && npm run build`), publish directory (`dist`), Node version (`24`), and functions directory (`netlify/functions`). No environment variables or API keys are required.

Use Git-connected builds so Netlify deploys both the site and the function. Uploading only `dist` manually will not include the function. Future pushes to the connected production branch can trigger new deployments.

The website's resume buttons open `/Amogh_Raghuwanshi_Resume.pdf` directly. The Netlify-only endpoint `/api/resume` redirects GET and HEAD requests to the same PDF. The PDF is configured to open inline and revalidate its cache, so replacing it under the same filename does not require changing every link. Hashed JavaScript, CSS, and font assets use long-lived caching.

The contact button opens the visitor's email app; there is no server-side email service to configure. The site uses hash navigation (`#work`, `#about`, `#contact`), so it does not need a catch-all rewrite that could mask missing PDF or image files.

After deployment, check the homepage, the resume buttons, and `/api/resume` on the live Netlify URL. Local `npm run dev` serves the direct PDF, but does not execute Netlify Functions. `npm run check` validates the function handler and the included PDF locally.

Configuration reference: https://docs.netlify.com/build/configure-builds/file-based-configuration/
