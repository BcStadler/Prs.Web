function ProductCardSkeleton() {
  return (
    <div
      className="card position-relative"
      style={{ width: "23rem", minHeight: "18.75rem" }}
    >
      <div className="progress">
        <div
          className="progress-bar bg-primary-subtle"
          role="progressbar"
          style={{ width: "30%" }}
        />
      </div>
      <div className="py-4 px-4 h-100 d-flex flex-column">
        <span
          className="position-absolute top-0 end-0 mt-3 me-3 skeleton skeleton-text rounded-circle"
          style={{ width: "1.25rem", height: "1.25rem" }}
        />
        <span
          className="fs-4 fw-medium skeleton skeleton-text mt-4"
          style={{ width: "15ch" }}
        />
        <span
          className="fs-5 fw-light skeleton skeleton-text mt-2"
          style={{ width: "10ch" }}
        />
        <div className="mt-auto pt-4">
          <span className="skeleton skeleton-text" style={{ width: "14ch" }} />
          <span
            className="skeleton skeleton-text rounded-pill mt-2"
            style={{ width: "12ch" }}
          />
        </div>
      </div>
    </div>
  );
}

export default ProductCardSkeleton;
