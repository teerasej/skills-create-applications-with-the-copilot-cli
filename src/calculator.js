#!/usr/bin/env node

"use strict";

// Supported operations:
// - addition (+)
// - subtraction (-)
// - multiplication (x, X, *, ×)
// - division (/, ÷)
// - modulo (%)
// - power (^)
// - square root (sqrt, √)

function divide(left, right) {
  if (right === 0) {
    throw new Error("Division by zero is not allowed.");
  }

  return left / right;
}

function modulo(left, right) {
  if (right === 0) {
    throw new Error("Modulo by zero is not allowed.");
  }

  return left % right;
}

function power(base, exponent) {
  return base ** exponent;
}

function squareRoot(value) {
  if (value < 0) {
    throw new Error("Square root of a negative number is not allowed.");
  }

  return Math.sqrt(value);
}

const OPERATIONS = {
  "+": {
    description: "addition",
    arity: 2,
    calculate: (left, right) => left + right,
  },
  "-": {
    description: "subtraction",
    arity: 2,
    calculate: (left, right) => left - right,
  },
  x: {
    description: "multiplication",
    arity: 2,
    calculate: (left, right) => left * right,
  },
  X: {
    description: "multiplication",
    arity: 2,
    calculate: (left, right) => left * right,
  },
  "*": {
    description: "multiplication",
    arity: 2,
    calculate: (left, right) => left * right,
  },
  "×": {
    description: "multiplication",
    arity: 2,
    calculate: (left, right) => left * right,
  },
  "/": {
    description: "division",
    arity: 2,
    calculate: divide,
  },
  "÷": {
    description: "division",
    arity: 2,
    calculate: divide,
  },
  "%": {
    description: "modulo",
    arity: 2,
    calculate: modulo,
  },
  "^": {
    description: "power",
    arity: 2,
    calculate: power,
  },
  sqrt: {
    description: "square root",
    arity: 1,
    calculate: squareRoot,
  },
  "√": {
    description: "square root",
    arity: 1,
    calculate: squareRoot,
  },
};

const SUPPORTED_OPERATORS = Object.keys(OPERATIONS).join(", ");

function showUsage() {
  console.error("Usage: node src/calculator.js <number> <operator> <number>");
  console.error("   or: node src/calculator.js <operator> <number>");
  console.error("Examples:");
  console.error("  node src/calculator.js 8 + 4");
  console.error("  node src/calculator.js 8 x 4");
  console.error("  node src/calculator.js 8 / 4");
  console.error("  node src/calculator.js 10 % 3");
  console.error("  node src/calculator.js 2 ^ 5");
  console.error("  node src/calculator.js sqrt 81");
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
    throw new Error(`Unsupported operator: ${operator}. Use one of ${SUPPORTED_OPERATORS}.`);
  }

  if (operation.arity === 1) {
    const value = parseNumber(leftValue, "The value");
    return operation.calculate(value);
  }

  const left = parseNumber(leftValue, "The first value");
  const right = parseNumber(rightValue, "The second value");
  return operation.calculate(left, right);
}

function run(argv) {
  if (argv.length !== 2 && argv.length !== 3) {
    showUsage();
    process.exitCode = 1;
    return;
  }

  const [leftValue, operator, rightValue] =
    argv.length === 2 ? [argv[1], argv[0], undefined] : argv;

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
  modulo,
  power,
  squareRoot,
  OPERATIONS,
};
