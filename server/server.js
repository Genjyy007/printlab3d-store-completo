import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();
const __dirname=path.dirname(fileURLToPath(import.meta.url));
const app=express();
const PORT=process.env.PORT||3000;
const upload=multer({dest:path.join(__dirname,'uploads'),limits:{fileSize:50*1024*1024}});
app.use(cors({origin:true}));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'..')));

app.get('/api/health',(req,res)=>res.json({ok:true,service:'printlab3d',time:new Date().toISOString()}));
app.post('/api/quotes',upload.single('file'),(req,res)=>{
  if(!req.file)return res.status(400).json({error:'Arquivo 3D não enviado'});
  const qty=Math.max(1,Number(req.body.quantity||1));
  const material=req.body.material||'PLA';
  const rate={PLA:.085,PETG:.11,ABS:.105,Resina:.22}[material]??.085;
  const estWeight=Math.max(30,Math.round(42+(req.file.size/1024/1024)*55));
  const hours=estWeight/23;
  const total=((estWeight*rate)+(hours*2.15)+5)*qty;
  res.json({success:true,file:req.file.originalname,estimatedWeightGrams:estWeight,estimatedHours:Number(hours.toFixed(2)),estimatedTotal:Number(total.toFixed(2)),reviewRequired:true});
});
app.post('/api/orders',(req,res)=>{
  const body=req.body;
  if(!body?.items?.length)return res.status(400).json({error:'Carrinho vazio'});
  const id='PL'+Date.now().toString().slice(-8);
  res.status(201).json({success:true,orderId:id,status:'created',next:'payment'});
});
app.post('/api/shipping/quote',(req,res)=>{
  const cep=String(req.body.cep||'').replace(/\D/g,'');
  if(cep.length!==8)return res.status(400).json({error:'CEP inválido'});
  const prefix=Number(cep.slice(0,3));
  const amount=prefix<400?14.9:prefix<600?19.9:prefix<900?24.9:17.9;
  res.json({options:[{service:'Econômico',price:amount,days:'5-8'},{service:'Expresso',price:Number((amount+12).toFixed(2)),days:'2-4'},{service:'Retirada',price:0,days:'1-2'}]});
});
app.listen(PORT,()=>console.log(`PrintLab API em http://localhost:${PORT}`));
