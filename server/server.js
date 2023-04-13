/*imports */
import express from "express";
import cors from "cors";
import morgan from "morgan";
import bodyParser from "body-parser";
import { connect } from "./database/connection.js";
// import router from "./router/router.js";
import dotenv from 'dotenv'
import path from 'path'
import {fileURLToPath} from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '.env') });

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));
app.disable('x-powered-by');
app.use(bodyParser.json());
app.use(express.urlencoded());

const port = process.env.PORT || 3000;

app.get('/',(req,res)=>{
    res.status(201).json("HOME");
});

/**routes */
// app.use('/api',router);

/*start server after db connected */
connect().then(()=>{
    try{
        app.listen(port,()=>{
            console.log(`SERVER CONNENTED TO http://localhost:${port}`);
        });

    }catch(err){
        console.log("CANNOT CONNERT ERROR:" + err);
    }
}).catch(err=>{
    console.log("NO CONNECTION. ERROR: " + err);
})

