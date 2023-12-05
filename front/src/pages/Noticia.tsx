import React, { MouseEventHandler, useState } from "react";
import { Button } from "react-bootstrap";

type NoticiaProps = {
  title: string;
  description: string;
  imageUrl: string;
  link: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
};

const Noticia: React.FC<NoticiaProps> = ({ title, description, imageUrl, link, onClick }) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div
      className={`noticia ${isFocused ? 'focused' : ''}`}
      onMouseEnter={() => setIsFocused(true)}
      onMouseLeave={() => setIsFocused(false)}
    >
      <div className="noticia-content">
        <div className="noticia-text">
          <h3>{title}</h3>
          <div dangerouslySetInnerHTML={{ __html: description }} />
        </div>
        <div >
          <img style={{ width: '100%', maxWidth: '600px', borderRadius: '8px' }} src={imageUrl} alt={title} />
        </div>
      </div>
      <a href={link}>Ver más</a>
      <Button onClick={onClick}>Guardar Noticia</Button>
    </div>
  );
};

export default Noticia;