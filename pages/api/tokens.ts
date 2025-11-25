import type { NextApiRequest, NextApiResponse } from "next";

const API_URL = "https://launch.meme/api/tokens";
const API_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ3d3ciLCJpYXQiOjE3NTYxMTUzNjl9.zXI0CSHYDVKop9v8A5li2n5Zz4MlQM77vVN3NerHYM8";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const response = await fetch(API_URL, {
      method: req.method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_TOKEN}`,
      },
      body: req.method !== "GET" ? JSON.stringify(req.body) : undefined,
    });

    const text = await response.text();

    try {
      const json = JSON.parse(text);
      res.status(response.status).json(json);
    } catch {
      res.status(response.status).send(text);
    }
  } catch (error) {
    console.error("Proxy error:", error);
    res.status(500).json({ error: "Proxy failed", details: String(error) });
  }
}
