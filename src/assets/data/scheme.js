const options = [{ value: "+" }, { value: "-" }, { value: "*" }];
export const scheme = [
  {
    label: "Поле 1",
    name: "field1",
    type: "number",
    validations: {
      required: true,
      min: 0,
      max: 100,
    },
  },
  {
    label: "Поле 2",
    name: "field2",
    type: "select",
    options,
    validations: {
      required: true,
    },
  },
  {
    label: "Поле 3",
    name: "field3",
    type: "number",
    validations: {
      required: true,
      min: 0,
      max: 100,
    },
  },
  {
    label: "Поле 4",
    name: "field4",
    type: "select",
    options,
    validations: {
      required: true,
    },
  },
  {
    label: "Поле 5",
    name: "field5",
    type: "number",
    validations: {
      required: true,
      min: 0,
      max: 100,
    },
  },
];
