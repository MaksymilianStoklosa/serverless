import { handler } from "./handler";

(async function () {
  console.log(`Running handler locally`);
  await handler();
  console.log(`Handler finished running locally`);
})();
