import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { parseString } from "xml2js";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { getFirestore } from 'firebase-admin/firestore';
import {onAuthStateChanged, getAuth} from 'firebase/auth';

const db = getFirestore();

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
                    }
                }
            }[]
        }
    }
}


export default function Noticias() {
    const [data, setData] = useState<NoticiaResponse | null>(null);

    function toJson(xml: string) {

        return parseString(xml, { explicitArray: false }, function(error, result) {
            console.log(result);
            setData(result as NoticiaResponse);
        });
    }
    
    function guardarNoticia(data : NoticiaResponse) {
        var userId;
        onAuthStateChanged(getAuth(), (user) => {
            if (user) {
                console.log(user.uid);
                userId = user.uid;
            } else {
              console.log('Usuario no logueado');
            }
          });

        db.collection('usuarios').add({
            noticias:{
                titulo: data?.rss.channel.item[0].title,
                fuente: data?.rss.channel.item[0].link,
                descripcion: data?.rss.channel.item[0].description,
                imagen: data?.rss.channel.item[0].enclosure?.$.url
            },
            uid: userId,
        });
    }
    
    useEffect( () => {
        console.log('previo al fetch');
        axios.get('http://localhost:3001/clarin-rss')
        .then( (response) => {
            console.log(response.data);
            toJson(response.data);
            //return xml2js.parseStringPromise(response.data)
        })
        .catch( (error) => {
            console.log('Fetch error');
            console.log(error);
        });
      }, []);
      
    
    const renderNews = () => {
    const items = [];
    if (data) {
        for (let i = 0; i < data.rss.channel.item.length; i++) {
            //items.push(<p key={i}>{data.rss.channel.item[i].title}</p>);
            /*items.push(
                    <div key={i}>
                        <h3>{data.rss.channel.item[i].title}</h3>
                        <img src={data.rss.channel.item[i].enclosure?.$.url} alt={data.rss.channel.item[i].title} />
                        <p>{data.rss.channel.item[i].description}</p>
                        <a href={data.rss.channel.item[i].link}>Ver más</a>
                    </div>)*/
            items.push(
                    <div style={{width:'100vw', display:'flex', flexDirection:'row', justifyContent:'center'}}>
                        <Card className="text-center" style = {{width: '90%', backgroundColor: '#D3D3D8', margin:'1rem'}}>
                        <Card.Header style = {{width: '100%', textAlign:'center', color:'white', fontSize: '30px', fontWeight:'bold', backgroundColor: '#1018C5'}}>{data.rss.channel.item[i].title}</Card.Header>
                        <section style={{width:'100vw', display:'flex', flexDirection: 'column', alignItems:'center', justifyContent:'center'}}>
                            <div dangerouslySetInnerHTML={{ __html: data.rss.channel.item[i].description }} />
                            <img style = {{width: '50%', alignContent: 'center', marginBottom:'1rem'}} src={data.rss.channel.item[i].enclosure?.$.url} alt={data.rss.channel.item[i].title} />
                            <a href={data.rss.channel.item[i].link}><Button variant="primary">Ver más</Button></a>
                            <Button onClick={() => guardarNoticia(data)}> + Guardar noticia </Button>
                            <Card.Footer className="text-muted">{data.rss.channel.link}</Card.Footer>
                        </section>
                        </Card>
                    </div>
            )
        }
    }
    return items;
    }

    return (
        <div>
        <p>Noticias</p>
        {renderNews()}
    </div>
    )

};