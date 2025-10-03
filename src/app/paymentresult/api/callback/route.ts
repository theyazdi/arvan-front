import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    // Log headers for debugging
    console.log('Request headers:', {
      origin: request.headers.get('origin'),
      'x-forwarded-host': request.headers.get('x-forwarded-host'),
      'x-forwarded-for': request.headers.get('x-forwarded-for'),
      host: request.headers.get('host'),
    });

    // Get invoice from URL parameters
    const url = new URL(request.url);
    const invoice = url.searchParams.get('invoice');
    
    // Parse form data from payment gateway
    const formData = await request.formData();
    
    // Extract PayGateTranId from the gateway response
    const payGateTranId = formData.get('PayGateTranID')?.toString();
    const returningParams = formData.get('ReturningParams')?.toString();
    const merchantFee = formData.get('MerchantShaparakFee')?.toString();
    
    console.log('Payment callback received:', {
      invoice,
      payGateTranId,
      returningParams,
      merchantFee
    });
    
    if (!payGateTranId) {
      return NextResponse.json(
        { error: "PayGateTranId is required" },
        { status: 400 }
      );
    }

    if (!invoice) {
      return NextResponse.json(
        { error: "Invoice is required" },
        { status: 400 }
      );
    }

    // Get CSRF token directly (not using server action)
    let csrfToken = "";
    try {
      const csrfResponse = await fetch('https://api.arvantravels.com/user/csrf/', {
        method: "GET",
        credentials: "include",
      });
      
      if (csrfResponse.ok) {
        const csrfData = await csrfResponse.json();
        csrfToken = csrfData.csrfToken || "";
      }
    } catch (error) {
      console.error("Error getting CSRF token:", error);
    }
    
    // Forward the callback to the backend API
    const response = await fetch('https://api.arvantravels.com/payment/callback', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json',
        ...(csrfToken && { 'X-CSRFTOKEN': csrfToken }),
      },
      body: JSON.stringify({
        invoice: invoice,
        PayGateTranID: payGateTranId
      }),
    });

    const data = await response.json();
    console.log('Backend API response:', data);

    // Determine success status based on backend response
    const isSuccess = data.success === true;
    const message = data.message || (isSuccess ? 'پرداخت با موفقیت انجام شد' : 'پرداخت با مشکل مواجه شد');
    
    // Return HTML response for payment gateway
    const htmlResponse = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Payment Callback</title>
      </head>
      <body>
        <h1>Payment callback processed</h1>
        <p>Invoice: ${invoice}</p>
        <p>PayGateTranID: ${payGateTranId}</p>
        <p>Status: ${isSuccess ? 'Success' : 'Failed'}</p>
        <p>Message: ${message}</p>
        <script>
          // Redirect to payment result page with proper status
          window.location.href = '/paymentresult?successful=${isSuccess}&PaygateTranId=${payGateTranId}&invoice=${invoice}&message=${encodeURIComponent(message)}';
        </script>
      </body>
      </html>
    `;
    
    return new NextResponse(htmlResponse, {
      status: 200,
      headers: {
        'Content-Type': 'text/html',
      },
    });
  } catch (error) {
    console.error('Payment callback error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
