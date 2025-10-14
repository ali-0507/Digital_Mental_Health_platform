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









// import React, { useEffect, useState } from "react";
// import { Table, Button, Spinner, Form, InputGroup } from "react-bootstrap";

/**
 * Users page — connects to backend admin endpoints:
 * - GET  /api/admin/users?page=1&limit=10&search=...
 * - PUT  /api/admin/users/:id/role
 * - DELETE /api/admin/users/:id
 *
 * Expects token in localStorage under key "token".
 * Adjust API_BASE if your frontend uses a proxy or env var.
 */

// export default function Users() {
//   const [users, setUsers] = useState([]);
//   const [page, setPage] = useState(1);
//   const [limit] = useState(10);
//   const [totalPages, setTotalPages] = useState(1);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [search, setSearch] = useState("");

//   const token = localStorage.getItem("token") || "";
//  // Works in both Vite (import.meta.env) and CRA (process.env)
// const API_BASE = import.meta.env.VITE_API_BASE || "";



//   const fetchUsers = async (p = 1, q = "") => {
//     setLoading(true);
//     setError("");
//     try {
//       const url =
//         `${API_BASE}/api/admin/users?page=${p}&limit=${limit}` +
//         (q ? `&search=${encodeURIComponent(q)}` : "");
//       const res = await fetch(url, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       const body = await res.json().catch(() => ({}));
//       if (!res.ok) throw new Error(body.message || "Failed to fetch users");

//       setUsers(body.users || []);
//       setPage(body.page || p);
//       setTotalPages(body.pages || 1);
//     } catch (err) {
//       console.error(err);
//       setError(err.message || "Error fetching users");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchUsers(1, search);
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   const handleSearch = (e) => {
//     e.preventDefault();
//     fetchUsers(1, search);
//   };

//   const changeRole = async (userId, newRole) => {
//     if (!window.confirm(`Change role to "${newRole}"?`)) return;
//     try {
//       const res = await fetch(`${API_BASE}/api/admin/users/${userId}/role`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({ role: newRole }),
//       });
//       const body = await res.json().catch(() => ({}));
//       if (!res.ok) throw new Error(body.message || "Failed to change role");
//       await fetchUsers(page, search);
//       alert("Role updated");
//     } catch (err) {
//       console.error(err);
//       alert(err.message || "Unable to update role");
//     }
//   };

//   const deleteUser = async (userId) => {
//     if (!window.confirm("Are you sure you want to delete this user?")) return;
//     try {
//       const res = await fetch(`${API_BASE}/api/admin/users/${userId}`, {
//         method: "DELETE",
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const body = await res.json().catch(() => ({}));
//       if (!res.ok) throw new Error(body.message || "Failed to delete user");
//       await fetchUsers(page, search);
//       alert("User deleted");
//     } catch (err) {
//       console.error(err);
//       alert(err.message || "Unable to delete user");
//     }
//   };

//   return (
//     <div className="container-fluid py-4">
//       <div className="d-flex justify-content-between align-items-center mb-3">
//         <h2>User Management</h2>

//         <Form className="d-flex" onSubmit={handleSearch} style={{ minWidth: 320 }}>
//           <InputGroup>
//             <Form.Control
//               placeholder="Search name / email"
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               aria-label="Search users"
//             />
//             <Button variant="primary" type="submit">
//               Search
//             </Button>
//           </InputGroup>
//         </Form>
//       </div>

//       {loading ? (
//         <div className="text-center py-5">
//           <Spinner animation="border" /> <span className="ms-2">Loading users...</span>
//         </div>
//       ) : error ? (
//         <div className="alert alert-danger">{error}</div>
//       ) : (
//         <>
//           <Table striped bordered hover responsive>
//             <thead className="table-dark">
//               <tr>
//                 <th>#</th>
//                 <th>Name</th>
//                 <th>Email</th>
//                 <th>Role</th>
//                 <th>Created</th>
//                 <th style={{ width: 260 }}>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {users.length === 0 ? (
//                 <tr>
//                   <td colSpan="6" className="text-center">
//                     No users found.
//                   </td>
//                 </tr>
//               ) : (
//                 users.map((u, idx) => (
//                   <tr key={u._id || u.id || idx}>
//                     <td>{(page - 1) * limit + idx + 1}</td>
//                     <td>{u.name}</td>
//                     <td>{u.email}</td>
//                     <td style={{ textTransform: "capitalize" }}>{u.role}</td>
//                     <td>{u.createdAt ? new Date(u.createdAt).toLocaleString() : "-"}</td>
//                     <td>
//                       <div className="d-flex gap-2">
//                         <Button
//                           size="sm"
//                           variant={u.role === "admin" ? "outline-secondary" : "success"}
//                           onClick={() =>
//                             changeRole(u._id, u.role === "admin" ? "user" : "admin")
//                           }
//                         >
//                           {u.role === "admin" ? "Demote" : "Make Admin"}
//                         </Button>

//                         <Button
//                           size="sm"
//                           variant="outline-primary"
//                           onClick={() => {
//                             const next = prompt(
//                               "Enter role (user, counselor, admin):",
//                               u.role || "user"
//                             );
//                             if (next && ["user", "counselor", "admin"].includes(next)) {
//                               changeRole(u._id, next);
//                             } else if (next) {
//                               alert("Invalid role entered");
//                             }
//                           }}
//                         >
//                           Change Role
//                         </Button>

//                         <Button
//                           size="sm"
//                           variant="danger"
//                           onClick={() => deleteUser(u._id)}
//                         >
//                           Delete
//                         </Button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </Table>

//           <div className="d-flex justify-content-between align-items-center">
//             <div>
//               Page {page} / {totalPages} &nbsp; • &nbsp; Showing {users.length} users
//             </div>

//             <div>
//               <Button
//                 size="sm"
//                 variant="outline-secondary"
//                 className="me-2"
//                 disabled={page <= 1}
//                 onClick={() => fetchUsers(page - 1, search)}
//               >
//                 Prev
//               </Button>
//               <Button
//                 size="sm"
//                 variant="outline-secondary"
//                 disabled={page >= totalPages}
//                 onClick={() => fetchUsers(page + 1, search)}
//               >
//                 Next
//               </Button>
//             </div>
//           </div>
//         </>
//       )}
//     </div>
//   );
// }
