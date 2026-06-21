import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get("/api/geolocation", async (req, res) => {
  try {
    // Use a public IP lookup provider that is easy to proxy and less likely
    // to reject low-volume traffic from a local development server.
    const response = await fetch("https://ipwhois.app/json/");

    if (!response.ok) {
      return res.status(response.status).json({ error: "Unable to fetch geolocation" });
    }

    const data = await response.json();
    return res.json(data);
  } catch (error) {
    console.error("Geolocation proxy error:", error);
    return res.status(500).json({ error: "Geolocation service unavailable" });
  }
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const staticPath = path.join(__dirname, "dist");

if (process.env.NODE_ENV === "production") {
  app.use(express.static(staticPath));

  app.get("*", (req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });
}

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
