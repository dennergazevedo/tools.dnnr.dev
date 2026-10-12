type JsonObject = Record<string, unknown>;

export function jsonToTypescriptInterfaces(obj: unknown, interfaceName = "Root") {
    const lines = [];
    const queue: { name: string; value: JsonObject }[] = [{ name: interfaceName, value: obj as JsonObject }];

    while (queue.length > 0) {
        const { name, value } = queue.shift() as { name: string; value: JsonObject };
        const interfaceLines = [`interface ${name} {`];

        for (const key in value) {
            if (value.hasOwnProperty(key)) {
                const type = getType(value[key]);
                if (type === "object") {
                    const subInterfaceName = capitalizeFirstLetter(key);
                    interfaceLines.push(`  ${key}: ${subInterfaceName};`);
                    queue.push({ name: subInterfaceName, value: value[key] as JsonObject });
                } else if (type === "array") {
                    const arrayType = getArrayType(value[key] as unknown[]);
                    if (arrayType === "object") {
                        const subInterfaceName = capitalizeFirstLetter(key);
                        interfaceLines.push(`  ${key}: ${subInterfaceName}[];`);
                        queue.push({ name: subInterfaceName, value: (value[key] as unknown[])[0] as JsonObject });
                    } else {
                        interfaceLines.push(`  ${key}: ${arrayType}[];`);
                    }
                } else {
                    interfaceLines.push(`  ${key}: ${type};`);
                }
            }
        }

        interfaceLines.push(`}`);
        lines.push(interfaceLines.join("\n"));
    }

    return lines.join("\n\n");
}

function getType(value: unknown) {
    if (Array.isArray(value)) {
        return "array";
    }
    if (value === null) {
        return "any";
    }
    return typeof value;
}

function getArrayType(array: unknown[]) {
    if (array.length === 0) {
        return "any";
    }
    return getType(array[0]);
}

function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}