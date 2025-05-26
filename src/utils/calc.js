const toRpn = (statement) => {
  const stack = [];
  const result = [];

  const operators = {
    "+": 0,
    "-": 0,
    "*": 1,
  };

  for (let char of statement) {
    if (Number(char)) {
      result.push(char);
    } else if (operators.hasOwnProperty(char)) {
      while (operators[stack.slice(-1)[0]] >= operators[char]) {
        result.push(stack.pop());
      }
      stack.push(char);
    }
  }

  let sym = "";

  while ((sym = stack.pop())) {
    result.push(sym);
  }

  return result;
};

const calcFromRpn = (tokens) => {
  const stack = [];

  for (let token of tokens) {
    if (!isNaN(token)) {
      stack.push(Number(token));
    } else {
      const secondOperand = stack.pop();
      const firstOperand = stack.pop();

      switch (token) {
        case "+":
          stack.push(firstOperand + secondOperand);
          break;
        case "-":
          stack.push(firstOperand - secondOperand);
          break;
        case "*":
          stack.push(firstOperand * secondOperand);
          break;
        default:
          console.error(`Unknown operation: ${token}`);
      }
    }
  }

  return stack.pop();
};

export const calculateExpression = (array) => {
  const rpn = toRpn(array);
  return calcFromRpn(rpn);
};
