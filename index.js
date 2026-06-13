import express from 'express';

const app = express();  
app.use(express.json());

app.get('/', (req, res) => {
  return res.json({'message': 'Everthing is working fine', status : 200 , flag : true} );
});

app.listen(8000, () => {
  console.log('Example app listening on port 8000 ');
}); 