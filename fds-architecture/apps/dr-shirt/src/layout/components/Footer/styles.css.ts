import { colors } from '@/shared/styles/colors.css';
import { flexColumnCenter } from '@/shared/styles/grid-system.css';
import { style } from '@vanilla-extract/css';

export const footer = style({
  textAlign: 'center',
  borderTop: `3px solid ${colors.primary}`,
});

export const container = style([
  flexColumnCenter,
  {
    padding: '1rem',
    color: '#666',
    fontSize: '0.9rem',
  },
]);
