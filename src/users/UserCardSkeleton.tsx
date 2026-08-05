function UserCardSkeleton() {
  return (
    <div className="card p-4 position-relative" style={{ width: "23rem" }}>
      <span
        className="position-absolute top-0 end-0 mt-2 me-2 skeleton skeleton-text rounded-circle"
        style={{ width: "1.5rem", height: "1.5rem" }}
      />
      <div className="d-flex align-items-start gap-3">
        <div className="d-flex flex-column w-100">
          <span
            className="fs-4 fw-medium skeleton skeleton-text"
            style={{ width: "12rem", height: "1.5rem" }}
          />
          <span
            className="skeleton skeleton-text"
            style={{ width: "7rem", height: "1rem" }}
          />
          <span
            className="skeleton skeleton-text"
            style={{ width: "9rem", height: "1rem" }}
          />
          <span
            className="skeleton skeleton-text"
            style={{ width: "14rem", height: "1rem" }}
          />
          <div className="mt-3 d-flex gap-2">
            <span
              className="skeleton skeleton-text rounded-pill"
              style={{ width: "5rem", height: "1.5rem" }}
            />
            <span
              className="skeleton skeleton-text rounded-pill"
              style={{ width: "4rem", height: "1.5rem" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserCardSkeleton;
