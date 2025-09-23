import { log } from "next-axiom";
import { v7 as uuidv7 } from "uuid";

const bdPhoneRegex = /^(?:\+?88)?01[3-9]\d{8}$/; // BD mobile
const postCodeRegex = /^\d{4,5}$/;              // 4–5 digits
const EmailRegex =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,}$/;

type LogLevel = "info" | "error" | "warn" | "debug";

 const generateLog = (message: string, level: LogLevel = "info") => {
  const logId = uuidv7(); // unique + time sortable

  // Axiom এ log পাঠানো হচ্ছে
  log[level](`${message}`, {
    logId,         // unique log id
    timestamp: new Date().toISOString(),
  });

  return logId; // চাইলে বাইরে রিটার্ন করতে পারো
};


 const formatPrice = (
  value: number,
  options?: {
    locale?: string;
    currency?: string;
  }
): string => {
  const {
    locale = "en-US",
    currency = "BDT",
  } = options || {};

  try {
    const formattedValue = new Intl.NumberFormat(locale, {
      style: "currency",
      currency,
      maximumFractionDigits: 0, 
    }).format(value);

    // BDT চিহ্নের আগে স্পেস যোগ করা
   // return formattedValue
    return formattedValue.replace('BDT', '৳').replace('$', '৳');
    
  } catch (error) {
    console.error("Error formatting price:", error);
    return `${value} ${currency}`;
  }
};

export {
  bdPhoneRegex,
  postCodeRegex,
generateLog,
EmailRegex,
formatPrice
}