const express = require('express');
const cors = require('cors');
const apiRoutes = require('./src/routes/api'); 

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/v1', apiRoutes);

app.get('/', (req, res) => {
    res.send('Server Validasi Blockchain Siap!');
});

app.listen(PORT, () => {
    console.log(`Backend Server berjalan di port ${PORT}`);
    console.log(`Endpoint: http://localhost:${PORT}/api/v1/verify/:id`);
});