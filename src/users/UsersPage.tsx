import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IUser } from "./IUser";
import UserCard from "./UserCard.tsx";
import UserCardSkeleton from "./UserCardSkeleton.tsx";
import { userAPI } from "./UserAPI";
import toast from "react-hot-toast";

function UsersPage() {
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
    <section className="content p-4 flex-grow-1">
      <div className="d-flex align-items-center justify-content-between pb-4 mb-4 border-bottom border-2">
        <h2 className="mb-0">Users</h2>
        <Link to="/users/create" className="btn btn-primary action-button">
          <i className="bi bi-plus-lg me-2" aria-hidden="true" />
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

export default UsersPage;
