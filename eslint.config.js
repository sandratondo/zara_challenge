// eslint.config.js
import js from "@eslint/js";
import ts from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import react from "eslint-plugin-react";
import prettier from "eslint-plugin-prettier";

export default [
  js.configs.recommended,  
  ts.configs.recommended,  
  react.configs.recommended, 
  {
    languageOptions: {
      parser: tsParser,
      ecmaVersion: "latest",
      sourceType: "module"
    },
    plugins: {
      prettier
    },
    rules: {
      "prettier/prettier": "error",
      "react/prop-types": "off",
      "no-unused-vars": "warn",
      "no-console": "warn"
    }
  }
];
