import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { parseString } from 'xml2js';
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import Noticia from './Noticia';
import * as Styles from './styles';

type NoticiaResponse = {
  titulo: string;
  fuente: string;
  descripcion: string;
  imagen: string;
  link: string;
  id: string;
};

export default function Noticias() {
  const [valorABuscar, setValorABuscar] = useState<string | undefined>('');
  const [data, setData] = useState<NoticiaResponse[] | null>(null);
  var inputValue : string = '';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/noticias');
        console.log(response.data);
        setData(response.data);
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };

    console.log('Antes del fetch');
    fetchData();
  }, []);

  const guardarNoticia = async (indice: string) => {
    try {
      const userId = await getUserId();
      const newsData = data?.filter((d) => d.titulo === indice)[0];
      if(!newsData) return;
      await axios.post('http://localhost:3001/noticias', {
        titulo: newsData!.titulo,
        fuente: newsData!.fuente,
        descripcion: newsData!.descripcion,
        imagen: newsData!.imagen,
        link: newsData!.link,
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

  const inputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setValorABuscar(inputValue);
    console.log('valor', inputValue);
  };

  const renderNews = () => {
    const items = [];
    if (data) {
      for (let i = 0; i < data.length; i++) {
        var contieneCadenaEnTitulo = false;
        var contieneCadenaEnDescripcion = false;
        if(valorABuscar != null){
          if((data[i].titulo != null)) contieneCadenaEnTitulo = (data[i].titulo.toLowerCase()).indexOf(valorABuscar.toLowerCase()) !== -1;
          if((data[i].descripcion != null)) contieneCadenaEnDescripcion = (data[i].descripcion).indexOf(valorABuscar) !== -1;
        }
        if((valorABuscar == null) || contieneCadenaEnTitulo || contieneCadenaEnDescripcion )
        items.push(
          <div key={data[i].titulo}>
            <Noticia
              title={data[i].titulo}
              description={data[i].descripcion}
              imageUrl={data[i].imagen}
              link={data[i].link}
              func={() => guardarNoticia(data[i].titulo)}
              buttonName='Guardar'
              visible={true}
            />
          </div>
        );
      }
    }
    return items;
  };

  return <div>
            <div>
              <label htmlFor="miInput">Busca una noticia:</label>
              <input type="text" id="miInput" value={valorABuscar} onChange={inputChange}/>
            </div>
            <Styles.NewsContainer2>{renderNews()}</Styles.NewsContainer2>
          </div>;
}
