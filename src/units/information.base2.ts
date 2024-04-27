import { Decimal } from "decimal.js";
import { UnitOptions, generate } from "../generator.js";
import esMain from "es-main";


export const table: UnitOptions[] = [
    {
        name: {
            singular: "bit",
            plural: "bits",
            short: "bit",
        },
        value: new Decimal(8)
    },
    {
        name: {
            singular: "byte",
            plural: "bytes",
            short: "byte",
        },
        value: new Decimal(1)
    },
    {
        name: {
            singular: "kibibyte",
            plural: "kibibytes",
            short: "KiB",
        },
        value: new Decimal(1024)
    },
    {
        name: {
            singular: "mebibyte",
            plural: "mebibytes",
            short: "MiB",
        },
        value: new Decimal(1024 ** 2)
    },
    {
        name: {
            singular: "gibibyte",
            plural: "gibibytes",
            short: "GiB",
        },
        value: new Decimal(1024 ** 3)
    },
    {
        name: {
            singular: "tebibyte",
            plural: "tebibytes",
            short: "TiB",
        },
        value: new Decimal(1024 ** 4)
    },
    {
        name: {
            singular: "pebibyte",
            plural: "pebibyte",
            short: "PiB",
        },
        value: new Decimal(1024 ** 5)
    },
];

if (esMain(import.meta)) {
    const text = generate(table);
    console.log(text);
}