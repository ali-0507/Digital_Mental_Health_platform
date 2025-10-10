import { Table } from "react-bootstrap";

function Reports() {
  const reports = [
    { id: 1, user: "Ali Raza", score: "Moderate", date: "2025-09-10" },
    { id: 2, user: "Fatima Noor", score: "Mild", date: "2025-09-12" },
    { id: 3, user: "Aarav Sharma", score: "Severe", date: "2025-09-13" },
  ];

  return (
    <div className="container-fluid py-4">
      <h2 className="mb-4">Screening Reports</h2>
      <Table striped bordered hover responsive>
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>User</th>
            <th>Result</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((r, index) => (
            <tr key={r.id}>
              <td>{index + 1}</td>
              <td>{r.user}</td>
              <td>{r.score}</td>
              <td>{r.date}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default Reports;
