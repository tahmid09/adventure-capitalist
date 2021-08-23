import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors'
import mongoose from 'mongoose';

let { User } = require('./model/user');

const dotenv = require('dotenv');
dotenv.config();

const DBLINK = process.env.DBLINK


mongoose.connect(`${DBLINK}`, { useCreateIndex: true,useNewUrlParser: true,useUnifiedTopology: true });

let db = mongoose.connection;
//Check Connection
db.once('open', function(){
	console.log('Connected To the MongoDB');
})
//check for DB error
db.on('error', function(err){
	console.log(err);
})


const app = express();
app.use(bodyParser.json());// to support JSON-encoded bodies
app.use(cors());


app.get('/', (req, res) => {
  console.log('porst 3000 workin')
  res.send('Hi there !! sss !!++');
})


app.post('/business_data', async (req, res) => {
  const result = await User.updateOne( { token : req.body.token }, req.body, { upsert : true }).catch( () => {} );
  res.send(result);
})

app.post('/calculate_capital', async (req, res) => { 

    const result = await User.findOne({'token': req.body.token});
    
    if (!result) return res.status(400).send('user already register.');

    let lasttime = Number(result.time);
    let timenow = new Date().getTime(); 
    let time_diff =  Math.floor( (timenow - lasttime) / 1000 ); /// sec
    let last_profit =  result.total_profiet;
    let business_data: BusinessData = result.business
    let gapetime_profit = 0
    Object.values(business_data).map( element => {
      if(element.hasManager) {
        let gap_time =  Math.floor( time_diff / Number(element.timeTaken))
        gapetime_profit += ( gap_time  * element.profit * element.quantityPurchased )
      }
    })
    let total_profit = Number(last_profit) + Number(gapetime_profit)
    result.total_profiet = total_profit.toString()
    res.send(result);  

})



app.listen(process.env.PORT, () => { console.log('Example app listening on port 3001!') })


export interface BusinessData {
  id: string;
  name: string;
  price: number;
  timeTaken: number;
  quantityPurchased: number;
  hasManager: boolean;
  isbuy: boolean;
  active: boolean;
  profit: number;
}