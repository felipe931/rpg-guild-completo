import { MemoryRouter } from "react-router-dom";
import { render } from "@testing-library/react";

const wrapper = ({ children }) => <MemoryRouter>{children}</MemoryRouter>;

const customRender = (ui, options) => render(ui, { wrapper, ...options });

export * from  '@testing-library/react'
export { customRender as render };
