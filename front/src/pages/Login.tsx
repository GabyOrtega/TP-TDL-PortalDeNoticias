import React from 'react';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const StyledContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #E6E6FA; /* Fondo con el color principal */
`;

const StyledContent = styled.div`
  background-color: #fff; /* Fondo blanco para el contenido */
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 300px;
`;

const StyledHeading = styled.h1`
  color: #800080; /* Color de texto principal */
`;

const StyledParagraph = styled.p`
  color: #555; /* Color de texto secundario */
`;

const StyledButton = styled.button`
  padding: 10px 20px;
  background-color: #800080; /* Color de botón */
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const LoginPage: React.FC = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const [authing, setAuthing] = React.useState(false);

  const signInWithGoogle = async () => {
    setAuthing(true);
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((response) => {
        console.log(response.user.uid);
        navigate('/');
      })
      .catch((error) => {
        console.error(error);
        setAuthing(false);
      });
  };

  return (
    <StyledContainer>
      <StyledContent>
        <StyledHeading>Bienvenido a Nuestro Portal de Noticias</StyledHeading>
        <StyledParagraph>Descubre las últimas noticias</StyledParagraph>
        <StyledButton onClick={() => signInWithGoogle()} disabled={authing}>
          {authing ? 'Iniciando sesión...' : 'Iniciar sesión con Google'}
        </StyledButton>
      </StyledContent>
    </StyledContainer>
  );
};

export default LoginPage;