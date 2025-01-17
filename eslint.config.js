import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import simpleImportSort from "eslint-plugin-simple-import-sort";

export default tseslint.config(
  { ignores: ["dist"] },
  {
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended, // TypeScript ESLint recommended configs
    ],
    files: ["**/*.{ts,tsx}"], // Targets TypeScript and TSX files
    languageOptions: {
      ecmaVersion: 2020, // ECMAScript version to use
      globals: globals.browser, // Browser globals
    },
    plugins: {
      "react-hooks": reactHooks, // React Hooks linting
      "react-refresh": reactRefresh, // React Refresh linting
      "simple-import-sort": simpleImportSort, // Import sorting plugin
    },
    rules: {
      ...reactHooks.configs.recommended.rules, // Recommended React Hooks rules
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ], // React Refresh rule
      "simple-import-sort/imports": "error", // Import sorting rule
      "simple-import-sort/exports": "error", // Export sorting rule
    },
  }
);
