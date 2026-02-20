import express from "express";
import authRoutes from "./modules/auth/auth.routes.js";
import organizationRoutes from "./modules/organization/organization.route.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api/organizations", organizationRoutes);

app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});


export default app;
