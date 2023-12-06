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
  background-color: #E6E6FA;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export const Title = styled.p`
  font-size: 36px;
  font-weight: bold;
  color: #800080;
  margin: 0;
  justify-content: center;
  align-items: center;
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