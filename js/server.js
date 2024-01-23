const express = require('express');
const cors = require('cors');

const app = express();

// Configura il middleware express.static per servire file statici dalla directory 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Aggiungi il middleware CORS
app.use(cors());

// Aggiungi una route di esempio
app.get('/', (req, res) => {
  res.send('Benvenuto nel tuo server Express!');
});

// Avvia il server sulla porta 3000
const port = 5500;
app.listen(port, () => {
  console.log(`Server Express in ascolto sulla porta ${port}`);
});