// import { Table } from "react-bootstrap";

// function Reports() {
//   const reports = [
//     { id: 1, user: "Ali Raza", score: "Moderate", date: "2025-09-10" },
//     { id: 2, user: "Fatima Noor", score: "Mild", date: "2025-09-12" },
//     { id: 3, user: "Aarav Sharma", score: "Severe", date: "2025-09-13" },
//   ];

//   return (
//     <div className="container-fluid py-4">
//       <h2 className="mb-4">Screening Reports</h2>
//       <Table striped bordered hover responsive>
//         <thead className="table-dark">
//           <tr>
//             <th>#</th>
//             <th>User</th>
//             <th>Result</th>
//             <th>Date</th>
//           </tr>
//         </thead>
//         <tbody>
//           {reports.map((r, index) => (
//             <tr key={r.id}>
//               <td>{index + 1}</td>
//               <td>{r.user}</td>
//               <td>{r.score}</td>
//               <td>{r.date}</td>
//             </tr>
//           ))}
//         </tbody>
//       </Table>
//     </div>
//   );
// }

// export default Reports;


import { useEffect, useState } from "react";
import { Table, Spinner } from "react-bootstrap";
import api from "../../../api/axios";

function Reports() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // paging (simple)
  const [page, setPage] = useState(1);
  const limit = 50;

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError(null);

    api.get(`/admin/screenings?page=${page}&limit=${limit}`)
      .then((res) => {
        if (!mounted) return;
        const rows = res.data?.reports || [];
        setReports(rows);
      })
      .catch((err) => {
        console.error("fetchReports error:", err);
        setError(err?.response?.data?.message || "Failed to load reports");
      })
      .finally(() => { if (mounted) setLoading(false); });

    return () => { mounted = false; };
  }, [page]);

  return (
    <div className="container-fluid py-4">
      <h2 className="mb-4">Screening Reports</h2>

      {loading && <div className="text-center py-4"><Spinner animation="border" /></div>}
      {error && <div className="alert alert-danger">{error}</div>}

      {!loading && !error && (
        <Table striped bordered hover responsive>
          <thead className="table-dark">
            <tr>
              <th style={{width: "60px"}}>#</th>
              <th>User</th>
              <th>Result</th>
              <th style={{width: "160px"}}>Date</th>
            </tr>
          </thead>
          <tbody>
            {reports.length === 0 && (
              <tr><td colSpan={4} className="text-center">No screening reports found.</td></tr>
            )}
            {reports.map((r, index) => (
              <tr key={r.id || index}>
                <td>{index + 1}</td>
                <td>{r.user}</td>
                <td>{r.score}</td>
                <td>{r.date}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}

export default Reports;
