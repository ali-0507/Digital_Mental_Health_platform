import { Table, Button } from "react-bootstrap";

function Counselors() {
  const counselors = [
    { id: 1, name: "Dr. Ayesha Khan", specialty: "Clinical Psychologist", status: "Approved" },
    { id: 2, name: "Dr. Arjun Mehta", specialty: "Therapist", status: "Pending" },
  ];

  return (
    <div className="container-fluid py-4">
      <h2 className="mb-4">Counselor Management</h2>
      <Table striped bordered hover responsive>
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Specialty</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {counselors.map((c, index) => (
            <tr key={c.id}>
              <td>{index + 1}</td>
              <td>{c.name}</td>
              <td>{c.specialty}</td>
              <td>
                <span
                  className={`badge ${
                    c.status === "Approved" ? "bg-success" : "bg-warning"
                  }`}
                >
                  {c.status}
                </span>
              </td>
              <td>
                <Button size="sm" variant="success" className="me-2">
                  Approve
                </Button>
                <Button size="sm" variant="danger">
                  Remove
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default Counselors;
