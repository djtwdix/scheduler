

describe("Appointments", () => {
  beforeEach(() => {
    cy.request("GET", "/api/debug/reset")
    cy.visit("/")
    cy.contains("Monday")
  })
  it("should book an interview", () => {
    cy.get("[alt=Add]").first().click()
    cy.get("[data-testid=student-name-input]").type("Daniel James")
    cy.get("[alt='Sylvia Palmer']").click()
    cy.contains("Save").click()
    cy.contains(".appointment__card--show", "Daniel James")
    cy.contains(".appointment__card--show", "Sylvia Palmer")
  })
  it("should edit an interview", () => {
    cy.get("[alt=Edit]").first().click({force:true})
    cy.get("[data-testid=student-name-input]").clear().type("Daniel James")
    cy.get("[alt='Sylvia Palmer']").click()
    cy.contains("Save").click()
    cy.contains(".appointment__card--show", "Daniel James")
    cy.contains(".appointment__card--show", "Sylvia Palmer")
  })
  it.only("should edit an interview", () => {
    cy.get("[alt=Delete]").first().click({force:true})
    cy.contains("button", "Confirm").click()
    cy.contains("Deleting")
    cy.contains("Deleting").should("not.exist")
    cy.contains(".appointment__card--show", "Archie Cohen")
    .should("not.exist");
  })
});

