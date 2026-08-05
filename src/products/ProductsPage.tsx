import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IProduct } from "./IProduct";
import ProductCard from "./ProductCard";
import ProductCardSkeleton from "./ProductCardSkeleton.tsx";
import { productAPI } from "./ProductAPI";
import toast from "react-hot-toast";

function ProductsPage() {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<IProduct[]>([]);
  const productCardSkeletons = Array.from({ length: 12 }, (_value, index) => (
    <ProductCardSkeleton key={index} />
  ));

  useEffect(() => {
    let active = true;

    const loadProducts = async () => {
      setLoading(true);
      try {
        const data = await productAPI.list();
        if (active) {
          setProducts(data);
        }
      } catch (error) {
        const message =
          error instanceof Error
            ? error.message
            : "An unexpected error occurred.";
        toast.error(message, { duration: 6000 });
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    void loadProducts();

    return () => {
      active = false;
    };
  }, []);

  function removeProduct(deleted: IProduct) {
    setProducts((previousProducts) =>
      previousProducts.filter((product) => product.id !== deleted.id),
    );
  }

  return (
    <section className="content container-fluid mx-5 my-2 py-4">
      <div className="d-flex justify-content-between pb-4 mb-4 border-bottom border-2">
        <h2>Products</h2>
        <Link
          to="/products/create"
          className="btn btn-primary d-inline-flex align-items-center justify-content-center"
          style={{ backgroundColor: "#0d6efd", borderColor: "#0d6efd" }}
        >
          <svg
            className="bi pe-none me-2"
            width={16}
            height={16}
            viewBox="0 0 16 16"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M8 1a.5.5 0 0 1 .5.5v6h6a.5.5 0 0 1 0 1h-6v6a.5.5 0 0 1-1 0v-6h-6a.5.5 0 0 1 0-1h6v-6A.5.5 0 0 1 8 1Z" />
          </svg>
          Create a Product
        </Link>
      </div>
      <section className="list d-flex flex-row flex-wrap bg-light gap-4 p-4 rounded-4">
        {loading && productCardSkeletons}
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onRemove={removeProduct}
          />
        ))}
      </section>
    </section>
  );
}

export default ProductsPage;
