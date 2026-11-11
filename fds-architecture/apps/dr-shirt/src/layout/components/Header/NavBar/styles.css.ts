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
  listStyle: 'none',
});

export const a = style({
  padding: '10px 18px',
  color: 'white',
  fontFamily: 'Courier New',
  fontSize: '0.8rem',
  textTransform: 'uppercase',
  letterSpacing: '1px',
  borderRadius: '4px',
  transition: '0.2s',
  textDecoration: 'none',

  ':hover': {
    background: colors.primary,
    color: 'white',
  },
});
