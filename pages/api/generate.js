import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

var basePromptPrefix = "";

const generateAction = async (req, res) => {
  // Run first prompt
  console.log(`API: ${basePromptPrefix}${req.body.userInput}`)

  const baseCompletion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `${basePromptPrefix}${req.body.userInput}`,
    temperature: 0.7,
    max_tokens: 1000,
  });
  
  const basePromptOutput = baseCompletion.data.choices.pop();

   var op=basePromptOutput.text.trim();
console.log("trimmed text:",op);
  res.status(200).json({ output: basePromptOutput });
  basePromptPrefix+=op+"";
  console.log("Prefix:",basePromptPrefix);
};

export default generateAction;