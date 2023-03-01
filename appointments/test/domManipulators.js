import ReactDOM from "react-dom/client";
import { act } from "react-dom/test-utils";

export const createContainer = () => {
  const container = document.createElement("div");
  return {
    render: (component) =>
      act(() => ReactDOM.createRoot(container).render(component)),
    container,
  };
};
