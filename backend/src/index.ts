import express from 'express';
import Groq from 'groq-sdk';
const app = express();

console.log(process.env._API_KEY);

app.use(express.json());

app.post('/api/chat', async (req, res) => {
  const { message } = req.body;
  const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
  console.log('message:-', message);
  const stream = await groq.chat.completions.create({
    messages: [
      {
        role: 'user',
        content: message,
      },
      {
        role: 'system',
        content: 'you are an helpful assistant.',
      },
    ],
    stream: true,
    model: 'llama3-8b-8192',
  });
  for await (const part of stream) {
    const reason = part.choices[0].finish_reason;
    if (reason === 'stop') {
      break;
    }
    const chunk = part.choices[0].delta.content;
    res.write(chunk); //Write each chunk to the open stream
    console.log('chunk->', chunk);
  }

  res.end(); //Close the connection once the streaming is done
});

app.listen(5000, () => {
  console.log('Server is listening on port 5000');
});
