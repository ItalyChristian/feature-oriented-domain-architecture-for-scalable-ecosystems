import { BoltGradientIcon } from '@/shared/assets/icons/BoltGradientIcon';
import Dark_Side_of_the_Moon from '@/shared/assets/images/Dark_Side_of_the_Moon.png';
import {
  card,
  cardBand,
  cardButton,
  cardImage,
  cardPrice,
  cardTitle,
} from '@/shared/styles/card.css';
import { flexColumn } from '@/shared/styles/grid-system.css';
import { Heading } from '@radix-ui/themes';
import * as styles from './styles.css';

export const Highlights = () => {
  return (
    <div className={flexColumn}>
      <h2 className={styles.title}>
        <BoltGradientIcon width='1em' height='1em' />
        Em Alta
      </h2>

      <div className={styles.cardsContainer}>
        <div className={card} style={{ cursor: 'pointer' }}>
          <img
            className={cardImage}
            src={Dark_Side_of_the_Moon.src}
            alt='Camiseta Pink Floyd'
          />

          <Heading as='h3' size='4' className={cardTitle}>
            Dark side of the moon
          </Heading>
          <span className={cardBand}>Pink Floyd</span>
          <span className={cardPrice}>R$ 89,90</span>
          <button className={cardButton}>Garantir</button>
        </div>

        <div className={card} style={{ cursor: 'pointer' }}>
          <img
            className={cardImage}
            src={Dark_Side_of_the_Moon.src}
            alt='Camiseta Pink Floyd'
          />
          <Heading as='h3' size='4' className={cardTitle}>
            Dark side of the moon
          </Heading>
          <span className={cardBand}>Pink Floyd</span>
          <span className={cardPrice}>R$ 89,90</span>
          <button className={cardButton}>Garantir</button>
        </div>

        <div className={card} style={{ cursor: 'pointer' }}>
          <img
            className={cardImage}
            src={Dark_Side_of_the_Moon.src}
            alt='Camiseta Pink Floyd'
          />
          <Heading as='h3' size='4' className={cardTitle}>
            Dark side of the moon
          </Heading>
          <span className={cardBand}>Pink Floyd</span>
          <span className={cardPrice}>R$ 89,90</span>
          <button className={cardButton}>Garantir</button>
        </div>
      </div>
    </div>
  );
};
