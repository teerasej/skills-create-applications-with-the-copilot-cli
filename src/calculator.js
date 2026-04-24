#!/usr/bin/env node

"use strict";

// Supported operations:
// - addition (+)
// - subtraction (-)
// - multiplication (x, X, *, ×)
// - division (/, ÷)

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
};

function showUsage() {
  console.error("Usage: node src/calculator.js <number> <operator> <number>");
  console.error("Examples:");
  console.error("  node src/calculator.js 8 + 4");
  console.error("  node src/calculator.js 8 x 4");
  console.error("  node src/calculator.js 8 / 4");
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
      `Unsupported operator: ${operator}. Use one of +, -, x, X, *, ×, /, ÷.`,
    );
  }

  const left = parseNumber(leftValue, "The first value");
  const right = parseNumber(rightValue, "The second value");

  return operation.calculate(left, right);
}

function run(argv) {
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
  OPERATIONS,
};
