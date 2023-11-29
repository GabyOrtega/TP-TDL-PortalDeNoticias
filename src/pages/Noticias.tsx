import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { parseString, Builder } from "xml2js";

type NoticiaResponse = {
    rss: {
        channel: {
            item: {
                title: string;
                link: string;
                description: string;
                pubDate: string;
                guid: string;
                category: string;
            }[]
        }
    }
}

function toJson(xml: string) {

    parseString(xml, { explicitArray: false }, function(error, result) {
        console.log(result);
    });
}

export default function Noticias() {
    const [data, setData] = useState<NoticiaResponse | null>(null);

    useEffect( () => {
        console.log('previo al fetch');
        axios.get('http://localhost:3001/clarin-rss')
        .then( (response) => {
            console.log(response.data);
            toJson(response.data);
            //return xml2js.parseStringPromise(response.data)
        })/*
        .then(result => {
            setData(JSON.parse(result) as NoticiaResponse);
          })*/
        .catch( (error) => {
            console.log('Fetch error');
            console.log(error);
        });
         /* .then(response => response.text())
          .then(str => xml2js.parseStringPromise(str))
          .then(result => {
            setData(result as NoticiaResponse);
          }); */
      }, []);
      
    /*
    const renderNews = () => {
    const items = [];
    if (data) {
        for (let i = 0; i < data.rss.channel.item.length; i++) {
        items.push(<p key={i}>{data.rss.channel.item[i].title}</p>);
        }
    }
    return items;
    }

    return (
        <div>
        <p>Noticias</p>
        {renderNews()}
    </div>
    )*/

    return (
        <div>
        <p>Noticias</p>
    </div>
    )
};