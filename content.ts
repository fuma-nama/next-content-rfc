import FastGlob from "fast-glob";
import { defineCollection } from "next/content";
import fs from "node:fs/promises";
import path from "node:path";

export const blog = defineCollection({
  async scan({ hmr, computed }) {
    const files = await FastGlob("./content/blog/*.mdx");
    hmr.watchDir("content/blog");

    return files.map((file) => ({
      path: file,
      // slug
      slug: path.basename(file, path.extname(file)),
      compile: computed(async () => {
        // this will be re-computed when hmr trigger
        // e.g. you updated file content
        const content = (await fs.readFile(file)).toString();

        return `compiled: ${content}`;
      }),
    }));
  },
});
