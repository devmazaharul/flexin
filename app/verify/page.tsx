// app/verify/page.tsx
import { verifyAccount } from "@/server/controllers/user";
import VerifySuccess from "./VerifySuccess";


export default async function VerifyPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { token } = await searchParams;

  const containerClass =
    "max-w-md mx-auto mt-28 p-8 rounded-2xl shadow-2xl shadow-gray-200 text-center transition-all";

  const renderCard = (title: string, message: string, bgClass: string, textClass: string) => (
    <div className={`${containerClass} ${bgClass}`}>
      <h1 className={`text-2xl font-bold mb-4 ${textClass}`}>{title}</h1>
      <p className={`text-lg ${textClass}`}>{message}</p>
    </div>
  );

  // Token missing
  if (!token) {
    return renderCard(
      "Invalid Token",
      "Token is missing from the URL.",
      "bg-yellow-50",
      "text-yellow-700"
    );
  }

  let result;
  try {
    result = await verifyAccount(token as string);
  } catch (err) {
    console.error("Verification error:", err);
    return renderCard(
      "Something went wrong",
      "We couldn't verify your email at this time. Please try again later.",
      "bg-yellow-50",
      "text-yellow-700"
    );
  }

  if (result.status !== 200) {
    return renderCard(
      "Unauthorized",
      "Your verification token is invalid or has expired.",
      "bg-red-50",
      "text-red-700"
    );
  }

  // Success → Client-side redirect in 5s
  return <VerifySuccess message="Your email has been verified. You can now log in." />;
}
