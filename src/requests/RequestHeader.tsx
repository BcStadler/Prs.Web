import { IRequest } from "./IRequest";
import { getTextBackgroundByStatus } from "../utility/formatUtilities";

interface IRequestHeaderProps {
  request: IRequest;
}

function formatDeliveryMode(deliveryMode: string) {
  if (!deliveryMode) return "";
  switch (deliveryMode.trim().toUpperCase()) {
    case "PICKUP":
      return "Pickup";
    case "DELIVERY":
      return "Delivery";
    case "SIGNATURE DELIVERY":
    case "SIGNATURE_DELIVERY":
      return "Signature Delivery";
    default:
      return deliveryMode;
  }
}

function RequestHeader({ request }: IRequestHeaderProps) {
  return (
    <section className="d-flex flex-wrap gap-4 justify-content-between pe-5">
      <dl>
        <dt>Description</dt>
        <dd>{request.description}</dd>
        <dt>Justification</dt>
        <dd>{request.justification}</dd>
      </dl>
      <dl>
        <dt>Delivery Method</dt>
        <dd>{formatDeliveryMode(request.deliveryMode)}</dd>
        <dt>Status</dt>
        <dd>
          <span
            className={`badge ${getTextBackgroundByStatus(request.status)}`}
          >
            {request.status
              ? `${request.status.trim().charAt(0).toUpperCase()}${request.status
                  .trim()
                  .slice(1)
                  .toLowerCase()}`
              : ""}
          </span>
        </dd>
      </dl>
      <dl>
        <dt>Requested By</dt>
        <dd>
          {request.user?.firstName} {request.user?.lastName}
        </dd>
        {request.rejectionReason && (
          <>
            <dt>Rejection Reason</dt>
            <dd>{request.rejectionReason}</dd>
          </>
        )}
      </dl>
    </section>
  );
}

export default RequestHeader;
