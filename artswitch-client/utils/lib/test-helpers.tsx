import ReactTestUtils from "react-dom/test-utils";
import { act, fireEvent, screen } from "@testing-library/react";

const roleElement = (role: string) => screen.getByRole(role);
const textElement = (text: string) => screen.getByText(text);
const testIdElement = (testId: string) => screen.getByTestId(testId);
const inputField = (field: string) => screen.getByPlaceholderText(field);
const imageElement = (altText: string) => screen.getByAltText(altText);
const queryImageElement = (altText: string) => screen.queryByAltText(altText);

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
};
