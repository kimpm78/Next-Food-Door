const http = require("http");
const { Pool } = require("pg");

const pool = new Pool({
  host: process.env.PGHOST || "postgres",
  port: Number(process.env.PGPORT || 5432),
  database: process.env.PGDATABASE || "next_food_door",
  user: process.env.PGUSER || "next_food_door",
  password: process.env.PGPASSWORD || "next_food_door_password",
});

const sendJson = (res, statusCode, body) => {
  res.writeHead(statusCode, {
    "Access-Control-Allow-Origin": process.env.CORS_ORIGIN || "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Content-Type": "application/json",
  });
  res.end(JSON.stringify(body));
};

const readBody = (req) => {
  return new Promise((resolve, reject) => {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk;
    });
    req.on("end", () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (error) {
        reject(error);
      }
    });
    req.on("error", reject);
  });
};

const server = http.createServer(async (req, res) => {
  if (req.method === "OPTIONS") {
    sendJson(res, 204, {});
    return;
  }

  if (req.method !== "POST" || req.url !== "/api/admin/login") {
    sendJson(res, 404, { ok: false });
    return;
  }

  try {
    const { email, password } = await readBody(req);
    const result = await pool.query(
      `SELECT id, email, name
       FROM admin_users
       WHERE active = true
         AND email = $1
         AND password_hash = crypt($2, password_hash)
       LIMIT 1`,
      [email, password]
    );

    if (result.rowCount === 0) {
      sendJson(res, 401, { ok: false });
      return;
    }

    sendJson(res, 200, { ok: true, admin: result.rows[0] });
  } catch (error) {
    console.error(error);
    sendJson(res, 500, { ok: false });
  }
});

server.listen(Number(process.env.PORT || 4000), "0.0.0.0", () => {
  console.log("Admin API listening on port", process.env.PORT || 4000);
});
