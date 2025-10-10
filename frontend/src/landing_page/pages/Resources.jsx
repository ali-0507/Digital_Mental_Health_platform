// import React from "react";
import ResourceCard from "../components/ResourceCard";
 
function Resources() {
  const resources = [
    { title: "Relaxation Audio", type: "audio", link: "/" },
    { title: "Stress Management Guide", type: "pdf", link: "/" },
    { title: "Mindfulness Video", type: "video", link: "/" },
  ];

  return (
    <div className="resources mb-4 p-3">
      <h2 className="mb-4 text-center">Psychoeducational Resources</h2>
      <p className="text-muted text-center mb-4">
        Explore resources designed to support your mental wellness.
      </p>

      <div className="row g-4">
        {resources.map((res, i) => (
          <div className="col-md-4" key={i}>
            <ResourceCard {...res} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Resources;
