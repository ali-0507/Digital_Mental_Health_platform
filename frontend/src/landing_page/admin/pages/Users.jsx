import React, {useEffect, useState} from "react";
import { Table, Button, Form, Spinner } from "react-bootstrap";
import api from "../../../api/axios";
import { useAuth } from "../../../context/AuthContext";

const ROLE_OPTIONS = ["user", "counselor", "admin"];

export default function Users() {
   const { user: me } = useAuth();
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(20);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [savingRoleId, setSavingRoleId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [blockingMap, setBlockingMap] = useState({});
  const [error, setError] = useState("");

    const fetchUsers = async (p = 1) => {
    setLoading(true);
    setError("");
    try {
      const { data } = await api.get(`/admin/users?page=${p}&limit=${limit}`);
      setUsers(data.users || []);
      setPage(data.page || p);
      setTotal(data.total || 0);
    } catch (err) {
      console.error("Failed to fetch users:", err);
      setError(err?.response?.data?.message || "Failed to load users");
    } finally {
      setLoading(false);
    }
  };

useEffect(() => {
    fetchUsers(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


const handleRoleChange = (userId, newRole) => {
    setUsers((prev) => prev.map((u) => (u.id === userId ? { ...u, role: newRole } : u)));
  };

  const saveRole = async (userId) => {
    const target = users.find((u) => u.id === userId);
    if (!target) return;
    setSavingRoleId(userId);
    try {
      const { data } = await api.put(`/admin/users/${userId}/role`, { role: target.role });
      // update list with returned role (backend canonical)
      setUsers((prev) => prev.map((u) => (u.id === userId ? { ...u, role: data.user.role } : u)));
      alert("Role updated");
    } catch (err) {
      console.error("saveRole error:", err);
      alert(err?.response?.data?.message || "Failed to update role");
      // refetch to get canonical state
      fetchUsers(page);
    } finally {
      setSavingRoleId(null);
    }
  };


   const handleDelete = async (userId, name) => {
    if (!window.confirm(`Delete user "${name}"? This will soft-delete the user (can be restored in DB). Continue?`)) {
      return;
    }
    setDeletingId(userId);
    try {
      await api.delete(`/admin/users/${userId}`);
      // remove from UI
      setUsers((prev) => prev.filter((u) => u.id !== userId));
      alert("User soft-deleted");
    } catch (err) {
      console.error("delete user error:", err);
      alert(err?.response?.data?.message || "Failed to delete user");
    } finally {
      setDeletingId(null);
    }
  };


  const canManage = (targetUser) => {
    // Prevent UI actions on yourself (backend already enforces, but avoid sending request)
    if (!me) return true;
    return targetUser.id !== me.id;
  };


  
  // NEW: toggle block/unblock
  const toggleBlock = async (userId, name, currentlyBlocked) => {
    if (!canManage({ id: userId })) {
      alert("You cannot block/unblock yourself from the admin UI.");
      return;
    }

     const action = currentlyBlocked ? "unblock" : "block";
    if (!window.confirm(`${action === "block" ? "Block" : "Unblock"} user "${name}"?`)) {
      return;
    }

 setBlockingMap((m) => ({ ...m, [userId]: true }));
    
    try {
      const { data } = await api.put(`/admin/users/${userId}/block`, { block: !currentlyBlocked });
      // update the single user with returned state (safer than optimistic toggle)
      setUsers((prev) => prev.map((u) => (u.id === userId ? { ...u, isBlocked: data.user.isBlocked } : u)));
      alert(data.message || (data.user.isBlocked ? "User blocked" : "User unblocked"));
    } catch (err) {
      console.error("toggleBlock error:", err);
      alert(err?.response?.data?.message || "Failed to toggle block");
      // refetch to ensure canonical state
      fetchUsers(page);
    } finally {
      setBlockingMap((m) => {
        const copy = { ...m };
        delete copy[userId];
        return copy;
      });
    }
  };
    
  const pageCount = Math.max(1, Math.ceil(total / limit));
  return (
    <div className="container-fluid py-4">
      <h2 className="mb-4">User Management</h2>
       {loading ? (
        <div className="text-center py-5">
          <Spinner animation="border" />
        </div>
      ) : error ? (
        <div className="alert alert-danger">{error}</div>
      ) : (
        <>
      <Table striped bordered hover responsive>
        <thead className="table-dark">
          <tr>
            <th>S.no</th>
            <th>Name</th>
            <th>Email</th>
           <th style={{ width: 180 }}>Role</th>
            <th style={{ width: 120 }}>Status</th>
            <th style={{ width: 240 }}>Actions</th>
          </tr>
        </thead>
        <tbody>
           {users.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center py-4">No users found.</td>
                </tr>
              )}
          {users.map((u, index) => (
            <tr key={u.id}>
              <td>{index + 1 + (page - 1) * limit}</td>
              <td>{u.name || "--"}</td>
              <td>{u.email || "--"}</td>
              <td>

               <div className="d-flex">
                      <Form.Select
                        size="sm"
                        value={u.role || "user"}
                        onChange={(e) => handleRoleChange(u.id, e.target.value)}
                        disabled={!canManage(u)}
                      >
                        {ROLE_OPTIONS.map((r) => (
                          <option key={r} value={r}>
                            {r}
                          </option>
                        ))}
                      </Form.Select>
                 
                <Button size="sm" variant="primary" className="ms-2"
                       onClick={() => saveRole(u.id)}
                        disabled={!canManage(u) || savingRoleId === u.id}>
                  {savingRoleId === u.id ? <Spinner as="span" animation="border" size="sm" /> : "Save"}
                </Button>

                </div>
              </td>
               <td>
                    <span className={`badge ${u.isBlocked ? "bg-danger" : "bg-success"}`}>
                      {u.isBlocked ? "Blocked" : "Active"}
                    </span>
                  </td>
              <td>
                 <Button
                      size="sm"
                      variant="warning"
                      className="me-2"
                      disabled={!canManage(u) || !!blockingMap[u.id]}
                      onClick={() => toggleBlock(u.id, u.name || u.email, !!u.isBlocked)}
                    >
                       {blockingMap[u.id] ? (
                        <Spinner as="span" animation="border" size="sm" />
                      ) : u.isBlocked ? (
                        "Unblock"
                      ) : (
                        "Block"
                      )}
                    </Button>

                    <Button
                      size="sm"
                      variant="danger"
                      onClick={() => handleDelete(u.id, u.name)}
                      disabled={!canManage(u) || deletingId === u.id}
                    >
                      {deletingId === u.id ? <Spinner as="span" animation="border" size="sm" /> : "Delete"}
                    </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
   {/* simple pagination */}
          <div className="d-flex justify-content-between align-items-center">
            <div>
              Showing page {page} of {pageCount} — {total} users
            </div>

            <div>
              <Button variant="secondary" size="sm" className="me-2" disabled={page <= 1} onClick={() => fetchUsers(page - 1)}>
                Prev
              </Button>
              <Button variant="secondary" size="sm" disabled={page >= pageCount} onClick={() => fetchUsers(page + 1)}>
                Next
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}




  