import React from 'react';
import buildLocalLink from '../../utils/build-local-link';
import styles from './logo.css';

const rootLink = buildLocalLink('/');

export default function Logo() {
  return (
    <a href={rootLink} className={styles.link}>
      <svg className={styles.svg} version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="-18 -28 106 106" xmlSpace="preserve">
        <g>
          <path fill="#568AC8" d="M1.8,49.8c-0.5,0-1-0.2-1.3-0.6C0,48.7-0.1,48,0.1,47.4L13.3,1.3c0.2-0.6,0.6-1.1,1.2-1.2c0.6-0.2,1.2,0,1.7,0.4l18.6,16.3L53.4,0.4c0.5-0.4,1.1-0.6,1.7-0.4c0.6,0.2,1.1,0.6,1.2,1.2l13.2,46.1c0.2,0.6,0,1.3-0.4,1.7s-1.1,0.7-1.7,0.6l-32.7-6.1L2.2,49.7C2,49.7,1.9,49.8,1.8,49.8z M34.8,39.9c0.1,0,0.2,0,0.3,0l26.5,5L34.8,21.5L8.1,44.9l26.4-5C34.6,39.9,34.7,39.9,34.8,39.9z M16,5.1L5.2,42.6l26.8-23.5L16,5.1z M37.6,19.1l26.8,23.4L53.7,5.1L37.6,19.1z" />
          <path fill="#568AC8" d="M34.8,43.5c-0.7,0-1.3-0.4-1.6-1L13.4,2.7c-0.4-0.9-0.1-2,0.8-2.4c0.9-0.4,2-0.1,2.4,0.8l18.1,36.5L53,1.2c0.4-0.9,1.5-1.3,2.4-0.8c0.9,0.4,1.3,1.5,0.8,2.4L36.5,42.5C36.2,43.1,35.5,43.5,34.8,43.5z" />
        </g>
      </svg>
    </a>
  );
}
