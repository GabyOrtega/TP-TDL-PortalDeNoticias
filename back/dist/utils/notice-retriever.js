"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.noticeRetriever = void 0;
const axios_1 = __importDefault(require("axios"));
const xml2js_1 = require("xml2js");
const noticeRetriever = async (url) => {
    var _a, _b, _c, _d, _e;
    const xml = (await axios_1.default.get(url)).data;
    let res;
    (0, xml2js_1.parseString)(xml, { explicitArray: false }, (error, result) => {
        if (error) {
            console.error('Error parsing XML:', error);
            throw new Error();
        }
        else {
            res = result;
        }
    });
    const result = [];
    const maxResults = res.rss.channel.item.length > 20 ? 20 : res.rss.channel.item.length;
    for (let i = 0; i < maxResults; i++) {
        result.push({
            titulo: res.rss.channel.item[i].title,
            fuente: (_a = res.rss.channel) === null || _a === void 0 ? void 0 : _a.link,
            descripcion: res.rss.channel.item[i].description,
            imagen: (_e = (_c = (_b = res.rss.channel.item[i].enclosure) === null || _b === void 0 ? void 0 : _b.$.url) !== null && _c !== void 0 ? _c : (_d = res.rss.channel.item[i]['media:content']) === null || _d === void 0 ? void 0 : _d.$.url) !== null && _e !== void 0 ? _e : 'https://www.webempresa.com/foro/wp-content/uploads/wpforo/attachments/3200/318277=80538-Sin_imagen_disponible.jpg',
            link: res.rss.channel.item[i].link,
            id: i.toLocaleString().concat(res.rss.channel.item[i].title),
        });
    }
    return result;
};
exports.noticeRetriever = noticeRetriever;
