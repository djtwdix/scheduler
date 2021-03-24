

describe("Appointments", () => {
  beforeEach(() => {
    cy.visit("/")
    cy.request("GET", "/api/debug/reset")
    cy.contains("Monday")
  })
  it("should book an interview", () => {
    cy.get(":nth-child(2) > .appointment__add > .appointment__add-button").click()
    cy.get("[data-testid=student-name-input]").type("Daniel James")
    cy.get("[alt='Sylvia Palmer']").click()
    cy.contains("Save").click()
    cy.contains(".appointment__card--show", "Daniel James")
    cy.contains(".appointment__card--show", "Sylvia Palmer")
  })
});

