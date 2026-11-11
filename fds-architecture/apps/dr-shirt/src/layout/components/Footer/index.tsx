import { Box } from '@radix-ui/themes';

import * as styles from './styles.css';

export const Footer = () => {
  return (
    <footer
      style={{
        borderTop: '3px solid #b22222',
        textAlign: 'center',
        background: 'var(--gray-a2)',
      }}>
      <div className={styles.container}>
        <p>
          © 2026 <strong>Dr. Shirt</strong> - A loja que é um estilo de vida.
        </p>
        <p style={{ color: '#444' }}>Rua do Rock, 666 · São Paulo · SP</p>
      </div>
      <Box style={{ textAlign: 'right', color: '#444' }}>
        <small>Powered by GO!ON Development</small>
      </Box>
    </footer>
  );
};
