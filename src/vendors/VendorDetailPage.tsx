import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { IVendor } from "./IVendor";
import { vendorAPI } from "./VendorAPI";

function VendorDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(false);
  const [vendor, setVendor] = useState<IVendor | undefined>(undefined);

  useEffect(() => {
    let active = true;

    const loadVendor = async () => {
      setLoading(true);
      try {
        const fetchedVendor = await vendorAPI.find(Number(id));
        if (active) {
          setVendor(fetchedVendor);
        }
      } catch (error) {
        const message =
          error instanceof Error
            ? error.message
            : "An unexpected error occurred.";
        toast.error(message);
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
  }, [id]);

  return (
    <section className="content p-4 flex-grow-1">
      <div className="d-flex justify-content-between pb-4 mb-4 border-bottom border-2">
        <h2>Vendor</h2>
      </div>
      {loading && <p>Loading…</p>}
      {vendor && (
        <section className="d-flex flex-wrap gap-4">
          <dl>
            <dt>Code</dt>
            <dd>{vendor.code}</dd>
            <dt>Name</dt>
            <dd>{vendor.name}</dd>
            <dt>Address</dt>
            <dd>{vendor.address}</dd>
            <dt>City</dt>
            <dd>{vendor.city}</dd>
            <dt>State</dt>
            <dd>{vendor.state}</dd>
            <dt>Zip</dt>
            <dd>{vendor.zip}</dd>
            <dt>Phone</dt>
            <dd>{vendor.phone || "—"}</dd>
            <dt>Email</dt>
            <dd>{vendor.email || "—"}</dd>
          </dl>
        </section>
      )}
    </section>
  );
}

export default VendorDetailPage;