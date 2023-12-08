import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { parseString } from 'xml2js';
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import Noticia from './Noticia';
import * as Styles from './styles';
import { Button } from 'react-bootstrap';

type NoticiaResponse = {
  titulo: string;
  fuente: string;
  descripcion: string;
  imagen: string;
  link: string;
  id: string;
};

const Noticias: React.FC = () => {
  const [valorABuscar, setValorABuscar] = useState<string | undefined>('');
  const [data, setData] = useState<NoticiaResponse[] | null>(null);
  const [noticeType, setPath] = useState<string>("noticias");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setData(null);
        const response = await axios.get(`http://localhost:3001/${noticeType}`);
        console.log(response.data);
        setData(response.data);
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };

    console.log('Antes del fetch');
    fetchData();
  }, [noticeType]);

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
    setValorABuscar(event.target.value);
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
              font={data[i].fuente}
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
<div>
          <Styles.ActionButton onClick={() => setPath('politica')}>politica</Styles.ActionButton>
          <Styles.ActionButton onClick={() => setPath('noticias')}>noticias</Styles.ActionButton>
          <Styles.ActionButton onClick={() => setPath('deportes')}>deportes</Styles.ActionButton></div>
          <div style={{width:'100%', display:'flex', flexDirection:'row', justifyContent:'center'}}>
              <div style={{display: 'flex',height:'90px', maxWidth: '600px', width: '100%'}}>
                <input placeholder='Busca una noticia' style={{fontFamily:'Roboto, sans-serif', textAlign: 'center', color: '#555', fontWeight: 'bold', flex: '1', padding: '10px', border: '1px solid #000', borderRadius: '4px 0 0 4px', outline: 'none', marginBottom:'3rem'}} type="text" id="miInput" value={valorABuscar} onChange={inputChange}/>
              </div>
            </div>
            </div>
            <Styles.NewsContainer2>{renderNews()}</Styles.NewsContainer2>
          </div>;
}

export default Noticias;