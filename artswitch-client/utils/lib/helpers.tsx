import { screen } from "@testing-library/react";

export const roleElement = (role: string) => screen.getByRole(role);
export const textElement = (text: string) => screen.getByText(text);
export const testIdElement = (testId: string) => screen.getByTestId(testId);
export const inputField = (field: string) => screen.getByPlaceholderText(field);
