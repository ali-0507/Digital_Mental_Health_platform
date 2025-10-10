// import React, { useEffect, useRef } from "react";

// function AdminDashboard() {
//   const chartRef = useRef(null);

//   useEffect(() => {
//     if (chartRef.current) {
//       const ctx = chartRef.current.getContext("2d");
//       new window.Chart(ctx, {
//         type: "bar",
//         data: {
//           labels: ["Minimal", "Mild", "Moderate", "Severe"],
//           datasets: [
//             {
//               label: "Screening Results",
//               data: [12, 19, 7, 3],
//               backgroundColor: ["#3fb97f", "#6fb1f7", "#fbc02d", "#ff6b6b"],
//             },
//           ],
//         },
//       });
//     }
//   }, []);

//   return (
//     <div className="admin-dashboard">
//       <h2 className="mb-4 text-center">Admin Dashboard</h2>
//       <p className="text-muted text-center mb-4">
//         View anonymized trends to plan interventions.
//       </p>

//       <div className="card p-4 shadow-sm">
//         <canvas ref={chartRef} height="100"></canvas>
//       </div>
//     </div>
//   );
// }

// export default AdminDashboard;
