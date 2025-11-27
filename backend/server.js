const express = require('express'); 
const mongoose = require('mongoose'); 
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/tienda')
  .then(() => console.log('✅ MongoDB conectado'))
  .catch(err => console.error('❌ Error conectando a MongoDB:', err));

app.use('/productos', require('./routes/productos'));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 Servidor corriendo en puerto ${PORT}`));