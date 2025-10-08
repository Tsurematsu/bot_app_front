import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';

export default function page404(){
    return html`
        <page404-el></page404-el>
    `
}
@customElement('page404-el')
export class Page404Class extends LitElement {
    render() {
        return html`
            <h1>La pagina que desea buscar no existe</h1>
        `;
    }
}
