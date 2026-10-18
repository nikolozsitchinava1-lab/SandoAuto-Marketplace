module.exports = [
"[turbopack-node]/transforms/postcss.ts?config=[project]/artifacts/sandoauto/postcss.config.mjs { CONFIG => \"[project]/artifacts/sandoauto/postcss.config.mjs [postcss] (ecmascript)\" } [postcss] (ecmascript, async loader)", ((__turbopack_context__) => {

__turbopack_context__.v((parentImport) => {
    return Promise.all([
  "chunks/node_modules__pnpm_0lqczmjrnt6yw._.js",
  "chunks/[root-of-the-server]__1v26aai-tl_zv._.js"
].map((chunk) => __turbopack_context__.l(chunk))).then(() => {
        return parentImport("[turbopack-node]/transforms/postcss.ts?config=[project]/artifacts/sandoauto/postcss.config.mjs { CONFIG => \"[project]/artifacts/sandoauto/postcss.config.mjs [postcss] (ecmascript)\" } [postcss] (ecmascript)");
    });
});
}),
];