import { css, html, LitElement, unsafeCSS } from 'lit';
import { customElement } from 'lit/decorators.js';
import styles from "./clientes.css?inline"
import userItem from './userItem';
export default function clientes(){
    return html`
        <clientes-el></clientes-el>
    `
}

@customElement('clientes-el')
export class ClientesClass extends LitElement {
    static styles = css`${unsafeCSS(styles)}`
    render() {
        return html`
            <header class="header">
                <h1>Clientes</h1>
            </header>
            <div class="api-list">
                ${userItem()}
            </div>
        `;
    }
}
