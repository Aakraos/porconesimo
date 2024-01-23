const express = require('express');
const cors = require('cors');
const path = require('path'); // Aggiunto questo import

const app = express();

// Configura il middleware express.static per servire file statici dalla directory 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Middleware per gestire le politiche CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Aggiungi il middleware CORS
app.use(cors());

// Aggiungi una route di esempio
app.get('/', (req, res) => {
  res.send('Benvenuto nel tuo server Express!');
});

// Avvia il server sulla porta 5500
const port = 5500;
app.listen(port, () => {
  console.log(`Server Express in ascolto sulla porta ${port}`);
});