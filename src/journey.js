export const clamp01 = value => Math.min(1, Math.max(0, value));
export const ease = value => { const t = clamp01(value); return t * t * (3 - 2 * t); };
export function journeyState(progress, aspect = 1.6, motion = true) {
  const p = clamp01(progress);
  const mobile = aspect < .95;
  const approach = ease((p - .12) / .88);
  const cameraT = motion ? approach : 0;
  const narrowFit = Math.max(1, .75 / Math.max(.3, aspect));
  const wide = mobile ? [3.6, 8, 23 * narrowFit] : aspect < 1.35 ? [4.4, 7, 17] : [4.5, 6.5, 13];
  const close = mobile ? [.15, 3.4, 9 * narrowFit] : [.12, 2.4, 5.9];
  const mix = (a,b) => a.map((n,i) => n + (b[i] - n) * cameraT);
  return {
    position: mix(wide, close),
    target: mix([0, 1.35, 0], [0, 1.17, -.5]),
    screen: motion ? ease((p - .48) / .24) : Number(p >= .6),
    copy: 1 - ease((p - .06) / .23),
    reveal: ease((p - .71) / .2),
    chapter: p < .28 ? 0 : p < .7 ? 1 : 2,
    hotspots: p < .66,
  };
}
