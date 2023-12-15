import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import Noticia from './Noticia';
import * as Styles from './styles';
import NoData from './no-data';

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
  const [fetch, setFetch] = useState<string>('notice/basic');
  const [noticeType, setNoticeType] = useState<string>('');
  const [newspaperType, setNewspaperType] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setData(null);
        const response = await axios.get(`http://localhost:3001/${fetch}`);
        setData(response.data);
        setFilteredData(response.data);
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };

    fetchData();
  }, [fetch]);

  useEffect(() => {
    if (data) {
      const filtered =
        valorABuscar === ''
          ? data
          : data.filter((item) => {
              const contieneCadenaEnTitulo =
                item.titulo &&
                item.titulo.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().includes(valorABuscar.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase());
              const contieneCadenaEnDescripcion =
                item.descripcion && item.descripcion.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().includes(valorABuscar.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase());
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

  const handleNoticeTypeChange = (value: string) => {
    setNoticeType(value);
    if(newspaperType === '' && value !== '') {
      setFetch(`notice/${value}`);
    }
    else if(value !== ''){
      setFetch(`newspaper-notice/${newspaperType}/${value}`);
    }
  };

  const handleNewspaperTypeChange = (value: string) => {
    setNewspaperType(value);
    if((noticeType === '' || noticeType == 'basic') && value !== '') {
      setFetch(`newspaper/${value}`);
    }
    else if(value !== ''){
      setFetch(`newspaper-notice/${value}/${noticeType}`);
    }
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

  return <div>
      <div>
        <Styles.DropdownContainer>
          <label htmlFor="noticeType">Selecciona un tipo de noticia: </label>
          <select value={noticeType} onChange={(e) => handleNoticeTypeChange(e.target.value)}>
            <option value="">Elige una opción</option>
            <option value="basic">Inicio</option>
            <option value="politic">Politica</option>
            <option value="sports">Deportes</option>
          </select>
        </Styles.DropdownContainer>

        <Styles.DropdownContainer>
          <label htmlFor="newspaperType">Selecciona un periódico: </label>
          <select value={newspaperType} onChange={(e) => handleNewspaperTypeChange(e.target.value)}>
            <option value="">Elige una opción</option>
            <option value="clarin">Clarin</option>
            <option value="cronica">Cronica</option>
            <option value="telam">Telam</option>
            <option value="pagina12">Pagina 12</option>
            <option value="ole">Olé</option>
          </select>
        </Styles.DropdownContainer>
      </div>

      <div style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
        <div style={{ display: 'flex', height: '90px', maxWidth: '600px', width: '100%' }}>
          
          <input placeholder='Busca una noticia' style={{fontFamily:'Roboto, sans-serif', textAlign: 'center', color: '#555', fontWeight: 'bold', flex: '1', padding: '10px', border: '1px solid #000', borderRadius: '4px 0 0 4px', outline: 'none', marginBottom:'3rem'}} type="text" id="miInput" value={valorABuscar} onChange={inputChange}/>
        </div>
      </div>
      {filteredData.length != 0 ? <Styles.NewsContainer2> {renderNews()} </Styles.NewsContainer2> : <NoData/>}
    </div>;
}

export default Noticias;