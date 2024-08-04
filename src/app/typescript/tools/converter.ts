export function jsonToTypescriptInterfaces(obj: any, interfaceName = "Root") {
    const lines = [];
    const queue: any = [{ name: interfaceName, value: obj }];

    while (queue.length > 0) {
        const { name, value } = queue.shift();
        const interfaceLines = [`interface ${name} {`];

        for (const key in value) {
            if (value.hasOwnProperty(key)) {
                const type = getType(value[key]);
                if (type === "object") {
                    const subInterfaceName = capitalizeFirstLetter(key);
                    interfaceLines.push(`  ${key}: ${subInterfaceName};`);
                    queue.push({ name: subInterfaceName, value: value[key] });
                } else if (type === "array") {
                    const arrayType = getArrayType(value[key]);
                    if (arrayType === "object") {
                        const subInterfaceName = capitalizeFirstLetter(key);
                        interfaceLines.push(`  ${key}: ${subInterfaceName}[];`);
                        queue.push({ name: subInterfaceName, value: value[key][0] });
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

function getType(value: any) {
    if (Array.isArray(value)) {
        return "array";
    }
    if (value === null) {
        return "any";
    }
    return typeof value;
}

function getArrayType(array: Array<any>) {
    if (array.length === 0) {
        return "any";
    }
    return getType(array[0]);
}

function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}