import { Decimal } from "decimal.js";
import { UnitOptions, generate } from "../generator.js";
import esMain from "es-main";


export const table: UnitOptions[] = [
    {
        name: {
            singular: "picometer",
            plural: "picometers",
            short: "pm",
        },
        value: new Decimal(1e-12),
    },
    {
        name: {
            singular: "nanometer",
            plural: "nanometers",
            short: "nm",
        },
        value: new Decimal(1e-9)
    },
    {
        name: {
            singular: "micrometer",
            plural: "micrometers",
            short: "um",
        },
        value: new Decimal(1e-6)
    },
    {
        name: {
            singular: "millimeter",
            plural: "millimeters",
            short: "mm",
        },
        value: new Decimal(1e-3)
    },
    {
        name: {
            singular: "centimeter",
            plural: "centimeters",
            short: "cm",
        },
        value: new Decimal(1e-2)
    },
    {
        name: {
            singular: "decimeter",
            plural: "decimeters",
            short: "dm",
        },
        value: new Decimal(1e-1)
    },
    {
        name: {
            singular: "meter",
            plural: "meters",
            short: "m",
        },
        value: new Decimal(1)
    },
    {
        name: {
            singular: "kilometer",
            plural: "kilometers",
            short: "Km",
        },
        value: new Decimal(1e3)
    },
    {
        name: {
            singular: "megameter",
            plural: "megameters",
            short: "Mm",
        },
        value: new Decimal(1e6)
    },
    {
        name: {
            singular: "gigametre",
            plural: "gigametres",
            short: "Gm",
        },
        value: new Decimal(1e9)
    },
];

if (esMain(import.meta)) {
    const text = generate(table);
    console.log(text);
}