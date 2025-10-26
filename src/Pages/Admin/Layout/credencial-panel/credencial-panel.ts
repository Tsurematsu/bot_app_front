import { css, html, LitElement, unsafeCSS } from 'lit';
import { customElement } from 'lit/decorators.js';
import styles from "./credencial-panel.css?inline"
@customElement('credencial-panel')
export class CredencialPanel extends LitElement {
    static styles = css`${unsafeCSS(styles)}`
    render() {
        return html`
            <content-component>
                <header class="header">
                    <h1>Credenciales</h1>
                </header>
                
            </content-component>
            <slot></slot>
        `;
    }
}
