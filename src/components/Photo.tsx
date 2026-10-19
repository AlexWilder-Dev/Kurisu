import type { CSSProperties } from 'react';
import { photos, type PhotoId } from '../data/kurisu';
import { asset } from '../lib/asset';

type Props = {
  id: PhotoId;
  sizes?: string;
  className?: string;
  style?: CSSProperties;
  eager?: boolean;
};

export function Photo({ id, sizes = '(min-width: 900px) 40vw, 92vw', className, style, eager }: Props) {
  const p = photos[id];
  const big = Math.min(1280, p.w);
  const base = asset(`img/${id}`);
  return (
    <picture>
      <source type="image/webp" srcSet={`${base}-640.webp 640w, ${base}-1280.webp ${big}w`} sizes={sizes} />
      <img
        src={`${base}-1280.jpg`}
        srcSet={`${base}-640.jpg 640w, ${base}-1280.jpg ${big}w`}
        sizes={sizes}
        alt={p.alt}
        width={p.w}
        height={p.h}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        className={className}
        style={style}
      />
    </picture>
  );
}
