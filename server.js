const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = 3001; // Puedes cambiar el puerto según tus necesidades

app.use(cors());

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

app.listen(PORT, () => {
  console.log(`Servidor backend en http://localhost:${PORT}`);
});
