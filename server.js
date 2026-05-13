import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenerativeAI }
from "@google/generative-ai";

dotenv.config();

const app = express();
app.use(express.static("."));

app.get("/", (req, res) => {
  res.sendFile(process.cwd() + "/index.html");
});
app.use(cors());
app.use(express.json());

const genAI =
new GoogleGenerativeAI(
process.env.GEMINI_API_KEY
);

const model =
genAI.getGenerativeModel({
model:"gemini-2.0-flash"
});

app.post(
"/ai",
async (req,res)=>{

try{

const prompt =
req.body.message;

const result =
await model.generateContent(
prompt
);

const response =
await result.response;

const text =
response.text();

res.json({
reply:text
});

}
catch(error){

res.status(500).json({
error:error.message
});

}

}
);

app.listen(
3000,
()=>{

console.log(
"Secure AI Server Running"
);

}
);