import { read } from "node:fs";
import { open, appendFile } from "node:fs/promises";
import path from "node:path";
import { Transform } from "node:stream";

const files = process.argv.slice(2);
for (const arg of files) {
  if (path.parse(arg).ext == ".js" || path.parse(arg).base.startsWith(".")) {
    continue;
  }
  const transformer = new Transform({
    encoding: "utf-8",
    construct(callback) {
      this.push(`export default "`);
      callback();
    },
    flush(callback) {
      this.push(`";`);
      callback();
    },
    allowHalfOpen: true,
    transform(chunk, encoding, callback) {
      if (typeof chunk == "string") {
        this.push(JSON.stringify(chunk).slice(1, -1));
      } else if (chunk instanceof Buffer) {
        this.push(JSON.stringify(chunk.toString("utf-8")).slice(1, -1));
      }
    },
  });
  const filepath = path.resolve(arg);
  const fd = await open(filepath, "r");
  const outFile = await open(filepath + ".js", "w");
  const rS = fd.createReadStream();
  const wS = outFile.createWriteStream({ autoClose: false });
  rS.pipe(transformer).pipe(wS);
  await new Promise(fulfill => rS.on("close", fulfill));
  await outFile.sync();
  transformer._flush(() => null);
  transformer.end();
  await outFile.close();
  wS.close();
  await fd.close();
}