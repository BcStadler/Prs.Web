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
      previousVendor.filter((vendor) => vendor.id !== vendorToRemove.id),
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
    <section className="content p-4 flex-grow-1">
      <div className="d-flex align-items-center justify-content-between pb-4 mb-4 border-bottom border-2">
        <h2 className="mb-0">Vendors</h2>
        <Link to="/vendors/create" className="btn btn-primary action-button">
          <i className="bi bi-plus-lg me-2" aria-hidden="true" />
          Create a vendor
        </Link>
      </div>
      <section className="list d-flex flex-row flex-wrap gap-5 p-4">
        {loading && vendorCardSkeletons}
        {vendor.map((vendor) => (
          <VendorCard key={vendor.id} vendor={vendor} onRemove={removeVendor} />
        ))}
      </section>
    </section>
  );
}

export default VendorPage;
