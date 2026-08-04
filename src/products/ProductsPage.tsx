import { IProduct } from "./IProduct";

const products: IProduct[] = [
  { id: 1, name: "Loaded Nachos", price: 9.99 },
  { id: 2, name: "Mozzarella Sticks", price: 7.99 },
  { id: 3, name: "Ribeye Steak", price: 24.99 },
];

function ProductsPage() {
  return (
    <section className="content container-fluid mx-5 my-2 py-4">
      <h2 className="pb-4 mb-4 border-bottom border-2">Products</h2>
      <section className="list d-flex flex-row flex-wrap bg-light gap-5 p-4 rounded-4">
        {products.map((product) => (
          <div className="card p-4" style={{ width: "23rem" }} key={product.id}>
            <span className="fs-4 fw-medium">{product.name}</span>
            <span className="fs-5 fw-light">${product.price}</span>
          </div>
        ))}
      </section>
    </section>
  );
}

export default ProductsPage;