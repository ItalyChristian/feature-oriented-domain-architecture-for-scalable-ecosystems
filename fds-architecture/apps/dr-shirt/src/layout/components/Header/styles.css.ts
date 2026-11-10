import { mediaQueries } from '@/shared/styles/breakpoints';
import { colors } from '@/shared/styles/colors.css';
import { style } from '@vanilla-extract/css';

export const header = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '1.5rem',
  padding: '4.2rem 7rem 2rem 7rem',
  borderBottom: '5px solid #b22222',
  background: 'linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.8))',
  backgroundSize: 'cover',
  backgroundPosition: 'center 30%',
});

export const headerContent = style({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  justifyContent: 'space-between',
  '@media': {
    [mediaQueries.smartphone]: {
      flexDirection: 'column',
      gap: '20px',
    },
  },
});

export const title = style({
  color: 'white',
  fontFamily: 'Georgia',
  fontSize: '3rem',
  fontWeight: 700,
  letterSpacing: '5px',
  textShadow: '3px 3px 0 #b22222',
});

export const description = style({
  color: '#ccc',
  fontFamily: 'Courier New',
  fontSize: '0.8rem',
  textTransform: 'uppercase',
  letterSpacing: '4px',
});

export const headerActions = style({
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
});

export const link = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  padding: '10px 20px',
  fontWeight: 'bold',
  border: `1px solid ${colors.primary}`,
  borderRadius: '30px',
  background: ' rgba(255,255,255,0.1)',
  backdropFilter: 'blur(5px)',
  transition: '0.3s',

  ':hover': {
    background: colors.primary,
    borderColor: 'white',
  },
});
