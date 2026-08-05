function ProductCardSkeleton() {
  return (
    <div className="card p-4" style={{ width: "23rem" }}>
      <span className="fs-4 fw-medium skeleton skeleton-text" />
      <span className="fs-5 fw-light skeleton skeleton-text" />
    </div>
  );
}

export default ProductCardSkeleton;
