import React from "react";
import "../styles/Dashboard.css";

const Dashboard = () => {
  const kpis = [
    { id: 1, label: "Products", value: 1342 },
    { id: 2, label: "Stock Value", value: "$128.4K" },
    { id: 3, label: "Open Orders", value: 27 },
    { id: 4, label: "Incoming", value: 8 },
  ];

  const recentOrders = [
    { id: "PO-1023", customer: "Acme Co.", status: "Pending", total: "$3,200" },
    { id: "SO-881", customer: "Beta Ltd.", status: "Confirmed", total: "$1,120" },
    { id: "PO-1099", customer: "Gamma Inc.", status: "Received", total: "$5,400" },
  ];

  return (
    <div className="dashboard-root">
      <div className="dashboard-header">
        <h1>Overview</h1>
        <p className="muted">Key metrics across inventory, procurement and orders</p>
      </div>

      <div className="kpi-grid">
        {kpis.map((k) => (
          <div key={k.id} className="kpi-card">
            <div className="kpi-value">{k.value}</div>
            <div className="kpi-label">{k.label}</div>
          </div>
        ))}
      </div>

      <div className="panels">
        <section className="panel">
          <h3>Inventory Snapshot</h3>
          <div className="bars">
            <div className="bar">
              <div className="bar-label">Raw Materials</div>
              <div className="bar-track"><div className="bar-fill" style={{width: '76%'}}></div></div>
            </div>
            <div className="bar">
              <div className="bar-label">Finished Goods</div>
              <div className="bar-track"><div className="bar-fill" style={{width: '54%'}}></div></div>
            </div>
            <div className="bar">
              <div className="bar-label">WIP</div>
              <div className="bar-track"><div className="bar-fill" style={{width: '32%'}}></div></div>
            </div>
          </div>
        </section>

        <section className="panel">
          <h3>Recent Orders</h3>
          <table className="orders-table">
            <thead>
              <tr><th>Ref</th><th>Customer</th><th>Status</th><th>Total</th></tr>
            </thead>
            <tbody>
              {recentOrders.map((o) => (
                <tr key={o.id}>
                  <td>{o.id}</td>
                  <td>{o.customer}</td>
                  <td><span className={`status ${o.status.toLowerCase()}`}>{o.status}</span></td>
                  <td>{o.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
