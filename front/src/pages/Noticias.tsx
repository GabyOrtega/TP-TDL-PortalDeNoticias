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
  const [valorABuscar, setValorABuscar] = useState<string>('');
  const [data, setData] = useState<NoticiaResponse[] | null>(null);
  const [filteredData, setFilteredData] = useState<NoticiaResponse[]>([]);
  const [noticeType, setNoticeType] = useState<string>("noticias");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setData(null);
        const response = await axios.get(`http://localhost:3001/${noticeType}`);
        console.log(response.data);
        setData(response.data);
        setFilteredData(response.data);
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };

    console.log('Antes del fetch');
    fetchData();
  }, [noticeType]);

  useEffect(() => {
    if (data) {
      const filtered =
        valorABuscar === ''
          ? data
          : data.filter((item) => {
              const contieneCadenaEnTitulo =
                item.titulo &&
                item.titulo.toLowerCase().includes(valorABuscar.toLowerCase());
              const contieneCadenaEnDescripcion =
                item.descripcion && item.descripcion.includes(valorABuscar);
              const contieneCadenaEnMedio =
                item.fuente && item.fuente.includes(valorABuscar);
              return (
                contieneCadenaEnTitulo ||
                contieneCadenaEnMedio ||
                contieneCadenaEnDescripcion
              );
            });
      setFilteredData(filtered);
    }
  }, [valorABuscar, data]);

  const guardarNoticia = async (indice: string) => {
    try {
      const userId = await getUserId();
      const newsData = data?.filter((d) => d.titulo === indice)[0];
      if (!newsData) return;
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

  const pathChange = (path: string) => {
    if(path === noticeType || path === '')
      return;
    setFilteredData([]);
    setNoticeType(path);
  };

  const renderNews = () => {
    const items = [];
    const displayData = filteredData || [];
    for (let i = 0; i < displayData.length; i++) {
      items.push(
        <div key={displayData[i].id}>
          <Noticia
            title={displayData[i].titulo}
            description={displayData[i].descripcion}
            imageUrl={displayData[i].imagen}
            link={displayData[i].link}
            font={displayData[i].fuente}
            func={() => guardarNoticia(displayData[i].titulo)}
            buttonName='Guardar'
            visible={true}
          />
        </div>
      );
    }
    return items;
  };

  return <div>
            <div>
            <Styles.DropdownContainer>
            <label htmlFor="menu">Selecciona una opción: </label>
      <Styles.DropdownMenu onChange={(e) => pathChange(e.target.value)}>
        <Styles.DropdownOption value="">Elige una opción</Styles.DropdownOption>
        <Styles.DropdownOption value="noticias">Inicio</Styles.DropdownOption>
        <Styles.DropdownOption value="politica">Politica</Styles.DropdownOption>
        <Styles.DropdownOption value="deportes">Deportes</Styles.DropdownOption>
        <Styles.DropdownOption value="clarin">Clarin</Styles.DropdownOption>
        <Styles.DropdownOption value="cronica">Cronica</Styles.DropdownOption>
        <Styles.DropdownOption value="telam">Telam</Styles.DropdownOption>
        <Styles.DropdownOption value="pagina12">Pagina 12</Styles.DropdownOption>
      </Styles.DropdownMenu>
    </Styles.DropdownContainer>
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