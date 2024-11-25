import express from 'express';
import router from './routes/index';
import morgan from 'morgan';
import cors, { CorsOptions } from 'cors';
import connectDB from './config/dbConnection';
import cookieParser from 'cookie-parser';
import { errorHandler } from './utils/errors/errorHandler';
import { User } from './models/userModel';
import * as dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;


app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


const corsOptions : CorsOptions = {
  origin:[process.env.FONTENT_URL||"",'https://task-management-client.vercel.app'],
  methods: ['GET', 'POST', 'PUT', 'DELETE','PATCH'],
  credentials: true,
};

app.use(cors(corsOptions));

// connect Db--------------
connectDB()

// Use routes
app.use('/api', router); 

// Test route to ensure server is working
app.get('/clear', (req, res) => {
  User.deleteMany({}).then(()=>{
    console.log('deleted');
    
  })
});

app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
