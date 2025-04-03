import FastGlob from "fast-glob";
import { defineCollection } from "next/content";
import path from "node:path";

export const blog = defineCollection({
    async scan({ hmr, computed }) {
        const files = await FastGlob('./content/blog/*.mdx')
        hmr.watchDir('content/blog')

        return files.map(file => ({
            path: file,
            slug: path.basename(file, path.extname(file)),
            compile: computed(async () => {
                return "compiled!"
            })
        }))
    },
})
