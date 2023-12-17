// HomePage.js

import React, { useEffect, useState } from 'react';
import { getAuth, signOut } from 'firebase/auth';
import Noticias from './notices';
import NoticiasGuardadas from './saved-notices';
import * as Styles from './styles';

export interface IHomePageProps {}

const HomePage: React.FC<IHomePageProps> = (props) => {
  const auth = getAuth();
  const [showSavedNotices, setShowSavedNotices] = useState(false);

  const toggleMostrarNoticiasGuardadas = () => {
    setShowSavedNotices((prevShowSavedNotices) => !prevShowSavedNotices);
  };

  return (
    <Styles.Container>
      <Styles.TitleContainer>
        <Styles.Title>Los 3 mosqueteros</Styles.Title>
        <Styles.TitleLogo src="https://svgsilh.com/svg/2281334.svg" alt='logo' />
      </Styles.TitleContainer>

      <Styles.ButtonsContainer>
        <Styles.ActionButton
          style={{ backgroundColor: '#1DA1F2', borderColor: '#1DA1F2', marginRight: '1rem' }}
          onClick={toggleMostrarNoticiasGuardadas}
        >
          {showSavedNotices ? <span role="img">📰 Inicio</span> : <span role="img">📰 Noticias guardadas</span>}
        </Styles.ActionButton>

        <Styles.ActionButton style={{ backgroundColor: '#DC3545', borderColor: '#DC3545' }} onClick={() => signOut(auth)}>
          <span role="img">🚪 Cerrar Sesión</span>
        </Styles.ActionButton>
      </Styles.ButtonsContainer>

      <Styles.NewsContainer>
        <div style={{ marginBottom: '1rem', width: '100%' }}>
          {showSavedNotices ? <NoticiasGuardadas /> : <Noticias/>}
        </div>
      </Styles.NewsContainer>
    </Styles.Container>
  );
};

export default HomePage;
