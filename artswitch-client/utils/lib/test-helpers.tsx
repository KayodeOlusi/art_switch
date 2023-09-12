import ReactTestUtils from "react-dom/test-utils";
import { MatcherOptions, act, fireEvent, screen } from "@testing-library/react";

const roleElement = (role: string, options?: MatcherOptions) =>
  screen.getByRole(role, options);
const textElement = (text: string, options?: MatcherOptions) =>
  screen.getByText(text, options);
const testIdElement = (testId: string, options?: MatcherOptions) =>
  screen.getByTestId(testId, options);
const inputField = (field: string, options?: MatcherOptions) =>
  screen.getByPlaceholderText(field, options);
const imageElement = (altText: string, options?: MatcherOptions) =>
  screen.getByAltText(altText, options);
const queryImageElement = (altText: string, options?: MatcherOptions) =>
  screen.queryByAltText(altText, options);

const elementById = (id: string) => document.getElementById(id);

const click = (element: HTMLElement) => fireEvent.click(element);

const clickAndUpdate = <T extends Element>(element: T) =>
  act(() => fireEvent.click(element as T));

const onChangeInput = (
  input: HTMLInputElement | HTMLTextAreaElement,
  value: string
) => fireEvent.change(input, { target: { value } });

const submitForm = (form: HTMLFormElement) => fireEvent.submit(form);

const submitFormAndSimulate = (form: HTMLFormElement, eventCb?: () => void) =>
  act(() =>
    ReactTestUtils.Simulate.submit(form, {
      preventDefault: eventCb,
    })
  );

export {
  click,
  roleElement,
  textElement,
  testIdElement,
  inputField,
  onChangeInput,
  submitForm,
  clickAndUpdate,
  submitFormAndSimulate,
  imageElement,
  queryImageElement,
  elementById,
};
