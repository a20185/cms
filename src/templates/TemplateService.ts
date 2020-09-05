import ejs from "ejs";
import { Ref, reactive, ref, watch } from "@vue/composition-api";
import Variable from "./Variable";
/**
 * ejs 模板操作结构
 *
 * @export
 * @class TemplateService
 */
export default class TemplateService {
  template: string;
  variables: Variable[];
  js: string;

  /**
   * 模板渲染结果
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
    this.render();
    // config 改变时 重新渲染 !只渲染 html
    watch(this.config, () => {
      this.render();
    });
  }

  private render() {
    const newConfig = { ...this.config };
    this.html.value = ejs.render(this.template, newConfig, {
      delimiter: "?",
    });
  }

  /**
   * 渲染到一个 root 节点
   *
   * @param {(ShadowRoot | undefined)} nodeRef
   * @returns
   * @memberof TemplateService
   */
  renderNode(nodeRef: ShadowRoot | undefined) {
    if (!nodeRef) {
      // 如果 nodeRef 不存在，不执行渲染
      return;
    }
    // 清空 ref 下属
    nodeRef.innerHTML = "";
    setTimeout(() => {
      // 依赖
      for (let dep of this.getCommonDependency()) {
        nodeRef.appendChild(dep);
      }
      // 内容节点
      const content = document.createElement("div");
      content.innerHTML = this.html.value;
      nodeRef.appendChild(content);
      // 脚本
      nodeRef.appendChild(this.getScriptNode());
    }, 0);
  }

  /**
   * 装配组件公共依赖
   *
   * @private
   * @returns
   * @memberof TemplateService
   */
  private getCommonDependency() {
    const bootstrapCoreCss = document.createElement("link");
    bootstrapCoreCss.setAttribute("rel", "stylesheet");
    bootstrapCoreCss.setAttribute(
      "href",
      "https://cdn.bootcdn.net/ajax/libs/twitter-bootstrap/3.4.1/css/bootstrap.min.css"
    );
    const jquery = document.createElement("script");
    jquery.setAttribute(
      "src",
      "https://cdn.bootcdn.net/ajax/libs/jquery/3.4.1/jquery.min.js"
    );
    const bootStrapCoreJs = document.createElement("script");
    bootStrapCoreJs.setAttribute(
      "src",
      "https://cdn.bootcdn.net/ajax/libs/twitter-bootstrap/3.4.1/js/bootstrap.min.js"
    );
    return [bootstrapCoreCss, jquery, bootStrapCoreJs];
  }

  /**
   * 装配组件 script
   *
   * @private
   * @returns
   * @memberof TemplateService
   */
  private getScriptNode() {
    const scriptNode = document.createElement("script");
    scriptNode.innerHTML = this.js
      .replace(/\<script\>/, "")
      .replace(/\<\/script\>/, "");
    return scriptNode;
  }
}