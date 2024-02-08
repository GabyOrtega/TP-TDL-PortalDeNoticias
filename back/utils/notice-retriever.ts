import axios from 'axios';
import { parseString } from 'xml2js';
import {NoticeResponse} from '../types/notice-response';
import { ParsedNotice } from '../types/parsed-notice';

export const noticeRetriever = async (url: string) => {
    const xml = (await axios.get(url)).data
    let res: NoticeResponse;
    parseString(xml, { explicitArray: false }, (error, result) => {
      if (error) {
        console.error('Error parsing XML:', error);
        throw new Error();
      } else {
        res = (result as NoticeResponse);
      }
    });
    const result: ParsedNotice[] = [];
    const maxResults =  res!.rss.channel.item.length > 20 ? 20 :  res!.rss.channel.item.length;
    for (let i = 0; i < maxResults; i++) {
      result.push({
        title: res!.rss.channel.item[i].title,
        font: res!.rss.channel?.link,
        description: res!.rss.channel.item[i].description,
        image: res!.rss.channel.item[i].enclosure?.$.url ?? res!.rss.channel.item[i]['media:content']?.$.url ?? 'https://www.webempresa.com/foro/wp-content/uploads/wpforo/attachments/3200/318277=80538-Sin_imagen_disponible.jpg',
        link: res!.rss.channel.item[i].link,
        id: i.toLocaleString().concat(res!.rss.channel.item[i].title)
      })
    }
    return result
  };