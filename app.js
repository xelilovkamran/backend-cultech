import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";

import OpenAI from "openai";

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI();

async function main(message) {
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content:
          "user will give type of exponent and his adress. you have to give museum name and adress which is near to him. Give all answer in Azerbaijani language. if user gives question which is out of scope, you have to give answer like 'i dont know'",
      },
      {
        role: "user",
        content: message,
      },
    ],
    model: "gpt-3.5-turbo",
  });

  return completion.choices[0];
}

app.post("/chatBot", async (req, res) => {
  const { message } = req.body;
  const data = await main(message);
  res.send(data);
});

app.listen(3001, () => console.log("server started"));
