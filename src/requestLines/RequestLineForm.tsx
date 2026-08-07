import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { IProduct } from "../products/IProduct";
import { productAPI } from "../products/ProductAPI";
import { IRequestLine } from "./IRequestLine";
import { requestLineAPI } from "./RequestLineAPI";
import { formatCurrency } from "../utility/formatUtilities";

function RequestLineForm() {
  const { lineId, id } = useParams<{ lineId: string; id: string }>();
  const navigate = useNavigate();
  const [products, setProducts] = useState<IProduct[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<IProduct | undefined>(
    undefined,
  );
  const requestLineId = Number(lineId);
  const requestId = Number(id);

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

      if (!lineId) {
        return { requestId } as IRequestLine;
      }

      return await requestLineAPI.find(requestLineId);
    },
  });

  const productId = watch("productId");
  const quantity = watch("quantity");
  const normalizedQuantity =
    typeof quantity === "number" && Number.isFinite(quantity) ? quantity : 0;

  useEffect(() => {
    const currentProduct = products.find(
      (product) => product?.id === productId,
    );
    setSelectedProduct(currentProduct);
  }, [productId, products]);

  const save: SubmitHandler<IRequestLine> = async (requestline) => {
    try {
      const payload: IRequestLine = {
        id: requestline.id,
        requestId: requestline.requestId,
        productId: requestline.productId,
        quantity: requestline.quantity,
      };

      let savedRequestLine: IRequestLine;

      if (!requestline.id) {
        savedRequestLine = await requestLineAPI.post(payload);
      } else {
        savedRequestLine = await requestLineAPI.put(payload);
      }

      toast.success("Successfully saved.");
      navigate(`/requests/detail/${savedRequestLine.requestId}`);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "An unexpected error occurred.";
      toast.error(message, { duration: 6000 });
    }
  };

  return (
    <form
      className="border rounded-3 p-4 w-100"
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
            setValueAs: (value) => (value === "" ? undefined : Number(value)),
            required: "Product is required",
          })}
          className={`form-select ${errors?.productId && "is-invalid"}`}
        >
          <option value="">Select...</option>
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
          {formatCurrency(selectedProduct?.price ?? 0)}
        </div>
      </div>
      <div className="mb-3">
        <label htmlFor="quantity" className="form-label">
          Quantity
        </label>
        <input
          id="quantity"
          type="number"
          min={1}
          placeholder="Enter quantity"
          {...register("quantity", {
            setValueAs: (value) => (value === "" ? undefined : Number(value)),
            required: "Quantity must be at least 1",
            min: { value: 1, message: "Quantity must be at least 1" },
          })}
          className={`form-control ${errors?.quantity && "is-invalid"}`}
        />
        <div className="invalid-feedback">{errors?.quantity?.message}</div>
      </div>
      <div className="mb-3">
        <label className="form-label">Amount</label>
        <div className="form-label">
          {formatCurrency((selectedProduct?.price ?? 0) * normalizedQuantity)}
        </div>
      </div>
      <div className="d-flex justify-content-end mt-5">
        <Link
          to={`/requests/detail/${requestId}`}
          className="btn btn-outline-primary me-2"
        >
          Cancel
        </Link>
        <button type="submit" className="btn btn-primary action-button">
          <i className="bi bi-save me-2" aria-hidden="true" />
          Save line
        </button>
      </div>
    </form>
  );
}

export default RequestLineForm;
