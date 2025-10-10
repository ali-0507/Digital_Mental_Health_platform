import { Table, Button } from "react-bootstrap";

function Users() {
  const users = [
    { id: 1, name: "Ali Raza", email: "ali@example.com", status: "Active" },
    { id: 2, name: "Fatima Noor", email: "fatima@example.com", status: "Blocked" },
    { id: 3, name: "Aarav Sharma", email: "aarav@example.com", status: "Active" },
  ];

  return (
    <div className="container-fluid py-4">
      <h2 className="mb-4">User Management</h2>
      <Table striped bordered hover responsive>
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u, index) => (
            <tr key={u.id}>
              <td>{index + 1}</td>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>
                <span
                  className={`badge ${
                    u.status === "Active" ? "bg-success" : "bg-danger"
                  }`}
                >
                  {u.status}
                </span>
              </td>
              <td>
                <Button size="sm" variant="warning" className="me-2">
                  Block
                </Button>
                <Button size="sm" variant="danger">
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default Users;
