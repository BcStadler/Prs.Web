import RequestForm from "./RequestForm";

function RequestEditPage() {
  return (
    <section className="content p-4 flex-grow-1">
      <div className="d-flex justify-content-between pb-4 mb-5 border-bottom border-2">
        <h2>Edit Request</h2>
      </div>
      <RequestForm />
    </section>
  );
}

export default RequestEditPage;