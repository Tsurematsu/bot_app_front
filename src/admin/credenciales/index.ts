import { LitElement, css, html, unsafeCSS } from 'lit';
import { customElement } from 'lit/decorators.js';
import styles from "./credenciales.css?inline"

export default function credenciales(){
    return html`
        <credenciales_admin-el></credenciales_admin-el>
    `
}

@customElement('credenciales_admin-el')
export class credencialesClass extends LitElement {
    static styles = css`${unsafeCSS(styles)}`
    render() {
        return html`
            <div class="container">
                <header class="header">
                    <h1>Generar código de acceso</h1>
                </header>

                <main class="main">
                <div class="form-group">
                    <label for="username">Nombre de usuario</label>
                    <input type="text" id="username" placeholder="Ingrese el nombre de usuario">
                </div>

                <button class="generate-button">Generar código</button>

                <div class="form-group">
                    <label for="generated-code">Código generado</label>
                    <div class="generated-code-container">
                    <input type="text" id="generated-code" value="XF34K-9G2B7-L5P1R-M8V6W" readonly>
                    <button class="copy-button">
                        <span class="material-symbols-outlined">copy</span>
                    </button>
                    </div>
                </div>
                </main>
            </div>
        `;
    }
}
