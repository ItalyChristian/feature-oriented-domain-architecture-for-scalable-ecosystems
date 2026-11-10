import { Heading } from '@radix-ui/themes';
import { BiSearchAlt } from 'react-icons/bi';
import { FaShoppingCart } from 'react-icons/fa';
import { Navbar } from './NavBar';
import * as styles from './styles.css';

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <div
          style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <Heading as='h1' className={styles.title}>
            DR. SHIRT
          </Heading>
          <p className={styles.description}>Desde 1980 · A Lenda Continua</p>
        </div>
        <div className={styles.headerActions}>
          <a href='#' className={styles.link}>
            <BiSearchAlt style={{ transform: ' scaleX(-1)' }} /> Buscar
          </a>
          <a href='#' className={styles.link}>
            <FaShoppingCart /> Carrinho (0)
          </a>
        </div>
      </div>

      <Navbar />
    </header>
  );
};
