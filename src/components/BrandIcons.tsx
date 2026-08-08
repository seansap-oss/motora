import React from 'react';

export const BRAND_SVGS: Record<string, React.ReactNode> = {
  maruti: (
    <svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor">
      <path d="M12 2L2 8.5v7L12 22l10-6.5v-7L12 2zm0 3.2l6.8 4.4-6.8 4.4-6.8-4.4L12 5.2zM4 10.2l6.8 4.4v6.8L4 14.6v-4.4zm16 4.4l-6.8 6.8v-6.8l6.8-4.4v4.4z"/>
    </svg>
  ),
  tata: (
    <svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor">
      <path d="M2 6h20v3H13v9h-2V9H2V6zm4-3h12v2H6V3z"/>
    </svg>
  ),
  mahindra: (
    <svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor">
      <path d="M12 3L2 12h3v9h14v-9h3L12 3zm0 3.8l5 4.5v7.7H7v-7.7l5-4.5z"/>
    </svg>
  ),
  hyundai: (
    <svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-6H7v6H5V7h2v4h4V7h2v10zm6 0h-2l-3-5v5h-2V7h2l3 5V7h2v10z"/>
    </svg>
  ),
  honda: (
    <svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor">
      <path d="M3 4h3v16H3V4zm12 0h3v16h-3V4zm-6 0h3v16H9V4z"/>
    </svg>
  ),
  royalenfield: (
    <svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor">
      <path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.8l7 3.5v7.4l-7 3.5-7-3.5V8.3l7-3.5z"/>
    </svg>
  ),
  tvs: (
    <svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor">
      <path d="M2 8h20v3H13v5h-2v-5H2V8zm0-4h20v3H2V4z"/>
    </svg>
  ),
  hero: (
    <svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor">
      <path d="M12 2L4 10h5v12h6V10h5L12 2z"/>
    </svg>
  ),
  toyota: (
    <svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor">
      <path d="M12 2C6.48 2 2 5.58 2 10c0 4.42 4.48 8 10 8s10-3.58 10-8c0-4.42-4.48-8-10-8zm0 14c-4.41 0-8-2.69-8-6s3.59-6 8-6 8 2.69 8 6-3.59 6-8 6z"/>
    </svg>
  ),
  bmw: (
    <svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none"/>
      <path d="M12 2v20M2 12h20"/>
    </svg>
  ),
  default: (
    <svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor">
      <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/>
    </svg>
  )
};

export const BrandIcon = ({ name, size = 32 }: { name: string; size?: number }) => {
  const key = name.toLowerCase().replace(/[^a-z0-9]/g, '');
  const svg = BRAND_SVGS[key] || BRAND_SVGS.default;
  return <div style={{ width: size, height: size, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>{svg}</div>;
};
