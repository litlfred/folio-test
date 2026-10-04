#!/usr/bin/env bun
/**
 * zmdo proof — the owner's MVP (folio-assistant bean `tndo`), run in a real
 * empty repository on GitHub Actions against ONE layer of
 * litlfred/folio-assistant, sparse-checked-out with only what it `needs`.
 *
 *   bun run zmdo-check.ts --platform <dir> --fresh <dir> --layer <name> --mode instance|document
 *
 * Runs the init itself, then checks the four conditions. Each is a command,
 * not an opinion. Exits 1 if any fails; writes a table to $GITHUB_STEP_SUMMARY.
 */
import { spawnSync } from "node:child_process";
import { appendFileSync, existsSync, readFileSync, readdirSync } from "node:fs";
import { join, relative, resolve } from "node:path";

const arg = (n: string): string => {
  const i = process.argv.indexOf(`--${n}`);
  if (i < 0 || !process.argv[i + 1]) throw new Error(`--${n} is required`);
  return process.argv[i + 1];
};
const platform = resolve(arg("platform"));
const fresh = resolve(arg("fresh"));
const layer = arg("layer");
const mode = arg("mode");
if (mode !== "instance" && mode !== "document") throw new Error("--mode instance|document");

type Row = { condition: string; ok: boolean; detail: string };
const rows: Row[] = [];
const check = (condition: string, ok: boolean, detail: string) => rows.push({ condition, ok, detail });

const present = readdirSync(platform, { withFileTypes: true }).filter((d) => d.isDirectory() && !d.name.startsWith(".") && d.name !== "node_modules").map((d) => d.name).sort();

// 1. init exits 0 in an empty repository, against this layer alone.
const assistant = relative(fresh, platform);
const initArgs = ["run", join(platform, "cat-harness/scripts/init-folio.ts"), "--dir", fresh, "--title", "zmdo probe", "--link", "sibling", "--assistant", assistant, "--skip-vcs",
  ...(mode === "instance" ? ["--instance"] : ["--type", "document", "--author", "zmdo"])];
const init = spawnSync("bun", initArgs, { cwd: fresh, encoding: "utf-8" });
check("1. init exits 0 in an empty repo", init.status === 0, `exit ${init.status}; platform holds only: ${present.join(", ")}`);
if (init.status !== 0) console.error(init.stdout, init.stderr);

const { readDeclaration } = await import(join(platform, "cat-harness/schemas/cat-harness.ts"));
const hc = await import(join(platform, "cat-harness/schemas/harness-config.ts"));

// 2. declared graphs resolve.
const decl = readDeclaration(fresh);
const missing = (decl?.directories ?? []).filter((d: { path: string }) => !existsSync(join(fresh, d.path))).map((d: { path: string }) => d.path);
check("2. declaration loads, every declared directory exists", !!decl && missing.length === 0, decl ? `${decl.directories.length} declared, ${missing.length} missing ${missing.join(" ")}` : "no declaration");

// 4. the needs closure is satisfied by what is present — and reaches the layer.
let chain: Array<{ name: string; root: string }> = [];
let chainErr = "";
try { chain = hc.declarationChain(fresh); } catch (e) { chainErr = String(e); }
const outside = chain.filter((c) => c.name !== "(root)" && !resolve(c.root).startsWith(platform));
const names = chain.map((c) => c.name);
check("4. needs closure resolves within what is present, and reaches the layer", !chainErr && names.includes(layer) && outside.length === 0,
  chainErr || `${names.join(" ← ")}${outside.length ? `; OUTSIDE: ${outside.map((o) => o.name).join(",")}` : ""}`);

// 3. working: conventions readable (skills), work plan usable (beans), MCP serves.
let skills: string[] = [];
try { skills = hc.resolveSkillDirs(fresh); } catch { /* reported below */ }
const beans = spawnSync("beans", ["list", "--json"], { cwd: fresh, encoding: "utf-8" });
const mcp = JSON.parse(readFileSync(join(fresh, ".mcp.json"), "utf-8")).mcpServers["folio-assistant"];
const req = [
  { jsonrpc: "2.0", id: 1, method: "initialize", params: { protocolVersion: "2025-06-18", capabilities: {}, clientInfo: { name: "zmdo", version: "0" } } },
  { jsonrpc: "2.0", method: "notifications/initialized" },
  { jsonrpc: "2.0", id: 2, method: "tools/list" },
].map((m) => JSON.stringify(m)).join("\n") + "\n";
const srv = spawnSync(mcp.command, mcp.args, { cwd: fresh, input: req, encoding: "utf-8", timeout: 120_000, env: { ...process.env, VIEWER_PORT: "3399" } });
const listed = (srv.stdout || "").split("\n").map((l) => { try { return JSON.parse(l); } catch { return null; } }).find((m) => m?.id === 2);
const tools: string[] = listed?.result?.tools?.map((t: { name: string }) => t.name) ?? [];
check("3. working: skills readable, beans usable, MCP serves", skills.length > 0 && beans.status === 0 && tools.includes("folio_init"),
  `${skills.length} skill dir(s); beans exit ${beans.status}; MCP ${tools.length} tool(s)${tools.length ? "" : ` — ${(srv.stderr || "").split("\n").filter(Boolean).slice(-2).join(" | ")}`}`);

if (mode === "document") {
  const cfg = JSON.parse(readFileSync(join(fresh, "zmdo-probe.config.json"), "utf-8"));
  const render = spawnSync("bun", ["run", join(platform, "cat-harness/content/pipeline/render-markdown.ts"), join(fresh, "folio/zmdo-probe/zmdo-probe.ts")], { cwd: fresh, encoding: "utf-8", timeout: 120_000 });
  check("document folio: asked-for content type, and it renders", cfg.contentType === "document" && render.status === 0, `contentType ${cfg.contentType}; render exit ${render.status}`);
}

const md = [`### zmdo proof — \`${layer}\` alone, ${mode}`, "", "| condition | | detail |", "|---|---|---|",
  ...rows.map((r) => `| ${r.condition} | ${r.ok ? "✅" : "❌"} | ${r.detail.replace(/\|/g, "\\|")} |`)].join("\n");
console.log(md);
if (process.env.GITHUB_STEP_SUMMARY) appendFileSync(process.env.GITHUB_STEP_SUMMARY, md + "\n");
process.exit(rows.every((r) => r.ok) ? 0 : 1);
