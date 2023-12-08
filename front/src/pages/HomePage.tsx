// HomePage.js

import React, { useEffect, useState } from 'react';
import { getAuth, signOut } from 'firebase/auth';
import Noticias from './Noticias';
import NoticiasGuardadas from './NoticiasGuardadas';
import * as Styles from './styles';
import { Button } from 'react-bootstrap';

export interface IHomePageProps {}

const HomePage: React.FC<IHomePageProps> = (props) => {
  const auth = getAuth();
  const [mostrarNoticiasGuardadas, setMostrarNoticiasGuardadas] = useState(false);

  const toggleMostrarNoticiasGuardadas = () => {
    setMostrarNoticiasGuardadas((prevMostrarNoticiasGuardadas) => !prevMostrarNoticiasGuardadas);
  };

  return (
    <Styles.Container>
      <Styles.TitleContainer>
        <Styles.Title>Los 3 mosqueteros Noticias</Styles.Title>
      </Styles.TitleContainer>

      <Styles.ButtonsContainer>
        <Styles.ActionButton
          style={{ backgroundColor: '#1DA1F2', borderColor: '#1DA1F2', marginRight: '1rem' }}
          onClick={toggleMostrarNoticiasGuardadas}
        >
          {mostrarNoticiasGuardadas ? <span role="img">📰 Inicio</span> : <span role="img">📰 Mis Noticias</span>}
        </Styles.ActionButton>

        <Styles.ActionButton style={{ backgroundColor: '#DC3545', borderColor: '#DC3545' }} onClick={() => signOut(auth)}>
          <span role="img">🚪 Cerrar Sesión</span>
        </Styles.ActionButton>
      </Styles.ButtonsContainer>

      <Styles.NewsContainer>
        <div style={{ marginBottom: '1rem', width: '100%' }}>
          {mostrarNoticiasGuardadas ? <NoticiasGuardadas /> : <Noticias/>}
        </div>
      </Styles.NewsContainer>
    </Styles.Container>
  );
};

export default HomePage;
