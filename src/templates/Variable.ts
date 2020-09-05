/**
 * ejs 以及配置表单配置
 *
 * @export
 * @interface Variable
 */
export default interface Variable {
  /**
   * 变量名
   *
   * @type {string}
   * @memberof Variable
   */
  name: string;

  /**
   * 配置表单标签
   *
   * @type {string}
   * @memberof Variable
   */
  formLabel: string;

  /**
   * 变量初始值
   *
   * @type {any}
   * @memberof Variable
   */
  initialValue?: any;

  /**
   * 采用何种表单组件？
   *
   * @type {string}
   * @memberof Variable
   */
  formComponent?: string;

  /**
   * 表单组件参数
   *
   * @type {{ [key: string]: any }}
   * @memberof Variable
   */
  formComponentProps?: { [key: string]: any };

  remark?: string;
}
