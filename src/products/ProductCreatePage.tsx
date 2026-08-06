import ProductForm from "./ProductForm";

function ProductCreatePage() {
  return (
    <section className="content container-fluid mx-5 my-2 py-4">
      <div className="d-flex justify-content-between pb-3 mb-4 border-bottom border-2">
        <h2>New Product</h2>
      </div>
      <ProductForm showPlaceholders={true} />
    </section>
  );
}

export default ProductCreatePage;
