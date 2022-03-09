// https://docs.cypress.io/api/introduction/api.html

describe("TimezoneConverter Test", () => {
  it("shows current time and update automatically", () => {
    const now = new Date();
    now.setHours(8, 10);
    // overrides native global functions which is related with Date()
    cy.clock(now)
    cy.visit("/");
    cy.get("[data-test='timePickerContainer'] .el-input__inner")
      .should("have.value", "08:10");
    // Move time after overriding a native time function with cy.clock().
    cy.tick(60 * 1000);
    cy.get("[data-test='timePickerContainer'] .el-input__inner")
      .should("have.value", "08:11");
  });

  it("updates time manually and doesn't update automatically", () => {
    const now = new Date();
    now.setHours(8, 10);
    cy.clock(now)
    cy.visit("/");
    cy.get("[data-test='timePickerContainer'] .el-input__inner")
      .should("have.value", "08:10")
      .clear()
      .type("09:00");
    cy.tick(60 * 1000);
    cy.get("[data-test='timePickerContainer'] .el-input__inner")
      .should("have.value", "09:00");
  });

  // TODO add more tests...
});
