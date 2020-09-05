import { reactive, ref, watch, Ref } from "@vue/composition-api";
import Variable from "./Variable";
import ejs from "ejs";

const DILIMITER = "?";

const templates = require.context("./", true, /\.ejs$/);
const variables = require.context("./", true, /\.ts$/);
const scripts = require.context("./", true, /\.script.ejs$/);

let tems: { [key: string]: any } = {};
let vars: { [key: string]: Variable[] } = {};
let js: { [key: string]: string } = {};

templates.keys().map((key) => {
  const token = key.match(/(?<=\/)[a-zA-Z0-9]*(?=.ejs)/)?.[0];
  tems[token as string] = templates(key);
});

variables.keys().map((key) => {
  const token = key.match(/(?<=\/)[a-zA-Z0-9]*(?=.variables.ts)/)?.[0];
  if (token) {
    vars[token] = variables(key).default;
  }
});

scripts.keys().map((key) => {
  const token = key.match(/(?<=\/)[a-zA-Z0-9]*(?=.script.ejs)/)?.[0];
  js[token as string] = scripts(key);
});

/**
 * ejs 模板操作结构
 *
 * @export
 * @class TemplateService
 */
export class TemplateService {
  template: string;
  variables: Variable[];
  js: string;

  /**
   * 最后的渲染结果
   *
   * @memberof TemplateService
   */
  html: Ref<string>;

  /**
   * as a model
   *
   * @memberof TemplateService
   */
  config: { [key: string]: string };
  constructor(template: string, variables: Variable[], js: string) {
    this.template = template;
    this.variables = variables;
    this.js = js;
    this.html = ref("");
    const config: { [key: string]: string } = {};
    for (let item of this.variables) {
      config[item.name] = item.initialValue || "";
    }
    this.config = reactive<{ [key: string]: string }>(config);
    // 页面首次展示时，渲染一遍
    // onMounted(() => {
    this.render();
    // });
    // config 改变时 重新渲染
    watch(this.config, () => {
      this.render();
    });
  }

  private render() {
    const newConfig = { ...this.config };
    this.html.value = ejs.render(this.template, newConfig, {
      delimiter: DILIMITER,
    });
  }
}

// 导出符合 service 配置项的结构
let result: { [key: string]: [string, Variable[], string] } = {};
for (let key in tems) {
  result[key] = [tems[key], vars[key], js[key]];
}

export default result;
