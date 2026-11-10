import { useId, type SVGProps } from 'react';

type BoltGradientIconProps = SVGProps<SVGSVGElement>;

export const BoltGradientIcon = ({
  'aria-hidden': ariaHidden = true,
  ...props
}: BoltGradientIconProps) => {
  const gradientId = `bolt-gradient-${useId().replaceAll(':', '')}`;

  return (
    <svg
      aria-hidden={ariaHidden}
      viewBox='0 0 320 512'
      fill={`url(#${gradientId})`}
      {...props}>
      <defs>
        <linearGradient id={gradientId} x1='0%' y1='0%' x2='100%' y2='0%'>
          <stop offset='0%' stopColor='rgba(178, 34, 34, 1)' />
          <stop offset='50%' stopColor='rgba(227, 112, 30, 1)' />
          <stop offset='100%' stopColor='rgba(237, 215, 12, 1)' />
        </linearGradient>
      </defs>
      <path d='M296 160H180.6l42.6-129.8C227.2 15 215.7 0 200 0H56C44 0 33.8 8.9 32.2 20.8l-32 240C-1.7 275.2 9.5 288 24 288h118.7L96.6 482.5c-3.6 15.2 8 29.5 23.3 29.5 8.4 0 16.4-4.4 20.8-12l176-304c9.3-15.9-2.2-36-20.7-36z' />
    </svg>
  );
};
