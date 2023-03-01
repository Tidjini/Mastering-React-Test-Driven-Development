import ReactDOM from "react-dom";

export const createContainer = () => {
  const container = document.createElement("div");
  return {
    render: (component) => ReactDOM.createRoot(container).render(component),
    container,
  };
};
