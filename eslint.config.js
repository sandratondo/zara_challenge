// eslint.config.js
import js from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsparser from "@typescript-eslint/parser";
import react from "eslint-plugin-react";
import prettier from "eslint-plugin-prettier";

export default [
  js.configs.recommended, // Configuración base de JavaScript
  tseslint.configs.recommended, // Reglas recomendadas para TypeScript
  react.configs.recommended, // Reglas recomendadas para React
  {
    files: ["**/*.ts", "**/*.tsx", "**/*.js", "**/*.jsx"], // Aplica reglas a archivos JS y TS
    languageOptions: {
      parser: tsparser, // Usa el parser de TypeScript
      ecmaVersion: "latest",
      sourceType: "module"
    },
    plugins: {
      prettier, // Plugin de Prettier
    },
    rules: {
      "prettier/prettier": "error", // Aplica Prettier como regla
      "react/prop-types": "off", // Desactiva prop-types porque se usa TypeScript
      "no-unused-vars": "warn", // Advierte sobre variables no usadas
      "no-console": "warn" // Advierte sobre console.log
    }
  }
];
