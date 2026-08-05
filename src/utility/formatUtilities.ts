export function getTextBackgroundByStatus(status: string): string {
  switch (status) {
    case "PLACED":
      return "text-bg-secondary";
    case "PREPARING":
      return "text-bg-warning";
    case "READY":
      return "text-bg-info";
    case "APPROVED":
      return "text-bg-success";
    case "CANCELLED":
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
