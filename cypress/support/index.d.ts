/// <reference types="cypress" />

declare namespace Cypress {
    interface Chainable<Subject> {
        assertFormValues(formIndex: number, formData: string | null): Chainable<any>
    }
}