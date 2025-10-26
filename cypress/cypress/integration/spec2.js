describe("Teste End-to-End", () => {
  it("Teste 1: Visita Página", () => {
    // (ajuste Windows) Container do Cypress acessa o host por host.docker.internal
    cy.visit("http://host.docker.internal:5000/")
  })

  it("Teste 2: Verifica item na página", () => {
    // Mesmo seletor do roteiro
    cy.get("[data-id=3]").should("contain.text", "Design Patterns")
  })

  it("Teste 3: Calcula Frete", () => {
    cy.get("[data-id=3]").within(() => {
      cy.get("input").type("10000-000")
      cy.contains("Calcular Frete").click()
      cy.wait(2000) // igual ao roteiro
    })
    cy.get(".swal-text").contains("O frete é: R$")
    cy.get(".swal-button").click()
  })

  // Tarefa #2: Comprar livro
  it("Teste 4: Realiza compra do livro", () => {
    cy.get("[data-id=3]").within(() => {
      cy.contains("Comprar").click()
    })

    // espera o pop-up e valida a mensagem
    cy.wait(2000)
    cy.get(".swal-text").should("contain.text", "Sua compra foi realizada com sucesso")

    // fecha o pop-up
    cy.get(".swal-button").click()
  })
})
