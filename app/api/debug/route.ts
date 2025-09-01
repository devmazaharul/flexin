export async function GET() {
  return Response.json({
    AXIOM_TOKEN: process.env.AXIOM_TOKEN ? "✅ Found" : "❌ Missing",
    AXIOM_DATASET: process.env.AXIOM_DATASET || "❌ Missing",
    NODE_ENV: process.env.NODE_ENV,
  });
}
