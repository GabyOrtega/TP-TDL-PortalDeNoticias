// Noticia.js

import React, { useState } from 'react';
import * as Styles from './styles';

type NoticiaProps = {
  title: string;
  description: string;
  imageUrl: string;
  link: string;
  func: () => Promise<void>;
  buttonName: string;
  visible: boolean;
};

const Noticia: React.FC<NoticiaProps> = ({ title, description, imageUrl, link, func, buttonName, visible }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isVisible, setVisible] = useState<boolean>(visible);

  const handleButton = async () => {
    await func();
    setVisible(false);
  };

  return (
    <Styles.NoticiaContainer
      className={`noticia ${isFocused ? 'focused' : ''}`}
      onMouseEnter={() => setIsFocused(true)}
      onMouseLeave={() => setIsFocused(false)}
    >
      <Styles.NoticiaContent>
        <Styles.NoticiaText>
          <h3>{title}</h3>
          <div dangerouslySetInnerHTML={{ __html: description }} />
        </Styles.NoticiaText>
        <Styles.NoticiaImage src={imageUrl} alt={title} />
      </Styles.NoticiaContent>
      <Styles.StyledRow>
        <Styles.StyledLink href={link}>Ver más</Styles.StyledLink>
        {isVisible && <Styles.StyledButton onClick={handleButton}>{buttonName}</Styles.StyledButton>}
      </Styles.StyledRow>
    </Styles.NoticiaContainer>
  );
};

export default Noticia;
