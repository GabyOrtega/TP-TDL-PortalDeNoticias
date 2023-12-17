import axios from 'axios';
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import { useState, useEffect } from 'react';
import Notice from './notice';
import { JSX } from 'react/jsx-runtime';
import * as Styles from './styles';
import NoData from './no-data';
import { ParsedNotice } from '../types/parsed-notice';

export default function SavedNotices() {
  const [data, setData] = useState<ParsedNotice[]>([]);
  const [deleted, setDeleted] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      const auth = getAuth();
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          try {
            const response = await axios.get(
              `http://localhost:3001/saved-notices?uid=${user.uid}`
            );
            setData(response.data);
          } catch (error) {
            console.error('Error fetching noticias guardadas:', error);
          }
        } else {
          console.log('Usuario no logueado');
        }
      });
    };

    fetchData();
  }, [deleted]); // Empty dependency array to run the effect only once on mount

  function deleteSavedNotice(id: String){
    axios.delete(`http://localhost:3001/notice?id=${id}`);
    setDeleted(deleted ? false : true);
}

  const renderNews = () => {
      const items: JSX.Element[] = [];
    
    if (data) {
      data.map((noticia, index) => (
          items.push(
            <div key={noticia.title}>
                <Notice
                  title={noticia.title}
                  description={noticia.description}
                  imageUrl={noticia.image}
                  link={noticia.link}
                  font={noticia.font}
                  func={async () => deleteSavedNotice(noticia.id)}
                  buttonName="Eliminar"
                  visible = {true}
                />
            </div>
          )
        ));
    }
    return items;
  };
  return (
    data.length != 0 ? <Styles.NewsContainer2>{renderNews()}</Styles.NewsContainer2> : <NoData/>
  );
}