import { test, expect } from "@playwright/test";

function isVotingAge(age) {
  if (typeof age !== "number") {
    throw new Error("Передайте число");
  } else if (age > 150) {
    throw new Error("Так довго не живуть. Ви точно людина?");
  } else if (age < 0) {
    throw new Error("Ви прибули з майбутнього?");
  } else if (age >= 18) {
    return "Ви можете голосувати.";
  } else if (age < 18) {
    return "Ви ще не можете голосувати.";
  }
}

test("вік менше 18", () => {
  expect(isVotingAge(17)).toBe("Ви ще не можете голосувати.");
});

test("вік 18", () => {
  expect(isVotingAge(18)).toBe(	"Ви можете голосувати.");
});

test("вік 19", () => {
  expect(isVotingAge(25)).toBe(	"Ви можете голосувати.");
});

test("вік менше 0", () => {
  expect(() => isVotingAge(-1)).toThrow("Ви прибули з майбутнього?");
});

test("вік більше 150", () => {
  expect(() => isVotingAge(151)).toThrow("Так довго не живуть. Ви точно людина?");
});

test("рядок спричиняє помилку", () => {
  expect(() => isVotingAge("18")).toThrow("Передайте число");
});