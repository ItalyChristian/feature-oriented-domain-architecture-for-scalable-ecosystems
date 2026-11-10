import * as styles from './styles.css';

export const Navbar = () => {
  return (
    <nav className={styles.nav}>
      {/* prettier-ignore */}
      <ul className={styles.ul}>
        <li><a href="#" className={styles.a}>Início</a></li>
        <li><a href="#" className={styles.a}>Novidades</a></li>
        <li><a href="#" className={styles.a}>Promoções</a></li>
        <li><a href="#" className={styles.a}>Categorias</a></li>
        <li><a href="#" className={styles.a}>Contato</a></li>
      </ul>
    </nav>
  );
};
