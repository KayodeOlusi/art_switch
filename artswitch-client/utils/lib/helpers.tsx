import { screen } from "@testing-library/react";

const roleElement = (role: string) => screen.getByRole(role);
const textElement = (text: string) => screen.getByText(text);
const testIdElement = (testId: string) => screen.getByTestId(testId);
const inputField = (field: string) => screen.getByPlaceholderText(field);

export { roleElement, textElement, testIdElement, inputField };
