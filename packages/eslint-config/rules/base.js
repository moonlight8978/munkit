/** @type {import("eslint").Linter.Config["rules"]} */
module.exports = {
  "import/order": [
    "error",
    {
      groups: ["builtin", "external", "parent", "sibling", "index"],
      pathGroups: [
        {
          pattern: "@/**",
          group: "parent",
        },
      ],
      "newlines-between": "always",
    },
  ],
};
