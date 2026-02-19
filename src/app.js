import express from "express";
import authRoutes from "./modules/auth/auth.routes.js";
import organizationRoutes from "./modules/organization/organization.route.js";
import taskRoutes from "./modules/tasks/task.route.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api/organizations", organizationRoutes);
app.use("/api/tasks", taskRoutes);

app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal server error" });
});

export default app;
