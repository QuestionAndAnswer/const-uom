Small utility library with generated constants of units of measurements and their relative values.\
No magic, no smart conversions. Just precomputed constants.

# Usage
To use this package you'll have to make up your mind with base system you will be working in.
E.g. in [SI](https://en.wikipedia.org/wiki/International_System_of_Units) base unit of time is seconds,
but in JS milliseconds usually used for different API's (```setTimeout``` classic).

To fullfill this needs, library exposes some units in different bases.
In library terms that means which unit will be set to 1 based on which the rest are defined.


| **Name**             |    **Import path**    |        **Base** | **Scaling**               |
|----------------------|:---------------------:|----------------:|---------------------------|
| Time JavaScript base |       time.js.js      | Millisecond = 1 | Normal time units scaling |
| Time SI base         |       time.si.js      |      Second = 1 | Normal time units scaling |
| Information base 10  | information.base10.js |        Byte = 1 | SI Kilo = 1000            |
| Information base 2   |  information.base2.js |        Byte = 1 | Kibi = 1024               |
| Length metric        |    length.metric.js   |       Meter = 1 | SI Kilo = 1000            |

# Examples

## Time
```ts
import { Second, s, MillisecondsInSecond } from "const-uom/time.js.js";

// 10 Seconds in Milliseconds
const ms1 = 10 * Second;
const ms2 = 10 * s;
const ms3 = 10 * MillisecondsInSecond;

// 10000 Milliseconds in Seconds 
const s1 = 10000 / Second; 
const s2 = 10000 / s;
const s3 = 10000 / MillisecondsInSecond;
```


## Information
```ts
import { Kibibyte, KiB, KibibytesInByte } from "const-uom/information.base2.js";

// 10 Kibibytes in Bytes
const byte1 = 10 * Kibibyte;
const byte2 = 10 * KiB;
const byte3 = 10 * KibibytesInByte;

// 10240 Bytes in Kibibytes 
const kb1 = 10240 / Kibibyte; 
const kb2 = 10240 / KiB;
const kb3 = 10240 / KibibytesInByte;
```