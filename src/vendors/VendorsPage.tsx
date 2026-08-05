import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IVendor } from "./IVendor";
import VendorCard from "./VendorCard";
import VendorCardSkeleton from "./VendorCardSkeleton";
import { vendorAPI } from "./VendorAPI";
import toast from "react-hot-toast";

function VendorPage() {
  const [vendor, setVendor] = useState<IVendor[]>([]);
  const [loading, setLoading] = useState(false);
  const vendorCardSkeletons = Array.from({ length: 12 }, (_value, index) => (
    <VendorCardSkeleton key={index} />
  ));

  function removeVendor(vendorToRemove: IVendor) {
    setVendor((previousVendor) =>
      previousVendor.filter(
        (vendor) => vendor.id !== vendorToRemove.id,
      ),
    );
  }

  useEffect(() => {
    let active = true;

    const loadVendor = async () => {
      setLoading(true);
      try {
        const data = await vendorAPI.list();
        if (active) {
          setVendor(data);
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

    void loadVendor();

    return () => {
      active = false;
    };
  }, []);

  return (
    <section className="content container-fluid mx-5 my-2 py-4">
      <div className="d-flex align-items-center justify-content-between pb-4 mb-4 border-bottom border-2">
        <h2 className="mb-0">Vendors</h2>
        <Link
          to="/vendors/create"
          className="btn btn-primary d-inline-flex align-items-center justify-content-center"
          style={{ backgroundColor: "#0d6efd ", borderColor: "#0d6efd " }}
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
          Create a vendor
        </Link>
      </div>
      <section className="list d-flex flex-row flex-wrap gap-5 p-4">
        {loading && vendorCardSkeletons}
        {vendor.map((vendor) => (
          <VendorCard
            key={vendor.id}
            vendor={vendor}
            onRemove={removeVendor}
          />
        ))}
      </section>
    </section>
  );
}

export default VendorPage;