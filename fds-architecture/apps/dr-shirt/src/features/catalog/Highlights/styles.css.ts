import { mediaQueries } from '@/shared/types/breakpoints';
import { style } from '@vanilla-extract/css';

export const title = style({
  display: 'flex',
  alignItems: 'center',
  marginInline: '8rem',
  paddingTop: '2rem',
  paddingBottom: '10px',
  gap: '0.5rem',
  color: '#b22222',
  fontSize: '2rem',
  fontFamily: 'Georgia',
  borderBottom: '2px dashed #b22222',

  '@media': {
    [mediaQueries.smartphone]: {
      marginInline: '4rem',
    },
  },
});

export const cardsContainer = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '2rem',
  padding: '2rem',

  '@media': {
    [mediaQueries.smartphone]: {
      flexDirection: 'column',
      paddingInline: '4rem',
    },
  },
});
