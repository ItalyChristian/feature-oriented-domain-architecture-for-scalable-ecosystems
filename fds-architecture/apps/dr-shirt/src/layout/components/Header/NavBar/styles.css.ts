import { colors } from '@/shared/styles/colors.css';
import { style } from '@vanilla-extract/css';

export const nav = style({
  padding: '10px 0',
  backdropFilter: 'blur(10px)',
});

export const ul = style({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  gap: '5px',
});

export const a = style({
  padding: '10px 18px',
  fontFamily: 'Courier New',
  fontSize: '0.8rem',
  textTransform: 'uppercase',
  letterSpacing: '1px',
  borderRadius: '4px',
  transition: '0.2s',

  ':hover': {
    background: colors.primary,
    color: 'white',
  },
});
