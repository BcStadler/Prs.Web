import RequestLineForm from "./RequestLineForm";

function RequestLineEditPage() {
  return (
    <section className="content p-4 flex-grow-1">
      <div className="d-flex justify-content-between pb-4 mb-5 border-bottom border-2">
        <h2>Edit Request Line</h2>
      </div>
      <RequestLineForm />
    </section>
  );
}

export default RequestLineEditPage;