import axios from 'axios';
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import { useState, useEffect } from 'react';
import Noticia from './Noticia';
import { JSX } from 'react/jsx-runtime';
import * as Styles from './styles';

type NoticiaGuardadaResponse = {
  titulo: string;
  fuente: string;
  descripcion: string;
  imagen: string;
  uid: string;
  link: string;
  id: string;
};

export default function NoticiasGuardadas() {
  const [data, setData] = useState<NoticiaGuardadaResponse[] | null>(null);
  const [borrado, setBorrado] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      const auth = getAuth();
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          try {
            const response = await axios.get(
              `http://localhost:3001/noticiasGuardadas?uid=${user.uid}`
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
  }, [borrado]); // Empty dependency array to run the effect only once on mount

  function borrarNoticiaGuardada(id: String){
    axios.get(`http://localhost:3001/borrarNoticiaGuardada?id=${id}`);
    setBorrado(borrado ? false : true);
}

  const renderNews = () => {
    const items: JSX.Element[] = [];
    if (data) {
      data.map((noticia, index) => (
        items.push(
          <div key={index}>
              <Noticia
                title={noticia.titulo}
                description={noticia.descripcion}
                imageUrl={noticia.imagen}
                link={noticia.fuente}
                func={async () => borrarNoticiaGuardada(noticia.id)}
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
    <Styles.NewsContainer2>{renderNews()}</Styles.NewsContainer2>
  );
}