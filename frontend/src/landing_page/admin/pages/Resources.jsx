import { Table, Button } from "react-bootstrap";

function Resources() {
  const resources = [
    { id: 1, title: "Coping with Stress", type: "Article" },
    { id: 2, title: "Guided Meditation", type: "Video" },
  ];

  return (
    <div className="container-fluid py-4">
      <h2 className="mb-4">Resources Management</h2>
      <Button variant="primary" className="mb-3">
        Add New Resource
      </Button>
      <Table striped bordered hover responsive>
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Type</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {resources.map((res, index) => (
            <tr key={res.id}>
              <td>{index + 1}</td>
              <td>{res.title}</td>
              <td>{res.type}</td>
              <td>
                <Button size="sm" variant="info" className="me-2">
                  Edit
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

export default Resources;
