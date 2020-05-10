module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ["plugin:vue/essential", "eslint:recommended", "@vue/prettier"],
  parserOptions: {
    parser: "babel-eslint"
  },
  rules: {
    // "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-console": "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-unused-expressions": "off",
    "vue/no-unused-components": "off",
    "no-useless-escape": "off",
    "no-regex-spaces": "off",
    "no-mixed-spaces-and-tabs": "off",
    "no-undef": "off",
    "no-side-effects-in-computed-properties": "off",
    "no-dupe-keys": "off",
    "no-case-declarations": "off",
    "no-constant-condition": "off",
    "no-unused-expressions": "off",
    "no-unused-vars": "off",
    "vue/no-unused-vars": "off",
    "vue/no-unused-components": "off",
    "no-useless-escape": "off",
    "no-regex-spaces": "off",
    "no-mixed-spaces-and-tabs": "off",
    "no-undef": "off",
    "no-unused-labels": "off",
    "no-unreachable": "off"
  },
  overrides: [
    {
      files: [
        "**/__tests__/*.{j,t}s?(x)",
        "**/tests/unit/**/*.spec.{j,t}s?(x)"
      ],
      env: {
        jest: true
      }
    }
  ]
};
