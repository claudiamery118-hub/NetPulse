import React, { useState, useEffect } from "react";

const initialServers = [
  { id: 1, name: "Edge-01", region: "US-East" },
  { id: 2, name: "Edge-02", region: "US-West" },
  { id: 3, name: "Edge-03", region: "Europe" },
  { id: 4, name: "Edge-04", region: "Asia" },
  { id: 5, name: "Edge-05", region: "South America" },
  { id: 6, name: "Edge-06", region: "Australia" }
];

function generateMetrics() {
  const latency = Math.floor(Math.random() * 180) + 20;
  const uptime = (99 + Math.random()).toFixed(2);
  const statusRoll = Math.random();

  let status = "Healthy";
  if (statusRoll > 0.82 && statusRoll <= 0.94) status = "Warning";
  if (statusRoll > 0.94) status = "Down";

  return {
    latency,
    uptime,
    status,
    requests: Math.floor(Math.random() * 9000) + 1000
  };
}

function getStatusColor(status) {
  if (status === "Healthy") return "#22c55e";
  if (status === "Warning") return "#f59e0b";
  return "#ef4444";
}

export default function App() {
  const [servers, setServers] = useState([]);
  const [lastUpdated, setLastUpdated] = useState("");

  useEffect(() => {
    const initialized = initialServers.map((server) => ({
      ...server,
      metrics: generateMetrics()
    }));
    setServers(initialized);
    setLastUpdated(new Date().toLocaleTimeString());
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setServers((prev) =>
        prev.map((server) => ({
          ...server,
          metrics: generateMetrics()
        }))
      );
      setLastUpdated(new Date().toLocaleTimeString());
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  const healthyCount = servers.filter(
    (server) => server.metrics?.status === "Healthy"
  ).length;
  const warningCount = servers.filter(
    (server) => server.metrics?.status === "Warning"
  ).length;
  const downCount = servers.filter(
    (server) => server.metrics?.status === "Down"
  ).length;

  const avgLatency =
    servers.length > 0
      ? Math.round(
          servers.reduce((sum, server) => sum + server.metrics.latency, 0) /
            servers.length
        )
      : 0;

  return (
    <div style={styles.page}>
      <div style={styles.overlay} />

      <div style={styles.container}>
        <div style={styles.headerRow}>
          <div>
            <h1 style={styles.title}>NetPulse</h1>
            <p style={styles.subtitle}>
              Distributed system telemetry and node health dashboard
            </p>
          </div>
          <div style={styles.updatedBox}>Last updated: {lastUpdated || "Loading..."}</div>
        </div>

        <div style={styles.statsGrid}>
          <div style={styles.statCard}>
            <p style={styles.statLabel}>Healthy Nodes</p>
            <h2 style={styles.statValue}>{healthyCount}</h2>
          </div>
          <div style={styles.statCard}>
            <p style={styles.statLabel}>Warnings</p>
            <h2 style={styles.statValue}>{warningCount}</h2>
          </div>
          <div style={styles.statCard}>
            <p style={styles.statLabel}>Down Nodes</p>
            <h2 style={styles.statValue}>{downCount}</h2>
          </div>
          <div style={styles.statCard}>
            <p style={styles.statLabel}>Avg Latency</p>
            <h2 style={styles.statValue}>{avgLatency} ms</h2>
          </div>
        </div>

        <div style={styles.sectionHeader}>
          <h3 style={styles.sectionTitle}>Node Overview</h3>
        </div>

        <div style={styles.cardGrid}>
          {servers.map((server) => (
            <div key={server.id} style={styles.serverCard}>
              <div style={styles.serverTop}>
                <div>
                  <h3 style={styles.serverName}>{server.name}</h3>
                  <p style={styles.region}>{server.region}</p>
                </div>

                <span
                  style={{
                    ...styles.statusBadge,
                    backgroundColor: `${getStatusColor(server.metrics.status)}20`,
                    color: getStatusColor(server.metrics.status),
                    border: `1px solid ${getStatusColor(server.metrics.status)}55`
                  }}
                >
                  {server.metrics.status}
                </span>
              </div>

              <div style={styles.metricGrid}>
                <div style={styles.metricBox}>
                  <p style={styles.metricLabel}>Latency</p>
                  <p style={styles.metricValue}>{server.metrics.latency} ms</p>
                </div>
                <div style={styles.metricBox}>
                  <p style={styles.metricLabel}>Uptime</p>
                  <p style={styles.metricValue}>{server.metrics.uptime}%</p>
                </div>
                <div style={styles.metricBox}>
                  <p style={styles.metricLabel}>Requests</p>
                  <p style={styles.metricValue}>
                    {server.metrics.requests.toLocaleString()}
                  </p>
                </div>
                <div style={styles.metricBox}>
                  <p style={styles.metricLabel}>Region Health</p>
                  <p style={styles.metricValue}>{server.metrics.status}</p>
                </div>
              </div>

              {server.metrics.status !== "Healthy" && (
                <div
                  style={{
                    ...styles.alertBox,
                    borderColor: getStatusColor(server.metrics.status),
                    color: getStatusColor(server.metrics.status)
                  }}
                >
                  {server.metrics.status === "Warning"
                    ? "Elevated latency or instability detected."
                    : "Node unavailable. Immediate attention recommended."}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background:
      "radial-gradient(circle at top left, #1e293b 0%, #0f172a 45%, #020617 100%)",
    color: "#e2e8f0",
    fontFamily:
      "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    position: "relative",
    overflow: "hidden",
    padding: "40px 20px"
  },
  overlay: {
    position: "absolute",
    inset: 0,
    background:
      "linear-gradient(135deg, rgba(59,130,246,0.08), rgba(168,85,247,0.05), rgba(16,185,129,0.04))",
    pointerEvents: "none"
  },
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    position: "relative",
    zIndex: 1
  },
  headerRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: "20px",
    flexWrap: "wrap",
    marginBottom: "30px"
  },
  title: {
    margin: 0,
    fontSize: "3rem",
    fontWeight: 700,
    letterSpacing: "-1px",
    color: "#f8fafc"
  },
  subtitle: {
    marginTop: "8px",
    color: "#94a3b8",
    fontSize: "1rem"
  },
  updatedBox: {
    background: "rgba(15, 23, 42, 0.7)",
    border: "1px solid rgba(148, 163, 184, 0.2)",
    padding: "12px 16px",
    borderRadius: "14px",
    color: "#cbd5e1",
    fontSize: "0.95rem",
    backdropFilter: "blur(10px)"
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "18px",
    marginBottom: "32px"
  },
  statCard: {
    background: "rgba(15, 23, 42, 0.75)",
    border: "1px solid rgba(148, 163, 184, 0.15)",
    borderRadius: "20px",
    padding: "22px",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.25)",
    backdropFilter: "blur(12px)"
  },
  statLabel: {
    margin: 0,
    color: "#94a3b8",
    fontSize: "0.9rem"
  },
  statValue: {
    margin: "10px 0 0 0",
    fontSize: "2rem",
    fontWeight: 700,
    color: "#f8fafc"
  },
  sectionHeader: {
    marginBottom: "18px"
  },
  sectionTitle: {
    margin: 0,
    fontSize: "1.2rem",
    color: "#f8fafc"
  },
  cardGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "20px"
  },
  serverCard: {
    background: "rgba(15, 23, 42, 0.78)",
    border: "1px solid rgba(148, 163, 184, 0.14)",
    borderRadius: "22px",
    padding: "22px",
    boxShadow: "0 12px 35px rgba(0, 0, 0, 0.28)",
    backdropFilter: "blur(12px)"
  },
  serverTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: "12px",
    marginBottom: "20px"
  },
  serverName: {
    margin: 0,
    fontSize: "1.2rem",
    color: "#f8fafc"
  },
  region: {
    margin: "6px 0 0 0",
    color: "#94a3b8",
    fontSize: "0.92rem"
  },
  statusBadge: {
    fontSize: "0.82rem",
    padding: "7px 12px",
    borderRadius: "999px",
    fontWeight: 600,
    whiteSpace: "nowrap"
  },
  metricGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "12px"
  },
  metricBox: {
    background: "rgba(30, 41, 59, 0.6)",
    border: "1px solid rgba(148, 163, 184, 0.1)",
    borderRadius: "16px",
    padding: "14px"
  },
  metricLabel: {
    margin: 0,
    fontSize: "0.8rem",
    color: "#94a3b8"
  },
  metricValue: {
    margin: "8px 0 0 0",
    fontSize: "1.05rem",
    color: "#f8fafc",
    fontWeight: 600
  },
  alertBox: {
    marginTop: "16px",
    padding: "12px 14px",
    borderRadius: "14px",
    border: "1px solid",
    background: "rgba(255,255,255,0.03)",
    fontSize: "0.9rem",
    fontWeight: 500
  }
};