import { useState } from 'react';

interface ResilientImageProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  priority?: boolean;
  fallbackTitle?: string;
}

export function ResilientImage({
  src,
  alt,
  className = 'w-full h-full object-cover',
  containerClassName = '',
  priority = false,
  fallbackTitle = 'Cartide Bar Scents',
}: ResilientImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`relative flex flex-col items-center justify-center bg-gradient-to-br from-[#EDE9E0] via-[#E4DEC9] to-[#D8CDBB] text-[#5A554E] p-6 text-center ${containerClassName}`}
      >
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          aria-hidden="true"
          className="mb-3 text-[#8C6A43]"
        >
          <rect x="4" y="8" width="24" height="16" rx="2" stroke="currentColor" strokeWidth="1.25" />
          <path d="M8 14H24" stroke="currentColor" strokeWidth="1" />
          <circle cx="16" cy="19" r="2" stroke="currentColor" strokeWidth="1" />
        </svg>
        <span className="font-display text-lg tracking-wide text-[#161412]">{fallbackTitle}</span>
      </div>
    );
  }

  return (
    <div className={`overflow-hidden bg-[#EDE9E0] ${containerClassName}`}>
      <img
        src={src.startsWith('/src/assets/') ? `${import.meta.env.BASE_URL}${src.slice(1)}` : src}
        alt={alt}
        referrerPolicy="no-referrer"
        loading={priority ? 'eager' : 'lazy'}
        onError={() => setHasError(true)}
        className={className}
      />
    </div>
  );
}
