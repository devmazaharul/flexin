'use client'

import { verifyAccount } from "@/server/controllers/user";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CheckCircle2, AlertTriangle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function VerifyPage({ token }: { token: string }) {
  const router = useRouter();
  const [status, setStatus] = useState<'loading' | 'success' | 'error' | 'invalid'>('loading');
  const [message, setMessage] = useState('');
  const [countdown, setCountdown] = useState(5);
  const [validated, setValidated] = useState(false);

  useEffect(() => {
    if (!token) {
      setStatus('invalid');
      setMessage('Token is missing from the URL.');
      return;
    }

    if (validated) return;

    const verify = async () => {
      try {
        const result = await verifyAccount(token);
        if (result.status === 200) {
          setStatus('success');
          setMessage('Your email has been verified successfully!');
        } else {
          setStatus('error');
          setMessage('Your verification token is invalid or expired.');
        }
      } catch (err) {
        console.error(err);
        setStatus('error');
        setMessage('Something went wrong. Please try again later.');
      } finally {
        setValidated(true);
      }
    };

    verify();
  }, [token, validated]);

  // Client-side redirect countdown
  useEffect(() => {
    if (status !== 'success') return;
    if (countdown <= 0) {
      router.push('/login');
      return;
    }
    const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [status, countdown, router]);

  const getIcon = () => {
    switch (status) {
      case 'success':
        return <CheckCircle2 className="w-12 h-12 text-green-500" />;
      case 'error':
        return <XCircle className="w-12 h-12 text-red-500" />;
      case 'invalid':
        return <AlertTriangle className="w-12 h-12 text-yellow-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 ">
      <div className="max-w-md w-full p-10 flex flex-col items-center gap-6 transition-all ">
        {getIcon()}

        <h1 className="text-3xl font-bold text-center text-gray-900">
          {status === 'success'
            ? 'Verified!'
            : status === 'error'
            ? 'Verification Failed'
            : 'Warning'}
        </h1>

        <p className="text-center text-gray-700 text-lg">{message}</p>

        {status === 'success' && (
          <p className="text-center text-gray-500 text-sm">
            Redirecting to login in {countdown} second{countdown > 1 ? 's' : ''}
            ...
          </p>
        )}

        <div className="flex flex-col sm:flex-row gap-4 mt-4 w-full justify-center">
          <Link href="/login" passHref>
            <Button className="cursor-pointer" asChild>
              <span>Go to Login</span>
            </Button>
          </Link>

          {status !== 'success' && (
            <Button className="cursor-pointer" variant="secondary" onClick={() => location.reload()}>
              Retry
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
