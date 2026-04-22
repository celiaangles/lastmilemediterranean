export function ArrowUpRight({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M3 11L11 3M11 3H5M11 3V9"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function PlusIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M9 3.75V14.25M3.75 9H14.25"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function MinusIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M3.75 9H14.25"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function FacebookIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" />
    </svg>
  );
}

export function InstagramIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function LogoLMM({ className = "" }: { className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/logo.png"
      alt="Last Mile Mediterranean"
      className={className}
    />
  );
}

export function VanIcon({
  highlighted = false,
  className = "",
}: {
  highlighted?: boolean;
  className?: string;
}) {
  const stroke = highlighted ? "var(--brand-blue)" : "#9fa0a5";
  const bodyFill = highlighted ? "rgba(26,90,255,0.08)" : "transparent";
  return (
    <svg
      className={className}
      viewBox="0 0 160 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Cargo box */}
      <path
        d="M10 30 L90 30 L90 78 L10 78 Z"
        stroke={stroke}
        strokeWidth="2.2"
        fill={bodyFill}
        strokeLinejoin="round"
      />
      {/* Cab */}
      <path
        d="M90 42 L118 42 L138 58 L138 78 L90 78 Z"
        stroke={stroke}
        strokeWidth="2.2"
        fill={bodyFill}
        strokeLinejoin="round"
      />
      {/* Windshield */}
      <path
        d="M95 46 L115 46 L130 58 L95 58 Z"
        stroke={stroke}
        strokeWidth="1.6"
        fill="transparent"
      />
      {/* Wheels */}
      <circle
        cx="32"
        cy="82"
        r="8"
        stroke={stroke}
        strokeWidth="2"
        fill={highlighted ? "var(--brand-blue)" : "#0a0a0a"}
      />
      <circle cx="32" cy="82" r="3" fill="#0a0a0a" />
      <circle
        cx="118"
        cy="82"
        r="8"
        stroke={stroke}
        strokeWidth="2"
        fill={highlighted ? "var(--brand-blue)" : "#0a0a0a"}
      />
      <circle cx="118" cy="82" r="3" fill="#0a0a0a" />
      {/* Roof line */}
      <path
        d="M10 30 L10 22 L86 22 L90 30"
        stroke={stroke}
        strokeWidth="1.6"
        fill="transparent"
      />
    </svg>
  );
}
