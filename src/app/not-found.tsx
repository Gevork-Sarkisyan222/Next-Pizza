'use client';

import Image from 'next/image';
import styles from './not-found.module.scss';
import useMediaQuery from '@mui/material/useMediaQuery';

export default function NotFoundPage() {
  const mobileQuery700 = useMediaQuery('(max-width:700px)');
  const mobileQuery569 = useMediaQuery('(max-width:569px)');
  const mobileQuery398 = useMediaQuery('(max-width:398px)');

  return (
    <div className={styles.NotFound}>
      <div className={styles.notFoundWrapper}>
        <Image
          className={styles.image}
          width={900}
          height={500}
          src="https://as2.ftcdn.net/v2/jpg/03/06/42/77/1000_F_306427779_pjTTfzrgtlzpbw9VhxKtP3ehN9FKuMiZ.jpg"
          alt="not-found page piizzas icon"
        />
        <h1
          style={{
            fontSize: mobileQuery398
              ? '16px'
              : mobileQuery569
              ? '18px'
              : mobileQuery700
              ? '26px'
              : '',
          }}
          className={styles.text}>
          Страница которую вы искали <span>не найдено</span>
        </h1>
      </div>
    </div>
  );
}
