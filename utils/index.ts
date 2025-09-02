import { log } from "next-axiom";
import { v7 as uuidv7 } from "uuid";

const bdPhoneRegex = /^(?:\+?88)?01[3-9]\d{8}$/; // BD mobile
const postCodeRegex = /^\d{4,5}$/;              // 4–5 digits



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

export {
  bdPhoneRegex,
  postCodeRegex,
generateLog
}