const { calculate, OPERATIONS } = require("../calculator");

describe("calculator operations", () => {
  describe("addition", () => {
    test("adds the example values from the image", () => {
      expect(calculate("2", "+", "3")).toBe(5);
    });

    test("adds negative numbers", () => {
      expect(calculate("-5", "+", "-4")).toBe(-9);
    });

    test("adds decimal values", () => {
      expect(calculate("2.5", "+", "3.5")).toBe(6);
    });
  });

  describe("subtraction", () => {
    test("subtracts the example values from the image", () => {
      expect(calculate("10", "-", "4")).toBe(6);
    });

    test("subtracts to a negative result", () => {
      expect(calculate("4", "-", "10")).toBe(-6);
    });

    test("subtracts decimal values", () => {
      expect(calculate("5.5", "-", "2.25")).toBe(3.25);
    });
  });

  describe("multiplication", () => {
    test("multiplies the example values from the image", () => {
      expect(calculate("45", "*", "2")).toBe(90);
    });

    test("supports x as a multiplication operator", () => {
      expect(calculate("6", "x", "7")).toBe(42);
    });

    test("supports × as a multiplication operator", () => {
      expect(calculate("3", "×", "4")).toBe(12);
    });

    test("multiplies by zero", () => {
      expect(calculate("99", "*", "0")).toBe(0);
    });
  });

  describe("division", () => {
    test("divides the example values from the image", () => {
      expect(calculate("20", "/", "5")).toBe(4);
    });

    test("supports ÷ as a division operator", () => {
      expect(calculate("18", "÷", "3")).toBe(6);
    });

    test("returns fractional results", () => {
      expect(calculate("7", "/", "2")).toBe(3.5);
    });

    test("rejects division by zero", () => {
      expect(() => calculate("8", "/", "0")).toThrow(
        "Division by zero is not allowed.",
      );
    });
  });

  describe("input validation", () => {
    test("rejects unsupported operators", () => {
      expect(() => calculate("8", "%", "2")).toThrow(
        "Unsupported operator: %. Use one of +, -, x, X, *, ×, /, ÷.",
      );
    });

    test("rejects an invalid first value", () => {
      expect(() => calculate("apple", "+", "2")).toThrow(
        "The first value must be a valid number. Received: apple",
      );
    });

    test("rejects an invalid second value", () => {
      expect(() => calculate("2", "+", "pear")).toThrow(
        "The second value must be a valid number. Received: pear",
      );
    });
  });

  test("documents the four supported operation types", () => {
    const supportedDescriptions = new Set(
      Object.values(OPERATIONS).map((operation) => operation.description),
    );

    expect(supportedDescriptions).toEqual(
      new Set(["addition", "subtraction", "multiplication", "division"]),
    );
  });
});
