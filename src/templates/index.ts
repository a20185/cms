import { reactive, ref, watch, Ref, computed } from "@vue/composition-api";
import Variable from "./Variable";

const templates = require.context("./", true, /\.ejs$/);
const variables = require.context("./", true, /\.ts$/);
const scripts = require.context("./", true, /\.script.ejs$/);

let tems: { [key: string]: any } = {};
let vars: { [key: string]: Variable[] } = {};
let js: { [key: string]: string } = {};

templates.keys().map((key) => {
  const token = key.match(/(?<=\/)[a-zA-Z0-9]*(?=.ejs)/)?.[0];
  if (token) {
    tems[token as string] = templates(key);
  }
});

variables.keys().map((key) => {
  const token = key.match(/(?<=\/)[a-zA-Z0-9]*(?=.variables.ts)/)?.[0];
  if (token) {
    vars[token] = variables(key).default;
  }
});

scripts.keys().map((key) => {
  const token = key.match(/(?<=\/)[a-zA-Z0-9]*(?=.script.ejs)/)?.[0];
  if (token) {
    js[token as string] = scripts(key);
  }
});

// 导出符合 service 配置项的结构
let result: { [key: string]: [string, Variable[], string] } = {};
for (let key in tems) {
  result[key] = [tems[key], vars[key], js[key]];
}

export default result;
