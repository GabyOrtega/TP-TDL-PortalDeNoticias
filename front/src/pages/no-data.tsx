import * as Styles from './styles';

const NoData: React.FC = () => {
  
    return (
            <Styles.StyledContainer>
              <Styles.StyledContent>
                <Styles.StyledHeading>No hay información disponible</Styles.StyledHeading>
                <Styles.StyledParagraph>Lo sentimos, no hay datos para mostrar en este momento.</Styles.StyledParagraph>
              </Styles.StyledContent>
            </Styles.StyledContainer>
    );
  };
  
  export default NoData;
  