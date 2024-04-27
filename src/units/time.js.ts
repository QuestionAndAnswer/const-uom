import esMain from "es-main";
import { generate } from "../generator.js";
import { table as siTable } from "./time.si.js";


export const table = siTable.map(x => {
    return {
        ...x,
        value: x.value.mul(1e3)
    };
});

if (esMain(import.meta)) {
    const text = generate(table);
    console.log(text);
}