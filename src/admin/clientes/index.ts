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
            <h2>Clientes</h2>
            <div class="api-list">
                ${userItem()}
                ${userItem()}
                ${userItem()}
                ${userItem()}
                ${userItem()}
                ${userItem()}
                ${userItem()}
                ${userItem()}
                ${userItem()}
                ${userItem()}
            </div>
        `;
    }
}
