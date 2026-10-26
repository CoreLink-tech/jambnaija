import "./env.js";
import { app } from "./app.js";
import { prisma } from "./lib/prisma.js";

const port = Number(process.env.PORT || 4000);

prisma
  .$connect()
  .then(() => {
    // eslint-disable-next-line no-console
    console.log("Prisma connected.");
  })
  .catch((error) => {
    // eslint-disable-next-line no-console
    console.warn("Prisma connection warning:", error.message);
  });

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Backend running on http://localhost:${port}`);
});
