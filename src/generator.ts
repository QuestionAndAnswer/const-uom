import assert from "assert";
import camelcase from "camelcase";
import { Decimal } from "decimal.js";
import memoizee from "memoizee";

export type NameOptions = {
    singular: string;
    plural: string;
    short: string;
};
export type UnitOptions = {
    name: NameOptions;
    value: Decimal;
}

export const toPascal = memoizee((s: string) => {
    return camelcase(s, { pascalCase: true })
});

export const getRelativeName = memoizee((
    rUnit: UnitOptions,
    lUnit: UnitOptions,
    formatName: (s: string) => string
) => {
    return `${formatName(rUnit.name.plural)}In${formatName(lUnit.name.singular)}`;
});

export const getRelativeShortName = (
    rUnit: UnitOptions,
    lUnit: UnitOptions,
) => {
    return `${rUnit.name.short}In${lUnit.name.short}`;
};


export function genSubHeader(len: number, dash: string, text: string) {
    const halfDashesLen = len - Math.floor(text.length / 2);
    const halfDashes = dash.repeat(halfDashesLen);

    return `/* ${halfDashes}${text}${halfDashes} */`;
}
export function genMainHeader(len: number, dash: string, text: string) {
    const hd = text.length % 2 === 0 ? dash.repeat(2) : dash.repeat(3);
    return `${genSubHeader(len, dash, hd)}\n${genSubHeader(len, " ", text)}\n${genSubHeader(len, dash, hd)}`;
}

export function genUnitJsDoc(
    base: UnitOptions,
    unit: UnitOptions,
    formatName: (s: string) => string
) {
    const valueInUnit = new Decimal(10);
    const valueInBase = valueInUnit.mul(unit.value);

    const fbp = formatName(base.name.plural);
    const fus = formatName(unit.name.singular);
    const fup = formatName(unit.name.plural);

    return `/**
 * Number of ${fbp} in ${fus}.
 * @example <caption>**${fup}** -> **${fbp}**</caption>
 * // ${valueInUnit} ${fup} = ${valueInBase} ${fbp}
 * ${valueInUnit} * ${fus} === ${valueInBase}
 * 
 * @example <caption>**${fbp}** -> **${fup}**</caption>
 * // ${valueInBase} ${fbp} = ${valueInUnit} ${fup}
 * ${valueInBase} / ${fus} === ${valueInUnit}
 */`;
}

export function genShortUnitJsDoc(
    unit: UnitOptions,
    formatName: (s: string) => string
) {
    // NOTE: Using {@link} format for see because of https://tsdoc.org/pages/tags/see/
    return `/** @see {@link ${formatName(unit.name.singular)}} */`;
}

export function genRelativeUnitJsDoc(
    lUnit: UnitOptions,
    rUnit: UnitOptions,
    formatName: (s: string) => string
) {
    // NOTE: Using {@link} format for see because of https://tsdoc.org/pages/tags/see/
    return `/** @see {@link ${getRelativeName(rUnit, lUnit, formatName)}} */`;
}

export function getRelativeValueString(
    rUnit: UnitOptions,
    lUnit: UnitOptions
) {
    const value = lUnit.value.div(rUnit.value);
    if (value.isInt() && !Number.isSafeInteger(value.toNumber())) {
        return `BigInt("${value}")`;
    }
    return `${value}`;
}

export function generate(
    table: UnitOptions[],
    formatName: (s: string) => string = toPascal
) {
    const headerLen = 40;
    const headerDash = "-";

    const baseUnit = table.find(x => x.value.eq(new Decimal(1)));
    assert(baseUnit, "base unit not found (nothing with the value = 1");


    let text = "";

    for (const rUnit of table) {
        const rfsName = formatName(rUnit.name.singular);
        const rfpName = formatName(rUnit.name.plural);

        text += `${genMainHeader(headerLen, headerDash, rfpName)}\n\n`;
        text += `${genUnitJsDoc(baseUnit, rUnit, formatName)}\n`;
        text += `export const ${rfsName} = ${rUnit.value};\n`;

        for (const lUnit of table) {
            if (rUnit.name === lUnit.name) continue;

            const value = getRelativeValueString(rUnit, lUnit);

            text += `export const ${getRelativeName(rUnit, lUnit, formatName)} = ${value};\n`;
        }

        text += `\n${genSubHeader(headerLen, headerDash, ` ${rfpName} (short) `)}\n\n`;

        // Skipping if singular and short names are equal
        if (rfsName !== rUnit.name.short) {
            text += `${genShortUnitJsDoc(rUnit, formatName)}\n`;
            text += `export const ${rUnit.name.short} = ${rfsName};\n`;
        }

        for (const lUnit of table) {
            if (rUnit.name === lUnit.name) continue;

            text += genRelativeUnitJsDoc(lUnit, rUnit, formatName) + "\n";
            text += `export const ${getRelativeShortName(rUnit, lUnit)} = ${getRelativeName(rUnit, lUnit, formatName)};\n`
        }

        text += "\n";
    }

    return text;
}