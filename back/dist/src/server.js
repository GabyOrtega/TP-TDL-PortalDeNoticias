"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const axios_1 = __importDefault(require("axios"));
const app_1 = require("firebase-admin/app");
const firestore_1 = require("firebase-admin/firestore");
const xml2js_1 = require("xml2js");
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
const PORT = 3001;
(0, app_1.initializeApp)({
    credential: (0, app_1.cert)({
        projectId: 'los3mosqueterostdl',
        privateKey: '-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDTeZOp3ZK6VVh0\n7COhDQXxyRoxV3n/CthARPM1JQTZ0Dl3co2yPCAFTapJVwtCGuuWbwvLXbUGubvV\nWMbJUQ8Ginmh6wawsX+396N9QX8taGUgdcLFtI1kGoCFA9+VoQ+vyx6cq3fZiccZ\n24eqRnlyq3P/I1ex8V0vzAVjfwra9ZmB8CfhGh3A2La4GKzgFyn2fsNuy7/wwie+\nCUaZRXa6fHewfM2jrqokx2iD86de2xVPXuc2gsdJn3Y13WsQe7fd1h0A4CVZdrVU\nLuQ2zt/J17DSg+0yXg0259YRcjq8HjcucS2jEgO02R/tTJlhbwbw6jxFaOQAA4eW\nGrTnbxh5AgMBAAECggEAEkDkEDKfZ8pWbHU2LWsQhcphd+aAkb/vuDsbW7glHzXm\nwprWhI7FsXTUNii3azkj96QAenPNXIDAp/grOb+aPUAg9+saSeXFoUKp+nWiUsWN\ni7aOctPpq70mixSxV7AuHfLkOAq25Bs33nwBTZ8apt1fZvjifhStgfgpc5PzgxWt\nWXSHWGkIQqVmaI0GcZndnr0P/KxR4vJGWgneCtvEDSLl/gKJ6cR9DztcThM1bBSj\nU+G5Nv+4/OmJ9g9+bTGEroN6hOl7sS5l9qNP2S+pyZyrHCfANijs3zG6HWbWwGNW\nzJQ/2tMxW82plTSZr6wGU8WNju8RBk0kCZkUBDH11wKBgQD3/9iB+qIQxxKcwpYK\n5jX6om3Oakc2lVEXaFtkuADoF15KNZl4JWx9fpBwNCET9g5BAkNyz1Q1aokMAOBp\nFrlhGHtEbX15lR/zdh+Jd64g8djwqKxV+yRRf/lGuWrNTr42weNrJxbhqszyuwyo\nZjfm2wn9gC++iIa2lS2seI6sJwKBgQDaTBYHJBTllKbdjakdY2hng+pGyGPeBljv\n24qI1osi7Vp7TsVCCObR5yyilEFK1HOVQpVIyjAGrv7QBMlGOB9+lhn01bqqI0t9\nYy4g5UzLfNLIbESIdYcl5mhN9atbVH7o7s9+3rXNMZ9CrP7kZUiUJq+iSWhNz12D\nyav/D3zaXwKBgQCJbICxJg2Ado/dxgYW7BKlXDS02Te1C3DwI6fhXAVElw5s2N6+\nMR65O9UWGAzsXsDvTS3LBRCIuQxQVnwEP89h+or0FCgfo38dDivTpTocj2fDk/RL\ngOtTLjMX+c8xDZ1iAnbe/b40Ns1zBCuzdVEs39vdWZcbYdQkgO3aUMPeqQKBgFRu\ngUaZygtSB4hBtltLi6Id/4sJDrddNSDwhRCQCpijvQ9cVCdKUhx1kWoAdZB/w4TD\nkAHrUdAD90J113N1WZkYbUmpMN2FcTk6FylaBu3dhZlHZupwqqkaCNW+Y1ybvcpS\nM6cadK68tqCPULb+Bahnnh7izZjqz3ydkAzC7MN5AoGBALwsZgM9t7Cv333pWbMz\nyOdCD5elXSHjbaX7q4ulgSNXqXJNFuE/hjTX4mKtt2kwxFLL7VHHKd9TK9AQglhU\nN/RvZdFHlz1+TGKSLwuB/JSxH/H0X18KPp3Q3Wv2s6NT+sK/fshAbTAzEyUPtbxP\nTVn1tBGNHSxzjaZ2U1etqejz\n-----END PRIVATE KEY-----\n',
        clientEmail: 'firebase-adminsdk-lyrnb@los3mosqueterostdl.iam.gserviceaccount.com'
    }),
    databaseURL: 'https://los3mosqueterostdl-default-rtdb.firebaseio.com'
});
const db = (0, firestore_1.getFirestore)();
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.get('/clarin-rss', async (req, res) => {
    try {
        const response = await axios_1.default.get('https://www.clarin.com/rss/lo-ultimo/');
        console.log(response.data);
        res.send(response.data);
    }
    catch (error) {
        console.log(error);
        res.status(500).send('Error al obtener los datos de Clarín.');
    }
});
app.get('/noticias', async (req, res) => {
    try {
        const response = await axios_1.default.get('https://www.clarin.com/rss/lo-ultimo/');
        console.log(response.data);
        res.send(response.data);
    }
    catch (error) {
        console.log(error);
        res.status(500).send('Error al obtener los datos de Clarín.');
    }
});
const toJson = (xml) => {
    (0, xml2js_1.parseString)(xml, { explicitArray: false }, (error, result) => {
        if (error) {
            console.error('Error parsing XML:', error);
        }
        else {
            console.log(result);
        }
    });
};
app.get('/noticiasGuardadas', async (req, res) => {
    try {
        console.log('REQ', req.query.uid);
        const uid = req.query.uid;
        console.log('userID', uid);
        const noticias = db.collection('noticias');
        const resultado = await noticias.where('uid', '==', uid).get();
        const arrayNoticias = [];
        resultado.forEach((noticia) => {
            arrayNoticias.push({
                id: noticia.id,
                titulo: noticia.data().titulo,
                fuente: noticia.data().fuente,
                descripcion: noticia.data().descripcion,
                imagen: noticia.data().imagen,
                uid: noticia.data().uid
            });
        });
        res.send(arrayNoticias);
    }
    catch (error) {
        console.log(error);
        res.status(500).send('Error al obtener las noticias.');
    }
});
app.post('/noticias', async (req, res) => {
    try {
        console.log(req.body);
        await db.collection('noticias').add({
            titulo: req.body.titulo,
            fuente: req.body.fuente,
            descripcion: req.body.descripcion,
            imagen: req.body.imagen,
            uid: req.body.uid
        });
        res.status(200).send('Noticia guardada correctamente.');
    }
    catch (error) {
        console.log(error);
        res.status(500).send('Error al guardar la noticia.');
    }
});
app.get('/borrarNoticiaGuardada', async (req, res) => {
    try {
        const id = req.query.id;
        console.log('noticiaID', id);
        const noticias = db.collection('noticias');
        await noticias.doc(String(id)).delete();
        res.send('Noticia borrada correctamente.');
    }
    catch (error) {
        console.log(error);
        res.status(500).send('Error al borrar la noticia.');
    }
});
app.listen(PORT, () => {
    console.log(`Servidor backend en http://localhost:${PORT}`);
});
