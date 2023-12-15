import axios from 'axios';
import { parseString } from 'xml2js';
import {NoticiaResponse} from '../types/noticia-response';
import { NoticiaGuardadaResponse } from '../types/noticia-guardada';

export const noticeRetriever = async (url: string) => {
    const xml = (await axios.get(url)).data
    let res: NoticiaResponse;
    parseString(xml, { explicitArray: false }, (error, result) => {
      if (error) {
        console.error('Error parsing XML:', error);
        throw new Error();
      } else {
        res = (result as NoticiaResponse);
      }
    });
    const result: NoticiaGuardadaResponse[] = [];
    for (let i = 0; i < res!.rss.channel.item.length; i++) {
      result.push({
        titulo: res!.rss.channel.item[i].title,
        fuente: res!.rss.channel?.link,
        descripcion: res!.rss.channel.item[i].description,
        imagen: res!.rss.channel.item[i].enclosure?.$.url ?? res!.rss.channel.item[i]['media:content']?.$.url ?? 'https://www.webempresa.com/foro/wp-content/uploads/wpforo/attachments/3200/318277=80538-Sin_imagen_disponible.jpg',
        link: res!.rss.channel.item[i].link,
        id: i.toLocaleString().concat(res!.rss.channel.item[i].title),
      })
    }
    return result
  };