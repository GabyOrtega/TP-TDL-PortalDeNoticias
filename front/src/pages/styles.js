import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #F0F0FF;
  padding: 1rem;
`;

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  background-color: #E6E6FA;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export const Title = styled.h1`
  font-family: 'Libre Baskerville', serif; 
  color: black; 
  font-size: 2em; 
  margin: 0;
`;

export const TitleLogo = styled.img`
  width: 50px; 
  height: auto; 
  margin-right: 10px;
  margin-left : 10px; 
`;

export const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 1rem;
`;

export const ActionButton = styled.button`
  padding: 8px 16px;
  border-radius: 5px;
  cursor: pointer;
  background-color: #1DA1F2;
  color: #ffffff;
`;

export const NewsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
`;

export const NewsContainer2 = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(30%, 1fr));
  gap: 1rem;
`;

export const NoticiaContainer = styled.div`
  margin-bottom: 20px; /* Espaciado entre noticias */
  background-color: #E6E6FA;
  border: 1px solid #ddd; /* Borde alrededor de la noticia */
  border-radius: 8px;
  overflow: hidden;
  transition: border-color 0.3s ease; /* Transición en el cambio de color del borde */
  
  &:hover {
    border-color: #1DA1F2; /* Cambio de color del borde al pasar el ratón */
  }

  &.focused {
    border-color: #1DA1F2; /* Color del borde cuando la noticia está enfocada */
  }
`;

export const NoticiaContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
`;

export const NoticiaText = styled.div`
  h3 {
    margin-bottom: 10px;
  }

  div {
    max-height: 150px; /* Altura máxima del contenido de la descripción */
    overflow: hidden;
  }
`;

export const NoticiaImage = styled.img`
  width: 100%;
  max-width: 600px;
  height: 300px;
  border-radius: 8px;
`;

export const StyledRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const StyledLink = styled.a`
  color: #1DA1F2;
  text-decoration: none;
  font-weight: bold;

  &:hover {
    text-decoration: underline;
  }
`;

export const StyledButton = styled.button`
  padding: 8px 16px;
  background-color: #1DA1F2;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0E71A8;
  }
`;

export const ShareContainer = styled.div`
  position: relative;
  display: inline-block;
`;

export const ShareButton = styled.div`
  background-color: #E6E6FA;
  color: #1DA1F2;
  font-weight: bold;
  font-size: 15px;
  padding: 8px 16px;
  border-radius: 5px;
  cursor: pointer;
  border: none;
  &:hover {
    text-decoration : underline ;
  }
`;

export const Icon = styled.img`
  width: 20px;
  height: 20px;
  margin: 5px;
`;

export const Menu = styled.div`
  position: absolute;
  bottom: 100%;
  background-color: #F0F0FF;
  left: 0;
  min-width: 10px;
  font-size:13px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  display: flex;
  flex-direction: column;
`;

export const MenuItem = styled.a`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: black;
  padding: 10px;
  height: 15px;

  &:hover {
    background-color: #ddd;
  }
`;

export const DropdownContainer = styled.div`
  margin-top: 20px;
`;

export const DropdownMenu = styled.select`
  padding: 8px 16px;
  border-radius: 5px;
  cursor: pointer;
  background-color: #1DA1F2;
  color: #ffffff;
`;

export const DropdownOption = styled.option`
  background-color: #1DA1F2;
  color: #ffffff;
`;

export const StyledContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const StyledContent = styled.div`
  background-color: #fff; /* Fondo blanco para el contenido */
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 300px;
`;

export const StyledHeading = styled.h1`
  color: #800080; /* Color de texto principal */
`;

export const StyledParagraph = styled.p`
  color: #555; /* Color de texto secundario */
`;
