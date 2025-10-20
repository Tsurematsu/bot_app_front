import { LitElement, css, html, unsafeCSS } from 'lit';
import { customElement } from 'lit/decorators.js';
import styles from "./credenciales.css?inline"
import Script from './Script';
export default function credenciales(setUrl){
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
                    <br>
                <div class="form-group">
                    <label for="username">Nombre de usuario</label>
                    <input name="username" type="text" placeholder="Ingrese el nombre de usuario">
                </div>

                <div class="form-group">
                    <label for="username">Email</label>
                    <input name="email" type="text" placeholder="Ingrese el email del usuario">
                </div>

                <div class="form-group">
                    <label for="username">Telefono</label>
                    <input name="telefono" type="text" placeholder="Ingrese telefono del usuario">
                </div>

                <button  @click=${Script.makeAcces} class="generate-button">Generar enlace de acceso</button>

                <div class="form-group">
                    <label for="generated-code">Enlace generado</label>
                    <div class="generated-code-container">
                    <input name="token" type="text" id="generated-code" value="" readonly>
                    <button @click=${Script.copy} class="copy-button">
                        <span class="material-symbols-outlined">copy</span>
                    </button>
                    </div>
                </div>
                </main>
            </div>
        `;
    }
}
