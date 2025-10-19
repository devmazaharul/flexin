import { allProduct } from '@/server/controllers/product';
import { GoogleGenAI } from '@google/genai';


export async function POST(req: Request) {
  try {

  const products = await allProduct();
    const { prompt } = await req.json();

    if (!prompt) {
      return new Response(JSON.stringify({ error: 'Prompt is required' }), { status: 400 });
    }

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    const model = 'gemini-flash-latest';

    const userPrompt = `
তুমি একজন বন্ধুসুলভ AI product recommender।
ব্যবহারকারীর সমস্যা: ${prompt}
নিচের প্রোডাক্টগুলোর মধ্য থেকে সবচেয়ে প্রাসঙ্গিক প্রোডাক্ট সাজেস্ট করো:
${JSON.stringify(products, null, 2)}
যদি কোন মিল না থাকে, নতুন প্রোডাক্ট বানাও না, শুধুমাত্র ছোট নোট দিয়ে সব প্রোডাক্ট তালিকা দেখাও।
`;

    const stream = await ai.models.generateContentStream({
      model,
      contents: [{ role: 'user', parts: [{ text: userPrompt }] }],
    });

    const encoder = new TextEncoder();

    return new Response(
      new ReadableStream({
        async start(controller) {
          try {
            for await (const chunk of stream) {
              if (chunk.text?.trim()) {
                controller.enqueue(encoder.encode(chunk.text));
              }
            }
            controller.close();
          } catch (err: unknown) {
           if(err instanceof Error){
             controller.enqueue(encoder.encode(`[ERROR] ${err.message}`));
            controller.close();
           }else {
            const error=err as {message:string}
             controller.enqueue(encoder.encode(`[ERROR] ${error.message}`));
            controller.close();
           }
          }
        },
      }),
      {
        headers: {
          'Content-Type': 'text/plain; charset=utf-8',
          'Cache-Control': 'no-cache',
          Connection: 'keep-alive',
        },
      }
    );
  } catch (error: unknown) {
    const err=error as {message:string}
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
