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
            singular: "kilobyte",
            plural: "kilobyte",
            short: "KB",
        },
        value: new Decimal(1000)
    },
    {
        name: {
            singular: "megabyte",
            plural: "megabytes",
            short: "MB",
        },
        value: new Decimal(1000 ** 2)
    },
    {
        name: {
            singular: "gigabyte",
            plural: "gigabyte",
            short: "GB",
        },
        value: new Decimal(1000 ** 3)
    },
    {
        name: {
            singular: "terabyte",
            plural: "terabytes",
            short: "TB",
        },
        value: new Decimal(1000 ** 4)
    },
    {
        name: {
            singular: "petabyte",
            plural: "petabyte",
            short: "PB",
        },
        value: new Decimal(1000 ** 5)
    },
];

if (esMain(import.meta)) {
    const text = generate(table);
    console.log(text);
}