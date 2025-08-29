"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface VerifyProps {
  message: string;
}

export default function VerifySuccess({ message }: VerifyProps) {
  const router = useRouter();
  const [time, setTime] = useState(5);

  useEffect(() => {
    // Countdown interval
    const interval = setInterval(() => {
      setTime((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Redirect after 5 seconds
    const timer = setTimeout(() => {
      router.push("/login");
    }, 5000);

    // Cleanup
    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [router]);

  return (
    <div className="max-w-md mx-auto mt-28 p-8 rounded-2xl shadow-2xl shadow-gray-200 text-center bg-white transition-all">
      <h1 className="text-2xl font-bold mb-4 text-yellow-700">
        Email Verified Successfully 🎉
      </h1>
      <p className="text-gray-700 text-lg">{message}</p>
      <p className="mt-4 text-sm text-gray-500">
        Redirecting to login page in {time} second{time !== 1 ? "s" : ""}...
      </p>
    </div>
  );
}
