import { AxiosResponse } from "axios";
import _ApiServices from "./apiServices";

// Type definitions
interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  handler: (response: RazorpayResponse) => Promise<void>;
  prefill: {
    name: string;
    email: string;
  };
  notes: {
    address: string;
  };
  theme: {
    color: string;
  };
}

interface RazorpayResponse {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

interface CreateOrderResponse {
  amount: number; // in paise, so 25400 = ₹254
  currency: "INR"; // You can generalize as string if needed
  orderId: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
  message: string;
  success: boolean;
}

interface VerifyPaymentResponse {
  success: boolean;
  message?: string;
}

declare global {
  interface Window {
    Razorpay: {
      new (options: RazorpayOptions): RazorpayInstance;
    };
  }
}

interface RazorpayInstance {
  open: () => void;
  close: () => void;
}

class PaymentService {
  private razorpayScriptUrl: string =
    "https://checkout.razorpay.com/v1/checkout.js";

  constructor() {}

  /**
   * Loads Razorpay script dynamically
   */
  public loadRazorpayScript = (): Promise<boolean> => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }

      const script = document.createElement("script");
      script.src = this.razorpayScriptUrl;
      script.async = true;
      script.onload = () => resolve(true);
      script.onerror = () => {
        console.error("Failed to load Razorpay SDK");
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  /**
   * Initiates Razorpay payment process
   * @param amount Payment amount in INR
   * @param userDetails User information for prefill
   */
  public initiatePayment = async (
    amount: number,
    days: number,
    userDetails: {
      name: string;
      email: string;
    },
    planid: string
  ): Promise<void> => {
    try {
      // Load Razorpay script
      const isScriptLoaded = await this.loadRazorpayScript();
      if (!isScriptLoaded) {
        throw new Error(
          "Razorpay SDK failed to load. Please check your internet connection."
        );
      }

      // Create order on backend
      const orderResponse: AxiosResponse<CreateOrderResponse> =
        await new _ApiServices("/payment/create", {
          price: amount,
          days: days,
          planid,
        })._handlePostRequest();

      if (!orderResponse.data.orderId) {
        throw new Error("Failed to create payment order");
      }
      console.log(orderResponse);
      const options: RazorpayOptions = {
        key: "rrzp_test_YBsfgwjyfdPylx",
        amount: orderResponse.data.amount,
        currency: orderResponse.data.currency,
        name: "Mentorsland",
        description: "Course Purchase",
        order_id: orderResponse.data.orderId,
        handler: this.handlePaymentVerification,
        prefill: {
          name: userDetails.name,
          email: userDetails.email,
        },

        notes: {
          address: "Mentorsland HQ",
        },
        theme: {
          color: "#528FF0",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Payment initiation failed:", error);
      throw error;
    }
  };

  /**
   * Handles payment verification after successful transaction
   */
  private handlePaymentVerification = async (
    response: RazorpayResponse
  ): Promise<void> => {
    try {
      const verifyResponse: AxiosResponse<VerifyPaymentResponse> =
        await new _ApiServices(
          "/transaction/verify",
          response
        )._handlePostRequest();

      if (!verifyResponse.data.success) {
        throw new Error(
          verifyResponse.data.message || "Payment verification failed"
        );
      }

      // Payment successful
      return;
    } catch (error) {
      console.error("Payment verification error:", error);
      throw error;
    }
  };
}

export default new PaymentService();
