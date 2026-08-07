import UserForm from "./UserForm";

function UserCreatePage() {
  return (
    <section className="content p-4 flex-grow-1">
      <div className="d-flex justify-content-between pb-4 mb-5 border-bottom border-2">
        <h2>New User</h2>
      </div>
      <UserForm />
    </section>
  );
}

export default UserCreatePage;
