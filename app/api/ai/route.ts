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
তুমি একজন বন্ধুসুলভ এবং নিরাপদ AI product recommender। 
ব্যবহারকারীর সমস্যা: "${prompt}" 
1️⃣ সমস্যার উপর সর্বোচ্চ 3 লাইনে সংক্ষিপ্ত ও সহায়ক আলোচনা করো। 
2️⃣ শুধুমাত্র নিচের প্রোডাক্টগুলো যাচাই করো এবং প্রাসঙ্গিক প্রোডাক্ট সাজেস্ট করো:
${JSON.stringify(products, null, 2)}
3️⃣ যদি কোনো প্রোডাক্ট পুরোপুরি প্রাসঙ্গিক না হয়, নতুন প্রোডাক্ট বানিও না; 
   শুধুমাত্র ছোট একটি নোট দিয়ে সব প্রোডাক্টের তালিকা দেখাও। 

✅ কখনোই sensitive তথ্য বা image URL সরবরাহ করবে না। 
সার্বিকভাবে উত্তর বাংলায় এবং সহজে পড়ার মতো হওয়া উচিত।
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
