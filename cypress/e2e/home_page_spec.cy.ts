describe("The Home (Portfolio) Page", () => {
  it("successfully loads", () => {
    cy.visit("/");
  });

  it("renders the carousel", () => {
    cy.visit("/");
    cy.get("#carousel").should("exist");
  });

  it("renders the timeline", () => {
    cy.visit("/");
    cy.get("#timeline").should("exist");
    cy.get("#timeline").find("#event").should("not.be.empty");
  });

  it("renders the language groups", () => {
    cy.visit("/");
    cy.get("#lang-group").should("exist");
    cy.get("#lang-group").find("#lang-profile").should("not.be.empty");
  });
});
