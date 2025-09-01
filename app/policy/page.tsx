import React from "react";

export const dynamic = "force-dynamic"; // ✅ always runtime এ fetch হবে, build এ pre-render হবে না

export default async function Page() {
  let data: any = null;

  try {
    const res = await fetch("https://flexin.mazaharul.site/api/debug", {
      cache: "no-store", // ✅ ensure fresh data (optional)
    });

    if (!res.ok) {
      console.error("❌ API Error:", res.status, res.statusText);
    } else {
      data = await res.json();
    }
  } catch (err) {
    console.error("❌ Fetch failed:", err);
  }

  return (
    <div>
      <h1 className="text-xl font-bold">This is Policy Page</h1>
      <pre className="mt-4 bg-gray-100 p-2 rounded text-sm">
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
}
