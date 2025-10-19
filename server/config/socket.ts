import { Server as IOServer } from 'socket.io';
import { GoogleGenAI } from '@google/genai';

const products = [
  { name: 'MazaTooth Pro', desc: 'Whitens teeth & strengthens enamel' },
  { name: 'FreshMint Mouthwash', desc: 'Removes bad breath instantly' },
  { name: 'DentalCare Brush', desc: 'Smart electric brush with timer' },
];

export function initSocket(server: any) {
  const io = new IOServer(server, { cors: { origin: '*' } });

  io.on('connection', (socket) => {
    console.log('Client connected:', socket.id);

    socket.on('generate', async (prompt: string) => {
      if (!prompt.trim()) return;

      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const model = 'gemini-flash-latest';

      const userPrompt = `
তুমি একজন বন্ধুসুলভ AI product recommender।
User's problem: ${prompt}
Products: ${JSON.stringify(products, null, 2)}
উত্তর বাংলায় দাও।
`;

      try {
        const aiStream = await ai.models.generateContentStream({
          model,
          contents: [{ role: 'user', parts: [{ text: userPrompt }] }],
        });

        for await (const chunk of aiStream) {
          if (chunk.text?.trim()) socket.emit('chunk', chunk.text.trim());
        }

        socket.emit('done');
      } catch (err: any) {
        socket.emit('error', err.message);
      }
    });

    socket.on('disconnect', () => console.log('Client disconnected:', socket.id));
  });

  return io;
}
