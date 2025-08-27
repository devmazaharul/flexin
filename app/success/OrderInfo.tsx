'use client'
import {
  CheckCircle2,
  ReceiptText,
  Truck,
  ArrowRight,
  CreditCard,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { getEstimatedDelivery } from '@/utils/algorithm';

export type PaymentInfo = {
  method: 'CASH_ON_DELIVERY' | 'BKASH' | 'NAGAD' | string;
  status: 'PENDING' | 'PAID' | 'FAILED' | string;
  transactionId?: string;
};

export type OrderData = {
  id: string;
  createdAt?: string; // ISO
  total: number;
  currency?: string; // e.g., BDT
  status:
    | 'PENDING'
    | 'CONFIRMED'
    | 'PROCESSING'
    | 'COMPLETED'
    | 'CANCELLED'
    | string;

  payment: PaymentInfo;

  estimatedDelivery?: string; // e.g., "Aug 30–Sep 2"
};
// A subtle celebratory confetti-like burst using framer-motion circles
const ConfettiBurst: React.FC = () => {
  const pieces = Array.from({ length: 18 });
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <AnimatePresence>
        {pieces.map((_, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 0, x: 0, scale: 0.6 }}
            animate={{
              opacity: [0, 1, 0],
              y: [-10, -120 - (i % 6) * 15],
              x: [(i - 9) * 12, (i - 9) * 22],
              rotate: (i % 2 === 0 ? 1 : -1) * (120 + i * 10),
              scale: [0.6, 1, 0.6],
            }}
            transition={{ duration: 1.4, ease: 'easeOut', delay: i * 0.02 }}
            className="absolute left-1/2 top-1/3 h-2 w-2 rounded-full bg-gradient-to-br from-white/90 to-white/40 shadow"
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

// Badge helpers
const Badge: React.FC<{
  children: React.ReactNode;
  tone?: 'green' | 'amber' | 'red' | 'gray';
}> = ({ children, tone = 'green' }) => {
  const tones: Record<string, string> = {
    green: 'bg-green-100 text-green-700 border-green-200',
    amber: 'bg-amber-100 text-amber-700 border-amber-200',
    red: 'bg-red-100 text-red-700 border-red-200',
    gray: 'bg-gray-100 text-gray-700 border-gray-200',
  };
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-md border px-2.5 py-1 text-xs font-medium ${tones[tone]}`}
    >
      {children}
    </span>
  );
};


interface order {
  orderID:string;
  status:string;
  Payments:{
    paymentMethod:string;
    status:string

  }
}

export interface orderRes {
  message:string;
  status:number;
  data?:order
}
// Main component
export default  function OrderSuccess({orderinfo}:{orderinfo:orderRes}) {

  const order=orderinfo.data

  return (
    <div className="w-fit mx-auto px-4 py-10">
      <div className="mx-auto ">
        <div className="relative overflow-hidden rounded-3xl    ">
          <ConfettiBurst />
          <div className="relative grid gap-6 p-8 md:grid-cols-[1.2fr_0.8fr] md:p-10">
            <div>
              <div className="mb-4 flex items-center gap-3">
                <motion.div
                  initial={{ scale: 0.6, rotate: -10, opacity: 0 }}
                  animate={{ scale: 1, rotate: 0, opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 280, damping: 18 }}
                  className="rounded-full bg-emerald-100 p-2.5"
                >
                  <CheckCircle2 className="h-6 w-6 text-emerald-600" />
                </motion.div>
                <div>
                  <h1 className="text-xl font-semibold text-gray-900">
                    Order placed successfully
                  </h1>
                  <p className="text-sm text-gray-600">
                    Order ID: <span className="font-mono">{order?.orderID}</span>
                  </p>
                </div>
              </div>

              <div className="mb-6 md:flex  items-center gap-2">
                <Badge tone="green">Status: {order?.status}</Badge>
                <Badge tone={order?.Payments?.status!=="PENDING" ? 'green' : 'amber'}>
                  <CreditCard className="mr-1 h-3.5 w-3.5" /> Payment:{' '}
                  {order?.Payments?.status}
                </Badge>
                <Badge tone="gray">Method: {order?.Payments.paymentMethod}</Badge>
              </div>

              <div className="rounded-2xl p-4 ">
                <div className="flex items-center gap-3 text-sm text-gray-700">
                  <Truck className="h-4 w-4" />
                  Estimated delivery:{' '}
                  <span className="font-medium text-gray-900">
                {getEstimatedDelivery(3)}
                  </span>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <Button className="cursor-pointer" variant={'default'}>
                  <Truck className="h-4 w-4" /> Track order
                </Button>
                <Button variant={'ghost'} className="cursor-pointer">
                  <ReceiptText className="h-4 w-4" /> View invoice
                </Button>
               <Link href={"/products"}>
                <Button variant={'secondary'} className="cursor-pointer">
                  <ArrowRight className="h-4 w-4" /> Continue shopping
                </Button>
               </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
