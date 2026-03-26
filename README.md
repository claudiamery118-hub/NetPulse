# NetPulse

NetPulse is a distributed system monitoring dashboard that simulates real-time telemetry across multiple servers. It visualizes system health, detects failures, and provides insight into how large-scale infrastructure maintains reliability.

## Live Demo
[(https://net-pulse-chi.vercel.app/)](https://net-pulse-chi.vercel.app/)

---

## Overview

Modern platforms rely on distributed systems composed of thousands of servers operating simultaneously. Monitoring performance and reliability across these systems is critical.

NetPulse models this environment by simulating multiple nodes, generating telemetry data, and presenting system health through an interactive dashboard.

---

## Features

- Real-time telemetry simulation for latency, uptime, and request volume  
- Distributed node dashboard representing multiple servers  
- Fault detection system highlighting unhealthy nodes  
- Aggregated system metrics including average latency and node status  
- Auto-refreshing data to mimic live monitoring systems  
- Clean, responsive dashboard interface  

---

## System Design

NetPulse models a simplified distributed system architecture:

- Nodes (servers) simulate independent telemetry data  
- A metrics generator produces dynamic latency, uptime, and request values  
- A monitoring layer evaluates system health and identifies failures  
- The UI dashboard visualizes both individual node metrics and overall system performance  

This design reflects core concepts used in real-world observability systems.

---

## Tech Stack

- React  
- JavaScript  
- Vercel (deployment)  

---

## What I Learned

- How distributed systems monitor and maintain reliability  
- How telemetry data is generated and interpreted  
- Building real-time updating interfaces in React  
- Designing dashboards for system observability  

---

## Future Improvements

- Backend integration for persistent and real telemetry data  
- Real-time streaming using WebSockets  
- Alerting system for critical failures  
- Historical metrics and trend analysis  
- Containerized deployment using Docker  

---

## Author

Claudia Fonseca  
University of Miami — Software Engineering  

GitHub: https://github.com/claudiamery118-hub  
LinkedIn: https://linkedin.com/in/claudia-fonseca19  
