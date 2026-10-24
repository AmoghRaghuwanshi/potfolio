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
