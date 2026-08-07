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
    <section className="content p-4 flex-grow-1">
      <div className="d-flex justify-content-between align-items-center pb-4 mb-4 border-bottom border-2">
        <h2>Products</h2>
        <Link to="/products/create" className="btn btn-primary action-button">
          <i className="bi bi-plus-lg me-2" aria-hidden="true" />
          Create A Product
        </Link>
      </div>
      <section className="list d-flex flex-row flex-wrap bg-light gap-5 p-4">
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
