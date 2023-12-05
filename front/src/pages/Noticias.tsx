import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { parseString } from 'xml2js';
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import Noticia from './Noticia';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

type NoticiaResponse = {
  rss: {
    channel: {
      link: string;
      item: {
        title: string;
        link: string;
        description: string;
        pubDate: string;
        guid: string;
        category: string;
        enclosure: {
          $: {
            url: string;
            length: string;
            type: string;
          };
        };
      }[];
    };
  };
};

export default function Noticias() {
  const [data, setData] = useState<NoticiaResponse | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/clarin-rss');
        console.log(response.data);
        toJson(response.data);
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };

    console.log('Antes del fetch');
    fetchData();
  }, []);

  const toJson = (xml: string) => {
    parseString(xml, { explicitArray: false }, (error, result) => {
      if (error) {
        console.error('Error parsing XML:', error);
      } else {
        console.log(result);
        setData(result as NoticiaResponse);
      }
    });
  };

  const guardarNoticia = async (indice: number) => {
    try {
      const userId = await getUserId();
      const newsData = data?.rss.channel.item[indice];
      await axios.post('http://localhost:3001/noticias', {
        titulo: newsData?.title,
        fuente: data?.rss.channel.link,
        descripcion: newsData?.description,
        imagen: newsData?.enclosure?.$.url,
        link: newsData?.link,
        uid: userId.toString(),
      });
    } catch (error) {
      console.error('Error al guardar noticia:', error);
    }
  };

  const getUserId = async () => {
    let userId = '';
    try {
      await onAuthStateChanged(getAuth(), (user) => {
        if (user) {
          console.log('userid', user.uid);
          userId = user.uid;
        } else {
          console.log('Usuario no logueado');
        }
      });
    } catch (error) {
      console.error('Error obteniendo ID de usuario:', error);
    }
    return userId;
  };

  const renderNews = () => {
    const items = [];
    if (data) {
      for (let i = 0; i < data.rss.channel.item.length; i++) {
        items.push(
          <div key={i}>
              <Noticia
                title={data.rss.channel.item[i].title}
                description={data.rss.channel.item[i].description}
                imageUrl={data.rss.channel.item[i].enclosure?.$.url}
                link={data.rss.channel.item[i].link}
                onClick={() => guardarNoticia(i)}
                buttonName='Guardar noticia'
              />
            </div>
        );
      }
    }
    return items;
  };

  return <div style={{display:"grid", gridTemplateColumns: "repeat(auto-fill, minmax(30%, 1fr))", gap:"1rem"}}>{renderNews()}</div>;
}
