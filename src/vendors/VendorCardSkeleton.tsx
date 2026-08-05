function VendorCardSkeleton() {
  return (
    <div className="card p-4 position-relative" style={{ width: "23rem" }}>
      <span
        className="position-absolute top-0 end-0 mt-2 me-2 skeleton skeleton-text rounded-circle"
        style={{ width: "20px", height: "20px" }}
      />
      <div className="d-flex flex-column gap-2">
        <span className="fs-4 fw-medium skeleton skeleton-text" />
        <span className="skeleton skeleton-text" />
      </div>
    </div>
  );
}

export default VendorCardSkeleton;
