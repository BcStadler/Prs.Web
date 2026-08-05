import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { IProduct } from "../products/IProduct";
import { productAPI } from "../products/ProductAPI";
import { IRequestLine } from "./IRequestLine";
import { requestLineAPI } from "./RequestLineAPI";

function RequestLineForm() {
  const { itemId, id } = useParams<{ itemId: string; id: string }>();
  const navigate = useNavigate();
  const [products, setProducts] = useState<IProduct[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<IProduct | undefined>(
    undefined,
  );
  const requestLineId = Number(itemId);
  const requestId = Number(id);

  const emptyRequestLine: IRequestLine = {
    id: undefined,
    quantity: 0,
    notes: undefined,
    requestId: requestLineId,
    productId: 0,
    product: undefined,
    request: undefined,
  };

  async function loadProducts() {
    setProducts(await productAPI.list());
  }

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IRequestLine>({
    defaultValues: async () => {
      await loadProducts();
      if (!itemId) {
        return emptyRequestLine;
      }

      return await requestLineAPI.find(requestLineId);
    },
  });

  const productId = watch("productId");
  const quantity = watch("quantity");
  const currencyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  useEffect(() => {
    const currentProduct = products.find(
      (product) => product?.id === productId,
    );
    setSelectedProduct(currentProduct);
  }, [productId, products]);

  const save: SubmitHandler<IRequestLine> = async (requestline) => {
    try {
      delete requestline.product;
      delete requestline.request;

      if (!requestline.id) {
        requestline = await requestLineAPI.post(requestline);
      } else {
        await requestLineAPI.put(requestline);
      }
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "An unexpected error occurred.";
      toast.error(message, { duration: 6000 });
      return;
    }

    toast.success("Successfully saved.");
    navigate(`/requests/detail/${requestline.requestId}`);
  };

  return (
    <form
      className="brequest rounded-3 p-4 w-100"
      style={{ maxWidth: "520px" }}
      onSubmit={handleSubmit(save)}
    >
      <div className="mb-3">
        <h3 className="h4 mb-2">Item</h3>
        <label htmlFor="productId" className="form-label">
          Product
        </label>
        <select
          id="productId"
          {...register("productId", {
            valueAsNumber: true,
            required: "Product is required",
          })}
          className={`form-select ${errors?.productId && "is-invalid"}`}
        >
          <option value="">Select Product...</option>
          {products.map((product) => (
            <option key={product.id} value={product.id}>
              {product.name}
            </option>
          ))}
        </select>
        <div className="invalid-feedback">{errors?.productId?.message}</div>
      </div>
      <div className="mb-3">
        <label className="form-label">Price</label>
        <div className="form-label">
          {currencyFormatter.format(selectedProduct?.price ?? 0)}
        </div>
      </div>
      <div className="mb-3">
        <label htmlFor="quantity" className="form-label">
          Quantity
        </label>
        <input
          id="quantity"
          type="number"
          {...register("quantity", {
            required: "Quantity is required",
            min: { value: 1, message: "Quantity must be at least 1" },
            valueAsNumber: true,
          })}
          className={`form-control ${errors?.quantity && "is-invalid"}`}
        />
        <div className="invalid-feedback">{errors?.quantity?.message}</div>
      </div>
      <div className="mb-3">
        <label htmlFor="notes" className="form-label">
          Notes
        </label>
        <input
          id="notes"
          type="text"
          {...register("notes")}
          className="form-control"
          placeholder="Enter any notes for this item (optional)"
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Amount</label>
        <div className="form-label">
          {currencyFormatter.format(
            (selectedProduct?.price ?? 0) * (quantity ?? 0),
          )}
        </div>
      </div>
      <div className="d-flex justify-content-end mt-5">
        <Link
          to={`/requests/detail/${requestId}`}
          className="btn btn-outline-primary me-2"
        >
          Cancel
        </Link>
        <button type="submit" className="btn btn-primary">
          <svg
            className="bi me-2"
            width={16}
            height={16}
            viewBox="0 0 16 16"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4.5L11.5 0H2zm0 1h9v3.5A1.5 1.5 0 0 0 12.5 6H15v8a1 1 0 0 1-1 1h-1v-3a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v3H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zm10 0.5L14.5 4H12a0.5 0.5 0 0 1-0.5-0.5v-2zM4 15v-3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v3H4z" />
          </svg>
          Save Product
        </button>
      </div>
    </form>
  );
}

export default RequestLineForm;
