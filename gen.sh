#!/bin/bash
# set -ex

mkdir -p src/gen

for file in src/units/*.ts; do
    out_path="src/gen/$(basename "$file")"
    in_path="$file"

    echo "generating $out_path"
    npx ts-node-esm $in_path > $out_path
done