import VendorForm from "./VendorForm";

function VendorCreatePage() {
  return (
    <section className="content p-4 flex-grow-1">
      <div className="d-flex justify-content-between pb-4 mb-5 border-bottom border-2">
        <h2>New Vendor</h2>
      </div>
      <VendorForm showPlaceholders={true} />
    </section>
  );
}

export default VendorCreatePage;
