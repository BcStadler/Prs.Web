import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { IRequest } from "./IRequest";
import { requestsAPI } from "./RequestAPI";
import RequestHeader from "./RequestHeader";
import { IRequestLine } from "../requestLines/IRequestLine";
import { requestLineAPI } from "../requestLines/RequestLineAPI";
import { formatCurrency } from "../utility/formatUtilities";
import { useUserContext } from "../App";

interface IRejectForm {
  rejectionReason: string | undefined;
}

function getErrorMessage(error: unknown) {
  return error instanceof Error
    ? error.message
    : "An unexpected error occurred.";
}

function RequestDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useUserContext();
  const [loading, setLoading] = useState(false);
  const [request, setRequest] = useState<IRequest | undefined>(undefined);
  const [isRejectOpen, setIsRejectOpen] = useState(false);
  const [requestLineToDelete, setRequestLineToDelete] = useState<
    IRequestLine | undefined
  >(undefined);
  const normalizedStatus = !request?.status
    ? ""
    : request.status.trim().toUpperCase();
  const isOwnRequest = request?.userId === user?.id;
  const requestLines = request?.requestLines ?? [];
  const runningTotal = requestLines.reduce(
    (total, line) => total + (line.product?.price ?? 0) * line.quantity,
    0,
  );
  const openReject = () => setIsRejectOpen(true);
  const closeReject = () => setIsRejectOpen(false);
  const handleShowDeleteLineModal = (requestLine: IRequestLine) =>
    setRequestLineToDelete(requestLine);
  const handleCloseDeleteLineModal = () => setRequestLineToDelete(undefined);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRejectForm>({
    defaultValues: async () => ({ rejectionReason: undefined }),
  });

  const loadRequest = async () => {
    setLoading(true);
    try {
      const fetchedRequest = await requestsAPI.find(Number(id));
      setRequest(fetchedRequest);
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  async function sendToReview() {
    if (!request?.id) return;

    setLoading(true);
    try {
      if (runningTotal <= 50) {
        await requestsAPI.approve(request.id);
      } else {
        await requestsAPI.review(request.id);
      }
      toast.success("Successfully saved.");
      navigate("/requests");
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  }

  async function markApproved() {
    if (!request?.id) return;

    setLoading(true);
    try {
      await requestsAPI.approve(request.id);
      toast.success("Successfully saved.");
      navigate("/requests");
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  }

  const saveReject: SubmitHandler<IRejectForm> = async (form) => {
    if (!request?.id || !form.rejectionReason) return;

    try {
      await requestsAPI.reject(request.id, form.rejectionReason);
      setIsRejectOpen(false);
      toast.success("Successfully saved.");
      navigate("/requests");
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  async function removeRequestLine() {
    if (!requestLineToDelete?.id) return;

    try {
      await requestLineAPI.delete(requestLineToDelete.id);
      setRequestLineToDelete(undefined);
      toast.success("Successfully deleted.");
      await loadRequest();
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  }

  useEffect(() => {
    void loadRequest();
  }, [id]);

  return (
    <section className="content p-4 flex-grow-1">
      <Modal show={isRejectOpen} onHide={closeReject}>
        <Modal.Header closeButton>
          <Modal.Title>Reject Request</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit(saveReject)}>
            <div className="mb-3">
              <label className="form-label" htmlFor="rejectionReason">
                Rejection Reason
              </label>
              <textarea
                {...register("rejectionReason", {
                  required: "Rejection reason is required",
                })}
                className={`form-control ${errors?.rejectionReason && "is-invalid"}`}
                id="rejectionReason"
                rows={6}
              ></textarea>
              <div className="invalid-feedback">
                {errors?.rejectionReason?.message}
              </div>
            </div>
            <div className="d-flex justify-content-end gap-2">
              <button
                type="button"
                className="btn btn-outline-primary"
                onClick={closeReject}
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary action-button">
                <i className="bi bi-save me-2" aria-hidden="true" />
                Save
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
      <Modal show={!!requestLineToDelete} onHide={handleCloseDeleteLineModal}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Request Line</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete this request line?</p>
          <div className="d-flex justify-content-end gap-2">
            <button
              type="button"
              className="btn btn-outline-primary"
              onClick={handleCloseDeleteLineModal}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={removeRequestLine}
            >
              Delete
            </button>
          </div>
        </Modal.Body>
      </Modal>
      <div className="d-flex justify-content-between pb-4 mb-4 border-bottom border-2">
        <h2>Request</h2>
        <div className="d-flex justify-content-end gap-2">
          {normalizedStatus === "NEW" && (
            <button className="btn btn-primary" onClick={sendToReview}>
              Send for Review
            </button>
          )}
          {normalizedStatus === "REVIEW" && (
            <>
              <button
                className="btn btn-primary"
                onClick={markApproved}
                disabled={isOwnRequest}
              >
                Approve
              </button>
              <button
                className="btn btn-outline-danger"
                onClick={openReject}
                disabled={isOwnRequest}
              >
                Reject
              </button>
            </>
          )}
          {request?.id && (
            <Link
              to={`/requests/edit/${request.id}`}
              className="btn btn-outline-primary icon-button-square"
              aria-label="Edit request"
            >
              <svg
                className="bi"
                width={16}
                height={16}
                viewBox="0 0 16 16"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10L3 14l.146-2.854 10-10zM11.207 2 4 9.207V12h2.793L14 4.793 11.207 2z" />
              </svg>
            </Link>
          )}
        </div>
      </div>
      {normalizedStatus === "REVIEW" && isOwnRequest && (
        <div className="alert alert-warning" role="alert">
          You cannot approve or reject your own request.
        </div>
      )}
      {loading && <p>Loading…</p>}
      {request && <RequestHeader request={request} />}
      {request && (
        <div className="card p-4 mt-5">
          <h5 className="card-title">Items</h5>
          <div className="table-responsive">
            <table className="table align-middle mb-0">
              <thead>
                <tr>
                  <th scope="col">Product</th>
                  <th scope="col">Price</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Amount</th>
                  <th scope="col" />
                </tr>
              </thead>
              <tbody>
                {requestLines.length === 0 && (
                  <tr>
                    <td colSpan={5} className="text-body-secondary py-4">
                      No lines added yet.
                    </td>
                  </tr>
                )}
                {requestLines.map((requestLine) => (
                  <tr key={requestLine.id}>
                    <td>{requestLine.product?.name}</td>
                    <td>{formatCurrency(requestLine.product?.price ?? 0)}</td>
                    <td>{requestLine.quantity}</td>
                    <td>
                      {formatCurrency(
                        (requestLine.product?.price ?? 0) *
                          requestLine.quantity,
                      )}
                    </td>
                    <td>
                      <div className="d-flex gap-2 justify-content-end">
                        <Link
                          to={`/requests/detail/${request.id}/requestline/edit/${requestLine.id}`}
                          className="btn btn-outline-primary btn-sm icon-button-square"
                          aria-label="Edit request line"
                        >
                          <svg
                            className="bi"
                            width={16}
                            height={16}
                            viewBox="0 0 16 16"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10L3 14l.146-2.854 10-10zM11.207 2 4 9.207V12h2.793L14 4.793 11.207 2z" />
                          </svg>
                        </Link>
                        <button
                          type="button"
                          className="btn btn-outline-danger btn-sm"
                          aria-label="Delete request line"
                          onClick={() => handleShowDeleteLineModal(requestLine)}
                        >
                          <svg
                            className="bi"
                            width={16}
                            height={16}
                            viewBox="0 0 16 16"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5.5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Zm2.5-.5A.5.5 0 0 1 11 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Z" />
                            <path d="M14.5 3a1 1 0 0 1-1 1h-1v9a2 2 0 0 1-2 2h-5a2 2 0 0 1-2-2V4h-1a1 1 0 1 1 0-2h3.086a1 1 0 0 1 .707-.293h3.414a1 1 0 0 1 .707.293H13.5a1 1 0 0 1 1 1Zm-10 1v9a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1V4h-7Z" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td>
                    <Link
                      to={`/requests/detail/${request.id}/requestline/create`}
                      className="btn btn-outline-primary action-button"
                    >
                      <i className="bi bi-plus-lg me-2" aria-hidden="true" />
                      Add a line
                    </Link>
                  </td>
                  <td className="fw-semibold">
                    {formatCurrency(runningTotal)}
                  </td>
                  <td />
                  <td />
                  <td />
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      )}
    </section>
  );
}

export default RequestDetailPage;
