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

const requestStatuses = ["NEW", "REVIEW", "APPROVED", "REJECTED"] as const;

export function normalizeRequestStatus(status?: string) {
  if (!status) return "";

  const normalized = status.trim().toUpperCase().replace(/\s+/g, "_");
  return requestStatuses.includes(
    normalized as (typeof requestStatuses)[number],
  )
    ? normalized
    : status;
}

export function formatRequestStatus(status?: string) {
  const normalized = normalizeRequestStatus(status);
  if (!normalized) return "";

  return normalized.charAt(0) + normalized.slice(1).toLowerCase();
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
