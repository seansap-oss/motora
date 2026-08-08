import React from "react";

const S = (children: React.ReactNode) => (
  <svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor">
    {children}
  </svg>
);

/**
 * Extended India-market brand marks. These are original, simplified geometric
 * glyphs used as catalogue tiles — not reproductions of registered logos.
 */
export const BRAND_SVGS_EXTRA: Record<string, React.ReactNode> = {
  // --- Cars -----------------------------------------------------------------
  marutisuzuki: S(<path d="M12 3L4 8v8l8 5 8-5V8l-8-5zm0 2.6l5.6 3.5L12 12.6 6.4 9.1 12 5.6zM6 10.9l5 3.1v4.6l-5-3.1v-4.6zm12 4.6l-5 3.1V14l5-3.1v4.6z" />),
  suzuki: S(<path d="M3 12l4.5-7h3L6 12l4.5 7h-3L3 12zm10.5-7h3L21 12l-4.5 7h-3L18 12l-4.5-7z" />),
  kia: S(<path d="M2 9h3.4l1.6 4.2L8.6 9H12l-3.2 7H5.2L2 9zm11 0h3v7h-3V9zm4.5 0H21l-2.6 3.5L21 16h-3.5l-2-3.5L17.5 9z" />),
  mg: S(<path d="M2 8h3l2 4 2-4h3v8H9.5v-4.4L7.6 15h-1L4.5 11.6V16H2V8zm11.5 4a4 4 0 014-4H21v2.2h-3.5a1.8 1.8 0 100 3.6H19v-1h-1.5v-1.8H21V16h-3.5a4 4 0 01-4-4z" />),
  volkswagen: S(<path d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 2a8 8 0 018 8 8 8 0 01-8 8 8 8 0 01-8-8 8 8 0 018-8zm-4.6 4l2.2 6h1.4l1-3 1 3h1.4l2.2-6h-1.6l-1.3 3.8L12.4 8h-.8l-1.3 3.8L9 8H7.4z" />),
  skoda: S(<path d="M12 2L3 6v6c0 5 3.9 8.6 9 10 5.1-1.4 9-5 9-10V6l-9-4zm0 2.2l7 3.1V12c0 3.9-2.9 6.7-7 7.9C7.9 18.7 5 15.9 5 12V7.3l7-3.1zm-3 4.3l6 1.8-6 1.8V8.5z" />),
  renault: S(<path d="M12 2L5 12l7 10 7-10-7-10zm0 3.6L16.5 12 12 18.4 7.5 12 12 5.6z" />),
  nissan: S(<path d="M12 4a8 8 0 100 16 8 8 0 000-16zm0 2a6 6 0 110 12 6 6 0 010-12zM6 11h12v2H6v-2z" />),
  jeep: S(<path d="M3 9h18v6H3V9zm2 2v2h2v-2H5zm4 0v2h2v-2H9zm4 0v2h2v-2h-2zm4 0v2h2v-2h-2zM6 6h12v2H6V6zm0 10h12v2H6v-2z" />),
  citroen: S(<path d="M12 3l6 4-1.6 1.7L12 5.6 7.6 8.7 6 7l6-4zm0 8.2l6 4-1.6 1.7L12 13.8l-4.4 3.1L6 15.2l6-4z" />),
  mercedesbenz: S(<path d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 2a8 8 0 018 8 8 8 0 01-8 8 8 8 0 01-8-8 8 8 0 018-8zm-.9 2v5.3L6.8 15A7 7 0 0111.1 6zm1.8 0A7 7 0 0117.2 15l-4.3-3.7V6zM8 16.3l4-2.6 4 2.6A7 7 0 018 16.3z" />),
  audi: S(<path d="M6 8a4 4 0 100 8 4 4 0 000-8zm4.5 0a4 4 0 100 8 4 4 0 000-8zm4.5 0a4 4 0 100 8 4 4 0 000-8zM6 10a2 2 0 110 4 2 2 0 010-4zm4.5 0a2 2 0 110 4 2 2 0 010-4zm4.5 0a2 2 0 110 4 2 2 0 010-4z" />),
  lexus: S(<path d="M12 3l8 9-8 9-8-9 8-9zm0 3.2L6.7 12 12 17.8 17.3 12 12 6.2z" />),
  landrover: S(<path d="M2 9h20v6H2V9zm2 2v2h4v-2H4zm6 0v2h4v-2h-4zm6 0v2h4v-2h-4z" />),
  volvo: S(<path d="M12 4a8 8 0 100 16 8 8 0 000-16zm0 2a6 6 0 110 12 6 6 0 010-12zM8.5 9l2.5 6h2l2.5-6h-1.8L12 12.8 10.3 9H8.5z" />),
  byd: S(<path d="M3 7h6a3 3 0 010 6H5v4H3V7zm2 2v2h4a1 1 0 000-2H5zm8-2h5a4 4 0 010 8h-5V7zm2 2v4h3a2 2 0 000-4h-3z" />),

  // --- Bikes ----------------------------------------------------------------
  yamaha: S(<path d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 2a8 8 0 018 8 8 8 0 01-8 8 8 8 0 01-8-8 8 8 0 018-8zm0 2.6L7.8 15h1.9L12 10.3 14.3 15h1.9L12 6.6z" />),
  bajaj: S(<path d="M3 6h7a3.5 3.5 0 012.4 6 3.5 3.5 0 01-2.4 6H3V6zm2.2 2v3H10a1.5 1.5 0 000-3H5.2zm0 5v3H10a1.5 1.5 0 000-3H5.2zM15 18l4-12h2.2l-4 12H15z" />),
  ktm: S(<path d="M2 7h3v3.4L7.6 7h3.6l-3.9 4.6L11.4 17H7.8L5 13.4V17H2V7zm10.5 0h8v2.4h-2.6V17h-3V9.4H12.5V7z" />),
  jawayezdi: S(<path d="M12 2L3 7v10l9 5 9-5V7l-9-5zm0 2.6l6.6 3.7v7.4L12 19.4 5.4 15.7V8.3L12 4.6z" />),
  harleydavidson: S(<path d="M12 3l9 6-9 12L3 9l9-6zm0 3L6.4 9.7 12 17.3l5.6-7.6L12 6z" />),
  kawasaki: S(<path d="M3 7h3v3.2L9.4 7h3.8l-4.4 4.4L13.4 17H9.6L6 13v4H3V7zm12 0h6v2.2h-3.4v1.6H21V13h-3.4v1.8H21V17h-6V7z" />),
  ducati: S(<path d="M4 6h8a6 6 0 010 12H4V6zm2.4 2.3v7.4H12a3.7 3.7 0 000-7.4H6.4z" />),
  triumph: S(<path d="M2 7h20v2.4h-8.6V17h-2.8V9.4H2V7z" />),

  // --- Scooters / EV --------------------------------------------------------
  ather: S(<path d="M12 3L3 20h3.6l1.6-3.4h7.6L17.4 20H21L12 3zm0 4.8l2.6 5.6H9.4L12 7.8z" />),
  olaelectric: S(<path d="M8 4a6 6 0 100 12A6 6 0 008 4zm0 2.4A3.6 3.6 0 118 13.6 3.6 3.6 0 018 6.4zM15 4h2.4v9.4H22V16h-7V4z" />),
  ola: S(<path d="M8 4a6 6 0 100 12A6 6 0 008 4zm0 2.4A3.6 3.6 0 118 13.6 3.6 3.6 0 018 6.4zM15 4h2.4v9.4H22V16h-7V4z" />),
  vida: S(<path d="M2 6h2.8l2.6 8 2.6-8H13l-4 12H6L2 6zm12 0h2.6v12H14V6zm4.4 0H22l-1.6 12h-2.4L18.4 6z" />),
  ampere: S(<path d="M13 2L5 13h5l-1 9 8-11h-5l1-9z" />),
  okinawa: S(<path d="M12 3a9 9 0 100 18 9 9 0 000-18zm0 2.4a6.6 6.6 0 110 13.2 6.6 6.6 0 010-13.2zm0 2.6a4 4 0 100 8 4 4 0 000-8z" />),
  tvsiqube: S(<path d="M2 8h20v3h-9v5h-2v-5H2V8zm0-4h20v3H2V4z" />),
  piaggio: S(<path d="M4 6h6.4a4 4 0 010 8H6.4v4H4V6zm2.4 2.2v3.6h4a1.8 1.8 0 000-3.6h-4zM16 6h2.4v12H16V6z" />),
  vespa: S(<path d="M6 14a4 4 0 108 0 4 4 0 00-8 0zm4-2a2 2 0 110 4 2 2 0 010-4zM4 8h5l2 3H6.6L4 8zm11 0h4l1 6h-2.4L15 8z" />),
  aprilia: S(<path d="M12 3L4 19h3l1.4-3h7.2l1.4 3h3L12 3zm0 4.6l2.4 5.4H9.6L12 7.6z" />),

  // --- Commercial -----------------------------------------------------------
  ashokleyland: S(<path d="M2 10h13V7l7 5-7 5v-3H2v-4z" />),
  eicher: S(<path d="M3 6h9v2.4H5.6v2.4H11v2.4H5.6v2.4H12V18H3V6zm11 0h2.6v12H14V6zm4 0h3v12h-3V6z" />),
  forcemotors: S(<path d="M3 6h8v2.4H5.6v2.6H10v2.4H5.6V18H3V6zm10 0h8v2.4h-5.4v2.6H20v2.4h-4.4V18H13V6z" />),
  montraelectric: S(<path d="M2 6h3l2.6 5L10 6h3v12h-2.6v-7l-2 4h-1.6l-2-4v7H2V6zm14 0h2.6v9.4H22V18h-6V6z" />),
  sonalika: S(<path d="M6 15a3 3 0 106 0 3 3 0 00-6 0zm3-1.2a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4zM3 8h11l3 4h3v4h-2a4 4 0 00-8 0H8a4 4 0 00-4-4V8z" />),
  swaraj: S(<path d="M3 7h7a3 3 0 012.6 4.5A3 3 0 0110 17H3V7zm2.4 2.2v2h4.2a1 1 0 000-2H5.4zm0 4.2v1.6h4.4a.8.8 0 000-1.6H5.4zM15 7h2.4l3.6 10h-2.6l-.7-2h-3.2l-.7 2H11L15 7z" />),
  johndeere: S(<path d="M12 3l3 4.5h-2v3h4l1.5 2.5H13v3h2L12 21l-3-5h2v-3H4.5L6 10.5h5v-3H9L12 3z" />),
  mahindratruck: S(<path d="M2 11h12V8l6 4-6 4v-3H2v-2z" />),

  // --- Cycles / e-bikes -----------------------------------------------------
  firefox: S(<path d="M12 3c3 2.5 4.5 5 4.5 7.5a4.5 4.5 0 01-9 0C7.5 8 9 5.5 12 3zm0 3.4c-1.4 1.5-2.2 3-2.2 4.1a2.2 2.2 0 004.4 0c0-1.1-.8-2.6-2.2-4.1zM5 17h14v2.4H5V17z" />),
  trek: S(<path d="M2 7h20l-4 10H6L2 7zm3.2 2.4l2.4 5.2h8.8l2-5.2H5.2z" />),
  herolectro: S(<path d="M13 2L5 13h5l-1 9 8-11h-5l1-9zM3 18h5v2.4H3V18zm13 0h5v2.4h-5V18z" />),
  lectro: S(<path d="M3 6h2.8v9.4H11V18H3V6zm11 0h7v2.4h-4.2v2.4H21v2.4h-4.2v2.4H21V18h-7V6z" />),
  btwin: S(<path d="M3 6h6a3 3 0 012.4 4.8A3.2 3.2 0 019 17H3V6zm2.4 2.2v2.2h3.4a1.1 1.1 0 000-2.2H5.4zm0 4.3v2.3h3.5a1.15 1.15 0 000-2.3H5.4zM14 6h2.5l1.6 6.6L19.7 6H22l-2.8 11h-2.6L14 6z" />),
  hercules: S(<path d="M4 6h2.6v4.4h4.8V6H14v12h-2.6v-5.2H6.6V18H4V6zm12 0h5.4v2.4H18.6v2.2H21v2.4h-2.4v2.6H22V18h-6V6z" />),
  avoncycles: S(<path d="M8.5 3L2 18h2.8l1.2-3h5l1.2 3H15L8.5 3zm0 4.6L10.2 12H6.8l1.7-4.4zM16 3h2.6l1.7 10.4L22 3h-2.2l-1.1 7.4L17.5 3H16z" />),
  atlas: S(<path d="M12 3L4 18h2.9l1.5-3h7.2l1.5 3H20L12 3zm0 4.4l2.4 5.2H9.6L12 7.4z" />),
  ninetyone: S(<path d="M4 6h3l3 5V6h2.6v12H9.6l-3-5v5H4V6zm12 0h2.6v12H16v-9.6h-2V6h2z" />),
  emotorad: S(<path d="M3 6h8v2.4H5.6v2.2H10v2.4H5.6v2.6H11V18H3V6zm10.5 0h2.4l2.1 5.4L20 6h2.4l-3.6 12h-2.2l-3.1-12z" />),
  motovolt: S(<path d="M2 6h3l2.5 5L10 6h3v12h-2.5v-7L8 15H6.6l-2-4v7H2V6zm14.5 0H19l2.5 12H19l-.4-2.4h-2.2L16 18h-2.5L16.5 6z" />),
  cannondale: S(<path d="M6 15a3.5 3.5 0 107 0 3.5 3.5 0 00-7 0zm3.5-1.4a1.4 1.4 0 110 2.8 1.4 1.4 0 010-2.8zM4 7h6l4 6h-3L8.5 9.4 4 7zm12 0h4v2h-2.6l1.4 4h-2.4L15 9l1-2z" />),
  giant: S(<path d="M12 4a8 8 0 108 8h-2.4a5.6 5.6 0 11-1.7-4L14 10h6V4l-2.1 2.1A8 8 0 0012 4z" />),
};
