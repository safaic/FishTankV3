import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      "@typescript-eslint/no-unused-vars": "off",
      "no-console": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "prefer-const": "warn",
      "react-hooks/exhaustive-deps": "off",
      "react/jsx-key": "warn",
      "no-var": "warn"
    },
    overrides: [
      {
        files: ["./app/api/**/*.ts", "./app/lib/**/*.ts", "./app/ui/**/*.tsx"],
        rules: {
          "@typescript-eslint/no-unused-vars": "off",
          "@typescript-eslint/no-explicit-any": "off",
          "no-console": "off"
        }
      }
    ]
  }
];

export default eslintConfig;