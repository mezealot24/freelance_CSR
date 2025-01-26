import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
	baseDirectory: __dirname, // กำหนด path หลักสำหรับการค้นหา base config
});

const eslintConfig = [
	...compat.extends("next/core-web-vitals", "next/typescript"),
	{
		rules: {
			"@typescript-eslint/no-unused-vars": "off", // ปิดการตรวจสอบ unused variables
			"react-hooks/exhaustive-deps": "warn", // ลดจาก error เป็น warning
		},
	},
];

export default eslintConfig;
