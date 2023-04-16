import * as express from 'express';
import apiRouter from './routes';

import * as path from 'path';

const app = express();

app.use(express.json());

app.use(apiRouter);

app.use(express.static('public'));

app.get('*', (req, res) => {
    const htmlPage = path.join(__dirname, '../public/index.html');
    res.sendFile(htmlPage);
});

app.listen(3000);