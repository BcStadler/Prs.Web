import ProductForm from "./ProductForm";

function ProductEditPage() {
  return (
    <section className="content p-4 flex-grow-1">
      <div className="d-flex justify-content-between pb-3 mb-4 border-bottom border-2">
        <h2>Edit Product</h2>
      </div>
      <ProductForm showPlaceholders={false} />
    </section>
  );
}

export default ProductEditPage;
