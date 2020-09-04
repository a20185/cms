import { ref } from "@vue/composition-api";

/**
 * 小部件服务
 *
 * @export
 * @class WidgetService
 */
export default class WidgetService {
  /**
   * 分隔内容的 token
   *
   * @static
   * @memberof WidgetService
   */
  static seperateToken = /\&\&\-.*\-\&\&/g;

  /**
   * 匹配内容的 token
   *
   * @static
   * @memberof WidgetService
   */
  static matchToken = /(?<=\&\&\-).*(?=\-\&\&)/g;

  /**
   * 分隔变量的 token
   *
   * @static
   * @memberof WidgetService
   */
  static variableToken = /\&\&/;
  html = ref("");
  script = ref("");

  htmlVariables: string[] = [];
  scriptVariables: string[] = [];
  private htmlSnippets: string[] = [];
  private scriptSnippets: string[] = [];

  constructor(init: { html: string; script: string }) {
    this.html.value = init.html;
    this.script.value = init.script;
    this.genSnippetsAndVariables();
    this.submit();
  }

  /**
   * 初始化片段和变量
   *
   * @memberof WidgetService
   */
  genSnippetsAndVariables() {
    this.htmlSnippets = this.html.value.split(WidgetService.seperateToken);
    this.scriptSnippets = this.script.value.split(WidgetService.seperateToken);
    this.htmlVariables = this.html.value.match(WidgetService.matchToken) || [];
    this.scriptVariables =
      this.script.value.match(WidgetService.matchToken) || [];
  }

  /**
   * 变量更新作用于 snippet
   *
   * @param {string[]} snippets
   * @param {string[]} variables
   * @returns
   * @memberof WidgetService
   */
  submitChange(snippets: string[], variables: string[]) {
    if (snippets.length !== variables.length + 1)
      throw new Error("template format error");
    let result = snippets[0];
    for (let key in variables) {
      result +=
        variables[key].split(WidgetService.variableToken)[0] +
        snippets[parseInt(key) + 1];
    }
    return result;
  }

  /**
   * 变量更新生效
   *
   * @memberof WidgetService
   */
  submit() {
    this.html.value = this.submitChange(this.htmlSnippets, this.htmlVariables);
    this.script.value = this.submitChange(
      this.scriptSnippets,
      this.scriptVariables
    );
  }

  /**
   * 返回生成结果
   *
   * @returns
   * @memberof WidgetService
   */
  getResult() {
    return {
      html: this.html.value,
      script: this.script.value,
    };
  }
}
