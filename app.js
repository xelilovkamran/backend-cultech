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
          "you will be used as a chatbot in web-site. User may input type of historical exponents (optional) which he wants to see inside his text. You will detect museums or some other places where person can see exponetent related to type of inputed exponent. if user input his current place, you will filter these places acoording to user's current adress. if user does not input his current adress, take adress as center of Baku city. you have to give some response as name of places and their addresses and also give information that in the list form (one under another), person how much time spend to go there by using these instructions. If you can't find any place, you have to give some response as 'I can't find any place related to your request'. If question is not related to your task, you have to provide some response as 'I am not using for these purposes'.",
      },
      {
        role: "user",
        content: message,
      },
    ],
    model: "gpt-4",
  });

  return completion.choices[0];
}

app.get("/", (req, res) => {
  res.send({ message: "Hello World" });
});

app.post("/chatBot", async (req, res) => {
  const { message } = req.body;
  const data = await main(message);
  res.send(data);
});

app.listen(3001, () => console.log("server started"));
