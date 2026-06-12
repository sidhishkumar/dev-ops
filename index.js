import express from 'express';

const app = express();  
app.use(express.json());

app.get('/', (req, res) => {
  return res.json({'message': 'Hello World!-- V2-- github actions corrected-- docker hub--caddy'} );
});

app.listen(8000, () => {
  console.log('Example app listening on port 8000 ');
}); 