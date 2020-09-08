import { Variable } from "../TemplateService";

const variable: Variable[] = [
  {
    name: "test",
    formLabel: "测试",
    formComponent: "a-textarea",
    formComponentProps: {
      size: "small",
      placeholder: "fuckfuckfuck",
    },
    formValueProp: "value",
    initialValue: "fuck",
  },
  {
    name: "fuck",
    formLabel: "奸诈玩一波",
    formComponent: "a-select",
    formComponentProps: {
      options: [
        { label: "red", value: "red" },
        { label: "black", value: "black" },
      ],
    },
    formValueProp: "defaultValue",
    initialValue: "red",
  },
];

export default variable;
