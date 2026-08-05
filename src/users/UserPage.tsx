import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IUser } from "./IUser";
import UserCard from "./UserCard.tsx";
import UserCardSkeleton from "./UserCardSkeleton.tsx";
import { userAPI } from "./UserAPI";
import toast from "react-hot-toast";

function UserPage() {
  const [user, setUser] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(false);
  const userCardSkeletons = Array.from(Array(12), (_value, index) => (
    <UserCardSkeleton key={index} />
  ));

  useEffect(() => {
    let active = true;

    const loadUser = async () => {
      setLoading(true);

      try {
        const data = await userAPI.list();
        if (active) {
          setUser(data);
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

    void loadUser();

    return () => {
      active = false;
    };
  }, []);

  function removeUser(userMember: IUser) {
    setUser((previousUser) =>
      previousUser.filter((member) => member.id !== userMember.id),
    );
  }

  return (
    <section className="content container-fluid mx-5 my-2 py-4">
      <div className="d-flex align-items-center justify-content-between pb-4 mb-4 border-bottom border-2">
        <h2 className="mb-0">Users</h2>
        <Link
          to="/users/create"
          className="btn btn-primary d-inline-flex align-items-center justify-content-center"
          style={{ backgroundColor: "#0d6efd", borderColor: "#0d6efd" }}
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
          Create a user
        </Link>
      </div>
      <section className="list d-flex flex-row flex-wrap gap-5 p-4">
        {loading && userCardSkeletons}
        {user.map((userMember) => (
          <UserCard
            key={userMember.id}
            user={userMember}
            onRemove={removeUser}
          />
        ))}
      </section>
    </section>
  );
}

export default UserPage;