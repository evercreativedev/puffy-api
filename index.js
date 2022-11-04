
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import compression from 'compression';
import PuffyTraits from './puffy_traits.json';

dotenv.config();
const app = express();

app.use(bodyParser.json({ limit: '1024mb' }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(compression());

const whitelist = ['*'];
app.disable('x-powered-by');
app.options(whitelist, cors());
app.use(
  cors({
    credentials: true,
    origin(origin, callback) {
      callback(null, true);
    }
  })
);

const getPuffyData = async (req, res) => {
  try {
    const puffyTokenId = req.params._id;
    return puffyTokenId < 6000 ? res.status(200).send(PuffyTraits[puffyTokenId]) : res.status(200).send(null);
  } catch (error) {
    console.log('ant : puffy token error => ', error);
  }
};

app.get('/api/token-data/:_id', getPuffyData);

const port = process.env.PORT || 9000
app.listen(port);
console.log(`🚀 Server listening on port ` + port);