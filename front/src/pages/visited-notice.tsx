import * as Styles from './styles';

type VisitedNotice = {
  title: string;
  link: string;
};


const VisitedNotice: React.FC<VisitedNotice> = ({ title, link }) => {
  
  return (
    
    <Styles.NoticiaContainer>
      <Styles.HistoryContent>
      <Styles.StyledRowHistory>
        <Styles.StyledLink href={link} target='_blank'> {title} </Styles.StyledLink>
      </Styles.StyledRowHistory>
      </Styles.HistoryContent>
    </Styles.NoticiaContainer>
    
  );
};

export default VisitedNotice;
