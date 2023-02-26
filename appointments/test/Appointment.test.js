//jest use jsdom a headless implementation of the DOM
describe("Appointements", () => {
  it("render the customer first name", () => {
    expect(document.body.textContent).toMatch("Ashley");
  });
});
