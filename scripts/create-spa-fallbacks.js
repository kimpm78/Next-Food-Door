const fs = require("fs");
const path = require("path");

const buildDir = path.join(__dirname, "..", "build");
const indexPath = path.join(buildDir, "index.html");
const fallbackRoutes = [
  "404.html",
  "admin/index.html",
  "about/index.html",
  "privacy/index.html",
  "terms/index.html",
  "restaurant-register/index.html",
  "delivery-partner-register/index.html",
  "business-register/index.html",
  "how-to-order/index.html",
  "delivery/index.html",
  "app-download/index.html",
  "contact/order/index.html",
  "contact/account-payment/index.html",
  "contact/membership/index.html",
  "map/index.html",
  "login/index.html",
  "signup/index.html",
  "signup-complete/index.html",
  "profile/index.html",
];

if (!fs.existsSync(indexPath)) {
  throw new Error("build/index.html does not exist. Run this after build.");
}

for (const route of fallbackRoutes) {
  const targetPath = path.join(buildDir, route);
  fs.mkdirSync(path.dirname(targetPath), { recursive: true });
  fs.copyFileSync(indexPath, targetPath);
}
