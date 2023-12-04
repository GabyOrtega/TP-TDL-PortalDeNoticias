import axios from 'axios';
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import { useState, useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';

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
  const [borrado, setBorrado] = useState<boolean>(false);

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
    setBorrado((prevBorrado) => !prevBorrado);
}

  const renderNews = () => {
    if (data) {
      return data.map((noticia, index) => (
        <div
          key={index}
          style={{
            width: '100vw',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
          }}
        >
          {
            <div style={{width:'100vw', display:'flex', flexDirection:'row', justifyContent:'center'}}>
            <Card className="text-center" style = {{width: '90%', backgroundColor: '#D3D3D8', margin:'1rem'}}>
            <Card.Header style = {{width: '100%', textAlign:'center', color:'white', fontSize: '30px', fontWeight:'bold', backgroundColor: '#8910C5'}}>{data[index].titulo}</Card.Header>
            <section style={{width:'100vw', display:'flex', flexDirection: 'column', alignItems:'center', justifyContent:'center'}}>
                <div dangerouslySetInnerHTML={{ __html: data[index].descripcion }} />
                <img style = {{width: '50%', alignContent: 'center', marginBottom:'1rem'}} src={data[index].imagen} alt={data[index].titulo} />
                <a href={data[index].link}><Button variant="primary">Ver más</Button></a>
                <Button onClick={() => borrarNoticiaGuardada(data[index].id)}>Dejar de guardar</Button>
                <Card.Footer className="text-muted">{data[index].fuente}</Card.Footer>
            </section>
            </Card>
        </div>
          }
        </div>
      ));
    }

    return <p>No hay noticias guardadas.</p>;
  };

  return (
    <div>
      {renderNews()}
    </div>
  );
}