"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getCsrfToken } from "@/lib/csrf";

interface PaymentCallbackProps {
  children: React.ReactNode;
}

function PaymentCallback({ children }: PaymentCallbackProps) {
  const [callbackSent, setCallbackSent] = useState(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    const handlePaymentCallback = async () => {
      // Get PayGateTranID from URL parameters
      const payGateTranId = searchParams.get('PayGateTranId') || searchParams.get('PaygateTranId');
      
      if (!payGateTranId || callbackSent) return;

      try {
        // Send callback to our API route
        const response = await fetch('/paymentresult/api/callback', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
          },
          body: JSON.stringify({
            PayGateTranId: payGateTranId
          }),
        });

        if (response.ok) {
          console.log('Payment callback sent successfully');
        } else {
          console.error('Payment callback failed:', response.status);
        }
      } catch (error) {
        console.error('Error sending payment callback:', error);
      } finally {
        setCallbackSent(true);
      }
    };

    // Only send callback for successful payments
    const successful = searchParams.get('successful');
    if (successful === 'true') {
      handlePaymentCallback();
    }
  }, [searchParams, callbackSent]);

  return <>{children}</>;
}

export { PaymentCallback };
