import { customElement } from 'lit/decorators.js';
import { LitElement, html, unsafeCSS, css } from 'lit';
import styles from  "./styles.css?inline"
@customElement('into-code')
export class Index extends LitElement {
    static styles = css`${unsafeCSS(styles)}`
    render() {
        return html`
            <link href="data:image/x-icon;base64," rel="icon" type="image/x-icon" />
            <link href="https://fonts.googleapis.com" rel="preconnect" />
            <link href="https://fonts.gstatic.com" rel="preconnect" />
            <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;900&display=swap" rel="stylesheet" />
            <link href="styles.css" rel="stylesheet" />
            <div class="body">
                <div class="container">
                    <div class="content-wrapper">
                        <header class="header">
                            <button class="back-button">
                                <svg fill="currentColor" height="24" viewBox="0 0 256 256" width="24"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M224,128a8,8,0,0,1-8,8H59.31l58.35,58.34a8,8,0,0,1-11.32,11.32l-72-72a8,8,0,0,1,0-11.32l72-72a8,8,0,0,1,11.32,11.32L59.31,120H216A8,8,0,0,1,224,128Z">
                                    </path>
                                </svg>
                            </button>
                            <h2 class="header-title">Iniciar sesión</h2>
                        </header>
            
                        <main class="main">
                            <div class="text-center">
                                <h1 class="title">Introduce el código de acceso</h1>
                                <p class="subtitle">Hemos enviado un código de acceso a tu dirección de correo electrónico.</p>
                            </div>
            
                            <div class="input-wrapper">
                                <fieldset class="input-group">
                                    <input class="code-input" maxlength="1" type="text" />
                                    <input class="code-input" maxlength="1" type="text" />
                                    <input class="code-input" maxlength="1" type="text" />
                                    <input class="code-input" maxlength="1" type="text" />
                                    <input class="code-input" maxlength="1" type="text" />
                                    <input class="code-input" maxlength="1" type="text" />
                                </fieldset>
                            </div>
            
                            <div class="button-wrapper">
                                <button class="confirm-button">Confirmar</button>
                            </div>
                        </main>
                    </div>
            
                    <footer class="footer">
                        <div class="footer-content">
                            <span class="footer-text">¿No has recibido el código?</span>
                            <a class="footer-link" href="#">Reenviar</a>
                        </div>
                    </footer>
                </div>
            
                <script>
                    const inputs = document.querySelectorAll('fieldset input');
                    inputs.forEach((input, index) => {
                        input.addEventListener('keyup', (e) => {
                            if (e.key >= 0 && e.key <= 9) {
                                if (input.value.length === 1 && index < inputs.length - 1) {
                                    inputs[index + 1].focus();
                                }
                            } else if (e.key === 'Backspace') {
                                if (index > 0) {
                                    inputs[index - 1].focus();
                                }
                            }
                        });
                    });
                </script>
            </div>    
        `;
    }
}
