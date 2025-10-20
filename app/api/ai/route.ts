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
তুমি একজন বন্ধুসুলভ এবং সহায়ক AI প্রোডাক্ট রিকমেন্ডার।  
তোমার একমাত্র কাজ হলো ব্যবহারকারীর সমস্যার সাথে সম্পর্কিত প্রোডাক্ট সাজেস্ট করা।  

🧩 ব্যবহারকারীর সমস্যা:
"${prompt}"

🛍️ নিচের প্রোডাক্ট তালিকা থেকে শুধুমাত্র প্রাসঙ্গিক প্রোডাক্ট নির্বাচন করো:
${JSON.stringify(products, null, 2)}

📋 নির্দেশাবলী:
1️⃣ ব্যবহারকারীর সমস্যার উপর সর্বোচ্চ 2-3 লাইনে সংক্ষিপ্ত আলোচনা দাও।  
2️⃣ শুধুমাত্র প্রাসঙ্গিক প্রোডাক্ট সাজেস্ট করো — প্রতিটি প্রোডাক্টের নাম ও সংক্ষিপ্ত বর্ণনা দাও।  
3️⃣  স্টক, লিংক বা ইমেজ সম্পর্কে কিছুই উল্লেখ করবে না।  
4️⃣ যদি উপযুক্ত প্রোডাক্ট না পাও, নতুন কিছু বানাবে না — বরং বলবে:
   "তোমার সমস্যার সাথে সরাসরি মেলে এমন প্রোডাক্ট পাইনি, তবে নিচের প্রোডাক্টগুলো দেখতে পারো।"
5️⃣ উত্তরটি সর্বদা বাংলায়, বন্ধুসুলভ ও সুন্দর ফরম্যাটে দাও (emoji ব্যবহার করা যেতে পারে)।  

উত্তরটি নিচের ফরম্যাটে দাও:
-------------------------------------
💬 সংক্ষিপ্ত আলোচনা:  
<২–৩ লাইনের ব্যাখ্যা>

✨ প্রস্তাবিত প্রোডাক্টসমূহ:
- 🦷 **প্রোডাক্ট নাম** — সংক্ষিপ্ত বিবরণ
- 🌿 **প্রোডাক্ট নাম** — সংক্ষিপ্ত বিবরণ
-------------------------------------
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
