import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** Convierte nombres a camelCase */
function toCamelCase(str) {
  return str
    .replace(/[-_]+/g, " ")
    .replace(/\s+(\w)/g, (_, c) => c.toUpperCase())
    .replace(/\s/g, "")
    .replace(/^[A-Z]/, (c) => c.toLowerCase());
}

/** Reemplaza fill en SVGs y retorna el contenido modificado */
function normalizeSvgFill(filePath) {
  try {
    let content = fs.readFileSync(filePath, "utf8");
    content = content.replace(/fill="[^"]*"/gi, 'fill="currentColor"');
    if (!/fill="/i.test(content)) {
      content = content.replace(/<svg\b([^>]*)>/i, '<svg$1 fill="currentColor">');
    }
    console.log(`🎨 SVG normalizado: ${path.basename(filePath)}`);
    return content;
  } catch (err) {
    console.warn(`⚠️ Error procesando SVG: ${filePath}`, err.message);
    return null;
  }
}

/** Genera index.ts dentro de una carpeta */
function generateIndexForDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  const importLines = [];
  const objectEntries = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    const ext = path.extname(entry.name).toLowerCase();
    const baseName = path.basename(entry.name, ext);
    const camelName = toCamelCase(baseName);

    if (entry.isDirectory()) {
      generateIndexForDir(fullPath); // recursión

      importLines.push(`import ${camelName} from "./${entry.name}";`);
      objectEntries.push(`  ${camelName},`);
    } else if (
      [".png", ".jpg", ".jpeg", ".gif", ".webp", ".svg", ".bmp", ".avif"].includes(ext)
    ) {
      if (ext === ".svg") {
        // Para SVG: exportar el contenido directamente como string
        const svgContent = normalizeSvgFill(fullPath);
        if (svgContent) {
          const escapedContent = svgContent
            .replace(/\\/g, '\\\\')
            .replace(/`/g, '\\`')
            .replace(/\$/g, '\\$');
          importLines.push(`const ${camelName} = \`${escapedContent}\`;`);
          objectEntries.push(`  ${camelName},`);
        }
      } else {
        // Para otras imágenes: importar la ruta normalmente
        const relPath = `./${entry.name}`;
        importLines.push(`import ${camelName} from "${relPath}";`);
        objectEntries.push(`  ${camelName},`);
      }
    }
  }

  const content = `${importLines.join("\n")}

export default {
${objectEntries.join("\n")}
};
`;

  fs.writeFileSync(path.join(dir, "index.ts"), content);
  console.log(`📄 Generado: ${path.join(dir, "index.ts")}`);
}

/** Punto de entrada */
export function generateImageImports(rootFolder) {
  if (!fs.existsSync(rootFolder)) throw new Error("La carpeta no existe");
  generateIndexForDir(rootFolder);
}

// Ejecutar automáticamente sobre ./src/images
generateImageImports(path.resolve(__dirname, "./src/images"));