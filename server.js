const express = require('express');
const cors = require('cors');
const axios = require('axios');
const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue, Filter } = require('firebase-admin/firestore');
const bodyParser = require('body-parser');
require("firebase-functions");

initializeApp({credential:
    cert({
        "type": "service_account",
        "project_id": "los3mosqueterostdl",
        "private_key_id": "b0027ecb924ae7b1e348ffdbc781b0d5d8acd75e",
        "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDTeZOp3ZK6VVh0\n7COhDQXxyRoxV3n/CthARPM1JQTZ0Dl3co2yPCAFTapJVwtCGuuWbwvLXbUGubvV\nWMbJUQ8Ginmh6wawsX+396N9QX8taGUgdcLFtI1kGoCFA9+VoQ+vyx6cq3fZiccZ\n24eqRnlyq3P/I1ex8V0vzAVjfwra9ZmB8CfhGh3A2La4GKzgFyn2fsNuy7/wwie+\nCUaZRXa6fHewfM2jrqokx2iD86de2xVPXuc2gsdJn3Y13WsQe7fd1h0A4CVZdrVU\nLuQ2zt/J17DSg+0yXg0259YRcjq8HjcucS2jEgO02R/tTJlhbwbw6jxFaOQAA4eW\nGrTnbxh5AgMBAAECggEAEkDkEDKfZ8pWbHU2LWsQhcphd+aAkb/vuDsbW7glHzXm\nwprWhI7FsXTUNii3azkj96QAenPNXIDAp/grOb+aPUAg9+saSeXFoUKp+nWiUsWN\ni7aOctPpq70mixSxV7AuHfLkOAq25Bs33nwBTZ8apt1fZvjifhStgfgpc5PzgxWt\nWXSHWGkIQqVmaI0GcZndnr0P/KxR4vJGWgneCtvEDSLl/gKJ6cR9DztcThM1bBSj\nU+G5Nv+4/OmJ9g9+bTGEroN6hOl7sS5l9qNP2S+pyZyrHCfANijs3zG6HWbWwGNW\nzJQ/2tMxW82plTSZr6wGU8WNju8RBk0kCZkUBDH11wKBgQD3/9iB+qIQxxKcwpYK\n5jX6om3Oakc2lVEXaFtkuADoF15KNZl4JWx9fpBwNCET9g5BAkNyz1Q1aokMAOBp\nFrlhGHtEbX15lR/zdh+Jd64g8djwqKxV+yRRf/lGuWrNTr42weNrJxbhqszyuwyo\nZjfm2wn9gC++iIa2lS2seI6sJwKBgQDaTBYHJBTllKbdjakdY2hng+pGyGPeBljv\n24qI1osi7Vp7TsVCCObR5yyilEFK1HOVQpVIyjAGrv7QBMlGOB9+lhn01bqqI0t9\nYy4g5UzLfNLIbESIdYcl5mhN9atbVH7o7s9+3rXNMZ9CrP7kZUiUJq+iSWhNz12D\nyav/D3zaXwKBgQCJbICxJg2Ado/dxgYW7BKlXDS02Te1C3DwI6fhXAVElw5s2N6+\nMR65O9UWGAzsXsDvTS3LBRCIuQxQVnwEP89h+or0FCgfo38dDivTpTocj2fDk/RL\ngOtTLjMX+c8xDZ1iAnbe/b40Ns1zBCuzdVEs39vdWZcbYdQkgO3aUMPeqQKBgFRu\ngUaZygtSB4hBtltLi6Id/4sJDrddNSDwhRCQCpijvQ9cVCdKUhx1kWoAdZB/w4TD\nkAHrUdAD90J113N1WZkYbUmpMN2FcTk6FylaBu3dhZlHZupwqqkaCNW+Y1ybvcpS\nM6cadK68tqCPULb+Bahnnh7izZjqz3ydkAzC7MN5AoGBALwsZgM9t7Cv333pWbMz\nyOdCD5elXSHjbaX7q4ulgSNXqXJNFuE/hjTX4mKtt2kwxFLL7VHHKd9TK9AQglhU\nN/RvZdFHlz1+TGKSLwuB/JSxH/H0X18KPp3Q3Wv2s6NT+sK/fshAbTAzEyUPtbxP\nTVn1tBGNHSxzjaZ2U1etqejz\n-----END PRIVATE KEY-----\n",
        "client_email": "firebase-adminsdk-lyrnb@los3mosqueterostdl.iam.gserviceaccount.com",
        "client_id": "111213486093202447370",
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://oauth2.googleapis.com/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-lyrnb%40los3mosqueterostdl.iam.gserviceaccount.com",
        "universe_domain": "googleapis.com"
      }),
       databaseURL: "https://los3mosqueterostdl-default-rtdb.firebaseio.com"
    });
  
const db = getFirestore();

const app = express();
const PORT = 3001; 

app.use(cors());

app.use(bodyParser.json());

app.get('/clarin-rss', async (req, res) => {
  try {
    axios.get('https://www.clarin.com/rss/lo-ultimo/')
    .then( (response) => {
        console.log(response);
        console.log(response.data);
        res.send(response.data);
    })
    .catch( (error) => {
        console.log(error);
    });
  } catch (error) {
    res.status(500).send('Error al obtener los datos de Clarín.');
  }
});

app.get('/noticiasGuardadas', async (req, res) => {
    try {
        console.log('REQ', req.query.uid);
        const uid = req.query.uid;
        console.log('userID', uid);
        const noticias = db.collection('noticias');
        const resultado = await noticias.where('uid', '==', uid).get();
        const arrayNoticias = [];
        resultado.forEach(
            (noticia) => {
                arrayNoticias.push({
                    id: noticia.id,
                    titulo: noticia.data().titulo,
                    fuente: noticia.data().fuente,
                    descripcion: noticia.data().descripcion,
                    imagen: noticia.data().imagen,
                    uid: noticia.data().uid
                });
            }
        );
        res.send(arrayNoticias);
    } catch (error) {
        console.log(error);
        res.status(500).send('Error al obtener las noticias.');
    }
});

app.post('/noticias', async (req, res) => {   
    try{
        console.log(req);
        console.log(req.body);
        await db.collection('noticias').add({
            titulo: req.body.titulo,
            fuente: req.body.fuente,
            descripcion: req.body.descripcion,
            imagen: req.body.imagen,
            uid: req.body.uid
    });
    }catch(error){
        console.log(error);
        res.status(500).send('Error al guardar la noticia.');
    }
    res.status(200).send('Noticia guardada correctamente.');
});

app.get('/borrarNoticiaGuardada', async (req, res) => {
    try {
        const id = req.query.id;
        console.log('noticiaID', id);
        const noticias = db.collection('noticias');
        const resultado = await noticias.doc(id).delete();
        res.send(resultado);
    } catch (error) {
        console.log(error);
        res.status(500).send('Error al borrar la noticia.');
    }
});

app.listen(PORT, () => {
  console.log(`Servidor backend en http://localhost:${PORT}`);
});
