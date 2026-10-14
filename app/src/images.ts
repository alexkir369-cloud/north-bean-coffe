const base = `${import.meta.env.BASE_URL}images/`;

// Widths produced by `npm run images` (scripts/resize-images.mjs).
const SIZES = [480, 800];

/** src + srcSet for a photo in public/images; `width` is the original's pixel width. */
export const photo = (name: string, width: number) => ({
  src: `${base}${name}.webp`,
  srcSet: [...SIZES.filter((w) => w < width).map((w) => `${base}${name}-${w}.webp ${w}w`), `${base}${name}.webp ${width}w`].join(', '),
});

export const imageUrl = (file: string) => `${base}${file}`;
