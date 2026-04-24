#!/usr/bin/env node

"use strict";

// Supported operations:
// - addition (+)
// - subtraction (-)
// - multiplication (x, X, *, ×)
// - division (/, ÷)
// - modulo (%)
// - exponentiation/power (**, ^)
// - square root (sqrt) — unary: sqrt <number>

const OPERATIONS = {
  "+": {
    description: "addition",
    calculate: (left, right) => left + right,
  },
  "-": {
    description: "subtraction",
    calculate: (left, right) => left - right,
  },
  x: {
    description: "multiplication",
    calculate: (left, right) => left * right,
  },
  X: {
    description: "multiplication",
    calculate: (left, right) => left * right,
  },
  "*": {
    description: "multiplication",
    calculate: (left, right) => left * right,
  },
  "×": {
    description: "multiplication",
    calculate: (left, right) => left * right,
  },
  "/": {
    description: "division",
    calculate: (left, right) => {
      if (right === 0) {
        throw new Error("Division by zero is not allowed.");
      }

      return left / right;
    },
  },
  "÷": {
    description: "division",
    calculate: (left, right) => {
      if (right === 0) {
        throw new Error("Division by zero is not allowed.");
      }

      return left / right;
    },
  },
  "%": {
    description: "modulo",
    calculate: (left, right) => {
      if (right === 0) {
        throw new Error("Modulo by zero is not allowed.");
      }

      return left % right;
    },
  },
  "**": {
    description: "power",
    calculate: (left, right) => Math.pow(left, right),
  },
  "^": {
    description: "power",
    calculate: (left, right) => Math.pow(left, right),
  },
};

// Unary operations (single operand)
// - square root (sqrt)
const UNARY_OPERATIONS = {
  sqrt: {
    description: "square root",
    calculate: (value) => {
      if (value < 0) {
        throw new Error("Square root of a negative number is not allowed.");
      }

      return Math.sqrt(value);
    },
  },
};

function showUsage() {
  console.error("Usage: node src/calculator.js <number> <operator> <number>");
  console.error("       node src/calculator.js sqrt <number>");
  console.error("Examples:");
  console.error("  node src/calculator.js 8 + 4");
  console.error("  node src/calculator.js 8 x 4");
  console.error("  node src/calculator.js 8 / 4");
  console.error("  node src/calculator.js 10 % 3");
  console.error("  node src/calculator.js 2 ** 8");
  console.error("  node src/calculator.js sqrt 16");
}

function parseNumber(value, label) {
  const parsed = Number(value);

  if (Number.isNaN(parsed)) {
    throw new Error(`${label} must be a valid number. Received: ${value}`);
  }

  return parsed;
}

function calculate(leftValue, operator, rightValue) {
  const operation = OPERATIONS[operator];

  if (!operation) {
    throw new Error(
      `Unsupported operator: ${operator}. Use one of +, -, x, X, *, ×, /, ÷, %, **, ^, or sqrt <number>.`,
    );
  }

  const left = parseNumber(leftValue, "The first value");
  const right = parseNumber(rightValue, "The second value");

  return operation.calculate(left, right);
}

function squareRoot(value) {
  const num = parseNumber(value, "The value");

  return UNARY_OPERATIONS.sqrt.calculate(num);
}

function calculateUnary(operatorName, value) {
  const operation = UNARY_OPERATIONS[operatorName];

  if (!operation) {
    throw new Error(`Unsupported unary operator: ${operatorName}.`);
  }

  const num = parseNumber(value, "The value");

  return operation.calculate(num);
}

function run(argv) {
  // Handle unary operations: <operator> <number>
  if (argv.length === 2 && UNARY_OPERATIONS[argv[0]]) {
    try {
      const result = calculateUnary(argv[0], argv[1]);
      console.log(result);
    } catch (error) {
      console.error(error.message);
      process.exitCode = 1;
    }

    return;
  }

  if (argv.length !== 3) {
    showUsage();
    process.exitCode = 1;
    return;
  }

  const [leftValue, operator, rightValue] = argv;

  try {
    const result = calculate(leftValue, operator, rightValue);
    console.log(result);
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}

if (require.main === module) {
  run(process.argv.slice(2));
}

module.exports = {
  calculate,
  squareRoot,
  OPERATIONS,
  UNARY_OPERATIONS,
};
