

import React, { useEffect, useState } from "react";
import { Table, Button, Spinner } from "react-bootstrap";
import api from "../../../api/axios";
import { useNavigate } from "react-router-dom";

export default function Resources() {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [deletingId, setDeletingId] = useState(null);
  const navigate = useNavigate();

  const fetchResources = async () => {
    setLoading(true);
    setErr("");
    try {
      // try admin endpoint first
      try {
        const { data } = await api.get("/admin/resources");
        // expect data.resources or data
        setResources(data.resources || data || []);
        setLoading(false);
        return;
      } catch (adminErr) {
        // if admin endpoint missing or unauthorized, fallback to public resources
        console.warn("admin/resources not available or failed - falling back to /resources", adminErr?.response?.status);
      }

      // fallback: public resources
      try {
        const { data } = await api.get("/resources");
        setResources(data.resources || data || []);
      } catch (pubErr) {
        console.warn("public /resources failed:", pubErr);
        throw pubErr;
      }
    } catch (e) {
      console.error("fetchResources error:", e);
      setErr(e?.response?.data?.message || "Failed to load resources");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResources();
  }, []);

  const handleEdit = (id) => {
    // navigate to an admin edit screen (implement later)
    navigate(`/admin/resources/edit/${id}`);
  };

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Delete resource "${title}"? This action is permanent.`)) return;
    setDeletingId(id);
    try {
      // only call admin delete (protected)
      await api.delete(`/admin/resources/${id}`);
      setResources((prev) => prev.filter((r) => r._id !== id && r.id !== id));
      alert("Resource deleted");
    } catch (err) {
      console.error("delete resource error:", err);
      alert(err?.response?.data?.message || "Failed to delete resource. Make sure admin endpoint exists.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="container-fluid py-4">
      <h2 className="mb-4">Resources Management</h2>

      {loading ? (
        <div className="text-center py-5">
          <Spinner animation="border" />
        </div>
      ) : err ? (
        <div className="alert alert-danger">{err}</div>
      ) : (
        <>
          <div className="mb-3 d-flex justify-content-between">
            <div>
              <Button variant="primary" onClick={() => navigate("/admin/resources/new")}>
                Add New Resource
              </Button>
            </div>
            <div className="text-muted">Showing {resources.length} resources</div>
          </div>

          <Table striped bordered hover responsive>
            <thead className="table-dark">
              <tr>
                <th style={{ width: 60 }}>#</th>
                <th>Title</th>
                <th>Type</th>
                <th style={{ width: 260 }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {resources.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center py-4">No resources found.</td>
                </tr>
              ) : (
                resources.map((res, idx) => {
                  const id = res._id || res.id;
                  return (
                    <tr key={id}>
                      <td>{idx + 1}</td>
                      <td>{res.title || res.name || "—"}</td>
                      <td>{res.type || res.category || "—"}</td>
                      <td>
                        <Button size="sm" variant="info" className="me-2" onClick={() => handleEdit(id)}>
                          Edit
                        </Button>

                        <Button
                          size="sm"
                          variant="danger"
                          onClick={() => handleDelete(id, res.title || res.name)}
                          disabled={deletingId === id}
                        >
                          {deletingId === id ? <Spinner as="span" animation="border" size="sm" /> : "Delete"}
                        </Button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </Table>

          <div className="text-muted small mt-3">
            If admin delete/edit endpoints are missing, implement <code>DELETE /api/admin/resources/:id</code> and <code>PUT /api/admin/resources/:id</code>.
          </div>
        </>
      )}
    </div>
  );
}

