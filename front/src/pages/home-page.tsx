// HomePage.js

import React, { useEffect, useState } from 'react';
import { getAuth, signOut } from 'firebase/auth';
import Notices from './notices';
import SavedNotices from './saved-notices';
import History from './history'
import * as Styles from './styles';

export interface IHomePageProps {}

const HomePage: React.FC<IHomePageProps> = (props) => {
  const auth = getAuth();
  const [currentScreen, setCurrentScreen] = useState('notices');
  const [showSavedNotices, setShowSavedNotices] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [isVisible, setVisibility] = useState(true);

  const toggleMostrarNoticiasGuardadas = () => {
    setShowSavedNotices((prevShowSavedNotices) => !prevShowSavedNotices);
  };

  const toggleShowHistory = () => {
    setShowHistory((prevShowHistory) => !prevShowHistory);
    showHistory ? setVisibility(true) : setVisibility(false);
  };

  const toggleScreen = (screen: string) => {
    setCurrentScreen(screen);
  }

  const handleScreen = (toggleFunc : () => void, typeToggle : boolean, screenTrue : string, screenFalse: string ) => {
     toggleFunc()
     typeToggle ? toggleScreen(screenTrue) : toggleScreen(screenFalse); 

  }

  return (
    <Styles.Container>
      <Styles.TitleContainer>
        <Styles.Title>Los 3 mosqueteros</Styles.Title>
        <Styles.TitleLogo src="https://svgsilh.com/svg/2281334.svg" alt='logo' />
      </Styles.TitleContainer>

      <Styles.ButtonsContainer>
        {isVisible &&
        <Styles.ActionButton
           style={{ backgroundColor: '#1DA1F2', borderColor: '#1DA1F2', marginRight: '1rem' }}
           onClick={() => handleScreen(toggleMostrarNoticiasGuardadas,showSavedNotices,'notices','saved')}
        >
          {showSavedNotices ? <span role="img">📰 Inicio</span> : <span role="img">📰 Noticias guardadas</span>}
        </Styles.ActionButton>}

        <Styles.ActionButton
           style={{ backgroundColor: '#1DA1F2', borderColor: '#1DA1F2', marginRight:'1000px'}}
           onClick={() => handleScreen(toggleShowHistory,showHistory,'notices','history')}
        >
          {showHistory ? <span role="img">⬅️ Volver al inicio</span> : <span role="img">🕒 Historial</span>}
        </Styles.ActionButton>

        <Styles.ActionButton
           style={{ backgroundColor: '#DC3545', borderColor: '#DC3545'}}
           onClick={() => signOut(auth)}
        >
          <span role="img">🚪 Cerrar Sesión</span>
        </Styles.ActionButton>
      </Styles.ButtonsContainer>

      <Styles.NewsContainer>
        <div style={{ marginBottom: '1rem', width: '100%' }}>
          {currentScreen === 'notices' && <Notices />}
          {currentScreen === 'saved' && <SavedNotices />}
          {currentScreen === 'history' && <History />}
        </div>
      </Styles.NewsContainer>
    </Styles.Container>
  );
};

export default HomePage;
