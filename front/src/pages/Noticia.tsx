// Noticia.js

import React, { useState } from 'react';
import * as Styles from './styles';

type NoticiaProps = {
  title: string;
  description: string;
  font: string;
  imageUrl: string;
  link: string;
  func: () => Promise<void>;
  buttonName: string;
  visible: boolean;
};

const Noticia: React.FC<NoticiaProps> = ({ title, description, imageUrl, link, func, font, buttonName, visible }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isVisible, setVisible] = useState<boolean>(visible);
  const [showOptions, setShowOptions] = useState(false);

  const handleButton = async () => {
    await func();
    setVisible(false);
  };

  const handleCompartirClick = () => {
    setShowOptions(!showOptions);
  };

  const getWhatsAppLink = () => {
    const message = `¡Mirá esta noticia!\n\n${title}\n${link}`;
    return `https://wa.me/?text=${encodeURIComponent(message)}`;
  };

  const getXLink = () => {
    const tweetText = `¡Mirá esta noticia! ${title} ${link}`;
    return `https://x.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;
  };

  const getFacebookLink = () => {
    return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(link)}`;
  };

  const getPageImage = (page: string) => {
    if(page.includes('clarin')){
      return <img alt="Miniatura de la versión del 00:01 27 ene 2019" src="//upload.wikimedia.org/wikipedia/commons/thumb/7/73/Clar%C3%ADn_logo.svg/120px-Clar%C3%ADn_logo.svg.png" decoding="async" loading="lazy" width="120" height="31" data-file-width="100" data-file-height="26"></img>}
    if(page.includes('pagina12'))
     return <img alt="File:Logo Página 12.svg" src="//upload.wikimedia.org/wikipedia/commons/thumb/4/44/Logo_P%C3%A1gina_12.svg/630px-Logo_P%C3%A1gina_12.svg.png" decoding="async" width="120" height="31" srcSet="//upload.wikimedia.org/wikipedia/commons/thumb/4/44/Logo_P%C3%A1gina_12.svg/945px-Logo_P%C3%A1gina_12.svg.png 1.5x, //upload.wikimedia.org/wikipedia/commons/thumb/4/44/Logo_P%C3%A1gina_12.svg/1260px-Logo_P%C3%A1gina_12.svg.png 2x" data-file-width="630" data-file-height="135"></img>
    if(page.includes('telam'))
      return <img alt="Archivo:Télam-logo-2021.svg" src="//upload.wikimedia.org/wikipedia/commons/thumb/8/89/T%C3%A9lam-logo-2021.svg/500px-T%C3%A9lam-logo-2021.svg.png" decoding="async" width="120" height="31" srcSet="//upload.wikimedia.org/wikipedia/commons/thumb/8/89/T%C3%A9lam-logo-2021.svg/750px-T%C3%A9lam-logo-2021.svg.png 1.5x, //upload.wikimedia.org/wikipedia/commons/thumb/8/89/T%C3%A9lam-logo-2021.svg/1000px-T%C3%A9lam-logo-2021.svg.png 2x" data-file-width="630" data-file-height="135"></img>
    if(page.includes('cronica'))
      return <img alt="Archivo:Crónica-logo.svg" src="//upload.wikimedia.org/wikipedia/commons/thumb/0/07/Cr%C3%B3nica-logo.svg/231px-Cr%C3%B3nica-logo.svg.png" decoding="async" width="120" height="31" srcSet="//upload.wikimedia.org/wikipedia/commons/thumb/0/07/Cr%C3%B3nica-logo.svg/347px-Cr%C3%B3nica-logo.svg.png 1.5x, //upload.wikimedia.org/wikipedia/commons/thumb/0/07/Cr%C3%B3nica-logo.svg/462px-Cr%C3%B3nica-logo.svg.png 2x" data-file-width="231" data-file-height="44"></img>
  };

  return (
    <Styles.NoticiaContainer
      className={`noticia ${isFocused ? 'focused' : ''}`}
      onMouseEnter={() => setIsFocused(true)}
      onMouseLeave={() => setIsFocused(false)}
    >
      <Styles.NoticiaContent>
        <Styles.NoticiaText>
          {getPageImage(font)}
          <h3>{title}</h3>
          {isFocused && <div dangerouslySetInnerHTML={{ __html: description }} />}
        </Styles.NoticiaText>
        <Styles.NoticiaImage src={imageUrl} alt={title} />
      </Styles.NoticiaContent>
      <Styles.StyledRow>
        <Styles.StyledLink href={link}>Ver más</Styles.StyledLink>
        <Styles.ShareContainer>
          <Styles.ShareButton onClick={handleCompartirClick}>Compartir</Styles.ShareButton>
          {showOptions && (
            <Styles.Menu>
              <Styles.MenuItem
                  href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer">
                    <Styles.Icon src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" />
                       Whatsapp
              </Styles.MenuItem>
              <Styles.MenuItem
                  href={getXLink()} target="_blank" rel="noopener noreferrer">
                    <Styles.Icon src="https://upload.wikimedia.org/wikipedia/commons/c/ce/X_logo_2023.svg" alt="X" />
                       X 
              </Styles.MenuItem>
              <Styles.MenuItem
                  href={getFacebookLink()} target="_blank" rel="noopener noreferrer">
                    <Styles.Icon src="https://upload.wikimedia.org/wikipedia/commons/b/b9/2023_Facebook_icon.svg" alt="Facebook" />
                      Facebook
              </Styles.MenuItem>
            </Styles.Menu>
          )}
        </Styles.ShareContainer>
        {isVisible && <Styles.StyledButton onClick={handleButton}>{buttonName}</Styles.StyledButton>}
      </Styles.StyledRow>
    </Styles.NoticiaContainer>
  );
};

export default Noticia;
