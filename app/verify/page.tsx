import VerifyPage from "./Verifypage";

export default async function page({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {

  const params = await searchParams;
  const token = params?.token;


  
  return <VerifyPage  token={token!} />;
}
