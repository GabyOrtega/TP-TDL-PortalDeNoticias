import axios from 'axios';
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import { useState, useEffect } from 'react';
import { JSX } from 'react/jsx-runtime';
import * as Styles from './styles';
import NoData from './no-data';
import { ParsedVisitedNotice } from '../types/parsed-visited-notice';
import  VisitedNotice  from './visited-notice'

export default function SavedLinks() {
  const [data, setData] = useState<ParsedVisitedNotice[]>([]);
  const [saved, setSaved] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      const auth = getAuth();
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          try {
            const response = await axios.get(
              `http://localhost:3001/history?uid=${user.uid}`
            );
            setData(response.data);
          } catch (error) {
            console.error('Error fetching links visitados:', error);
          }
        } else {
          console.log('Usuario no logueado');
        }
      });
    };

    fetchData();
  }, [saved]);

  const renderHistory = () => {
      const items: JSX.Element[] = [];
    
    if (data) {
      console.log(data)  
      data.map((noticia) => (
          items.push(
            <div key={noticia.title}>
                <VisitedNotice
                  title={noticia.title}
                  link={noticia.link}
                  />
            </div>
          )
        ));
    }
    console.log(items)
    return items;
  };
  return (
    data.length != 0 ? <Styles.HistoryContainer>{renderHistory()}</Styles.HistoryContainer> : <NoData/>
  );
}