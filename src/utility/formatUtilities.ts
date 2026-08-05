export function getTextBackgroundByStatus(status: string): string {
  switch (status.trim().toUpperCase()) {
    case "NEW":
      return "text-bg-primary";
    case "REVIEW":
      return "text-bg-warning";
    case "APPROVED":
      return "text-bg-success";
    case "REJECTED":
      return "text-bg-danger";
    default:
      return "";
  }
}

export function formatPhoneNumber(phoneNumber: string) {
  if (!phoneNumber) return;
  const area = phoneNumber.substring(0, 3);
  const prefix = phoneNumber.substring(3, 6);
  const line = phoneNumber.substring(6, 10);
  return `(${area}) ${prefix}-${line}`;
}

export function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}