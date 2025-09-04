import { Suspense } from "react";
import VerifyPage from "./Verifypage";

export default async function page({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {

  const params = await searchParams;
  const token = params?.token;


  
  return <Suspense fallback={<div>Loading...</div>}>
    <VerifyPage  token={token!} />
  </Suspense>
}
