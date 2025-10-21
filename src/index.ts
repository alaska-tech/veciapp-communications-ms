import express, { Request, Response } from 'express';
import mailer from './services/mailer';
import dotenv from 'dotenv';
import { responseOk, responseError } from './utils/standardResponseServer';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post('/send-email', async (req: Request, res: Response) => {
  try {
    console.log("Sending email...")
    await mailer(req.body);
    res.status(200).json(responseOk('Email sent successfully'));
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json(responseError('Error sending email'));
  }
});

app.listen(port, () => {
  console.log(`Communications Veciapp Microservice is running on port ${port}`);
});
