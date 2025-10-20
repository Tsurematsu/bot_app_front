import { LitElement, html, unsafeCSS, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import styles from "./styles.css?inline"
export default function Request() {
    return html`<request-code></request-code>`
}

@customElement('request-code')
export class Index extends LitElement {
    static styles = css`${unsafeCSS(styles)}`
    render() {
        return html`
            <link href="https://fonts.googleapis.com" rel="preconnect" />
            <link href="https://fonts.gstatic.com" rel="preconnect" />
            <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap" rel="stylesheet" />
            <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet" />
            <link href="styles-login.css" rel="stylesheet" />
            <div class="body">
                <div class="container">
                    <main class="main">
                        <div class="text-center">
                            <h2 class="title">Ingresa tu correo electrónico</h2>
                            <p class="subtitle">Te enviaremos un código de acceso para iniciar sesión de forma segura.</p>
                        </div>
            
                        <div class="input-container">
                            <label class="visually-hidden" for="email">Correo electrónico</label>
                            <input class="email-input" id="email" placeholder="Correo electrónico" type="email" />
                        </div>
            
                        <div class="button-container">
                            <button class="submit-button">Enviar Código</button>
                        </div>
                    </main>
            
                    <footer class="footer">
                        <p class="footer-text">
                            ¿Necesitas ayuda? <a class="footer-link" href="#">Contacta con soporte</a>
                        </p>
                    </footer>
                </div>
            </div>
        `;
    }
}
