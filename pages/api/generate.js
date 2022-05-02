import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  const completion = await openai.createCompletion("text-davinci-002", {
    prompt: generatePrompt(req.body.text),
    temperature: 0.6,
  });
  res.status(200).json({ result: completion.data.choices[0].text });
}

function generatePrompt(text) {
  const capitalizedText =
    text[0].toUpperCase() + text.slice(1).toLowerCase();
  return `Suggest a product description for ${capitalizedText}
    text: ${capitalizedText}
    Description:
  `;
  
}
