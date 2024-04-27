import { Decimal } from "decimal.js";
import { UnitOptions, generate } from "../generator.js";
import esMain from "es-main";


export const table: UnitOptions[] = [
    {
        name: {
            singular: "picosecond",
            plural: "picoseconds",
            short: "ps",
        },
        value: new Decimal(1e-12),
    },
    {
        name: {
            singular: "nanosecond",
            plural: "nanoseconds",
            short: "ns",
        },
        value: new Decimal(1e-9)
    },
    {
        name: {
            singular: "microsecond",
            plural: "microseconds",
            short: "mu",
        },
        value: new Decimal(1e-6)
    },
    {
        name: {
            singular: "millisecond",
            plural: "milliseconds",
            short: "ms",
        },
        value: new Decimal(1e-3)
    },
    {
        name: {
            singular: "second",
            plural: "seconds",
            short: "s",
        },
        value: new Decimal(1)
    },
    {
        name: {
            singular: "minute",
            plural: "minutes",
            short: "m",
        },
        value: new Decimal(60)
    },
    {
        name: {
            singular: "hour",
            plural: "hours",
            short: "h",
        },
        value: new Decimal(60 * 60)
    },
    {
        name: {
            singular: "day",
            plural: "days",
            short: "d",
        },
        value: new Decimal(60 * 60 * 24)
    },
];

if (esMain(import.meta)) {
    const text = generate(table);
    console.log(text);
}