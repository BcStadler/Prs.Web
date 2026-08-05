import { IRequest } from "./IRequest";
import { getTextBackgroundByStatus } from "../utility/formatUtilities";

interface IRequestHeaderProps {
  request: IRequest;
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
        <dt>Total</dt>
        <dd>
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(request.total)}
        </dd>
      </dl>
      <dl>
        <dt>Requested By</dt>
        <dd>
          {request.user?.firstName} {request.user?.lastName}
        </dd>
        <dt>Delivery Mode</dt>
        <dd>{request.deliveryMode}</dd>
        {request.status?.trim().toUpperCase() === "REJECTED" && (
          <>
            <dt>Rejection Reason</dt>
            <dd>{request.rejectionReason || "—"}</dd>
          </>
        )}
      </dl>
    </section>
  );
}

export default RequestHeader;
