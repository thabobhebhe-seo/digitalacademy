import express, { type Express } from "express";
import fs from "fs";
import path from "path";
// import { createServer as createViteServer, createLogger } from "vite";
import { type Server } from "http";
// import viteConfig from "../vite.config";
import { nanoid } from "nanoid";

// stub logger so the rest of the file compiles
const viteLogger = { info: console.log, warn: console.warn, error: console.error };

export function log(message: string, source = "express") {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}

export async function setupVite(app: Express, _server: Server) {
  // ----- VITE DISABLED -----
  log("Vite dev middleware skipped (running without client build)", "vite");
  app.use("*", (_req, res) => {
    res.status(503).send("Client not built – run <code>npm run build:client</code> first.");
  });
}

export function serveStatic(app: Express) {
  const distPath = path.resolve(import.meta.dirname, "public");
  if (!fs.existsSync(distPath)) {
    // don’t crash – just warn
    log(`No static build found at ${distPath}`, "serve");
    return;
  }
  app.use(express.static(distPath));
  app.use("*", (_req, res) => res.sendFile(path.resolve(distPath, "index.html")));
}