/**
 * Redirect user to payment gateway
 * Creates a POST form and submits it to the gateway
 */
export const redirectToPaymentGateway = (refId: string, mobileNumber?: string) => {
  // Create form element
  const form = document.createElement("form");
  form.setAttribute("method", "POST");
  form.setAttribute("action", "https://asan.shaparak.ir");
  form.setAttribute("target", "_self");

  // Create RefId hidden field (required)
  const refIdField = document.createElement("input");
  refIdField.setAttribute("type", "hidden");
  refIdField.setAttribute("name", "RefId");
  refIdField.setAttribute("value", refId);
  form.appendChild(refIdField);

  // Create mobileap hidden field (optional)
  if (mobileNumber) {
    const mobileField = document.createElement("input");
    mobileField.setAttribute("type", "hidden");
    mobileField.setAttribute("name", "mobileap");
    mobileField.setAttribute("value", mobileNumber);
    form.appendChild(mobileField);
  }

  // Append form to body, submit, and remove
  document.body.appendChild(form);
  form.submit();
  document.body.removeChild(form);
};

/**
 * Get RefId from gateway URL
 */
export const getRefIdFromGatewayUrl = (gatewayUrl: string): string | null => {
  try {
    const url = new URL(gatewayUrl);
    return url.searchParams.get('RefId');
  } catch (error) {
    console.error("Error parsing gateway URL:", error);
    return null;
  }
};
