import { handleError } from '../responce/error';

const bkashPaymentProcess = async () => {
  try {
  } catch (error) {
    throw handleError(error);
  }
};
const mazaPaymentProcess = async (amount: string) => {
  try {
  } catch (error) {
    throw handleError(error);
  }
};

export { bkashPaymentProcess, mazaPaymentProcess };
