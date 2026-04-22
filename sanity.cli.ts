import { defineCliConfig } from "sanity/cli";

export default defineCliConfig({
  api: {
    projectId: "56zxxfq8",
    dataset: "production",
  },
  deployment: { autoUpdates: true },
});
