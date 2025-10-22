import { customElement, property, query, queryAll } from 'lit/decorators.js';
import { LitElement, html, unsafeCSS, css, type PropertyValues } from 'lit';
import styles from "./styles.css?inline"
import FETCH from '../../tools/FETCH';
@customElement('into-code')
export class Index extends LitElement {
    @property() token = ""
    @property() email = ""
    @property() panelStatus
    @queryAll(".code-input") code: NodeListOf<HTMLInputElement>
    @query("#initInput") initInput :HTMLInputElement
    static styles = css`${unsafeCSS(styles)}`

    protected firstUpdated(_changedProperties: PropertyValues): void {
        this.initInput.focus()
        if (this.token) {
            FETCH.post("/auth/into_access_token", { token: this.token }).then((e) => {
                console.log("Acceso por token:", e);
                if (e.success && e.success == true) return location.href = "?client"
            })
        }
        this.setupInputHandlers();
    }

    private setupInputHandlers() {
        const inputs = Array.from(this.code);

        inputs.forEach((input, index) => {
            // Manejar el pegado de código
            input.addEventListener('paste', (e: ClipboardEvent) => {
                e.preventDefault();
                const pastedData = e.clipboardData?.getData('text').replace(/[^a-zA-Z0-9]/g, '').toUpperCase() || '';

                if (pastedData.length > 0) {
                    const chars = pastedData.split('');
                    chars.forEach((char, i) => {
                        if (index + i < inputs.length) {
                            inputs[index + i].value = char;
                        }
                    });

                    // Enfocar el siguiente input vacío o el último
                    const nextEmptyIndex = index + chars.length;
                    if (nextEmptyIndex < inputs.length) {
                        inputs[nextEmptyIndex].focus();
                    } else {
                        inputs[inputs.length - 1].focus();
                    }
                }
            });

            // Navegación automática al escribir
            input.addEventListener('input', (e: Event) => {
                const target = e.target as HTMLInputElement;
                const value = target.value.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
                target.value = value;

                if (value.length === 1 && index < inputs.length - 1) {
                    inputs[index + 1].focus();
                }
            });

            // Navegación con teclado
            input.addEventListener('keydown', (e: KeyboardEvent) => {
                const target = e.target as HTMLInputElement;

                if (e.key === 'Backspace' && target.value === '' && index > 0) {
                    inputs[index - 1].focus();
                    inputs[index - 1].value = '';
                } else if (e.key === 'ArrowLeft' && index > 0) {
                    e.preventDefault();
                    inputs[index - 1].focus();
                } else if (e.key === 'ArrowRight' && index < inputs.length - 1) {
                    e.preventDefault();
                    inputs[index + 1].focus();
                }
            });
        });
    }

    AccesCode() {
        const code = Object.values(this.code).map((e: HTMLInputElement, index) => (`${e.value}${((index+1)%3==0)?"-":""}`)).join(("")).slice(0, -1)
        if (!this.email) this.panelStatus(false)
        if (this.code.length == 0) return
        if (this.email.length == 0) this.panelStatus(false)
        const bodyData = { code:code.toUpperCase(), email: this.email }
        console.log(bodyData);
        
        FETCH.post("/auth/into_access_code", bodyData).then((e) => {
            if (e.success && e.success == true) return location.href = "?client"
            console.log(e);
        })
    }

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
                                    <div class="input-section">
                                        <input id="initInput" class="code-input" maxlength="1" type="text" />
                                        <input class="code-input" maxlength="1" type="text" />
                                        <input class="code-input" maxlength="1" type="text" />
                                    </div>
                                    <span class="separator">-</span>
                                    <div class="input-section">
                                        <input class="code-input" maxlength="1" type="text" />
                                        <input class="code-input" maxlength="1" type="text" />
                                        <input class="code-input" maxlength="1" type="text" />
                                    </div>
                                    <span class="separator">-</span>
                                    <div class="input-section">
                                        <input class="code-input" maxlength="1" type="text" />
                                        <input class="code-input" maxlength="1" type="text" />
                                        <input class="code-input" maxlength="1" type="text" />
                                    </div>
                                </fieldset>
                            </div>
            
                            <div class="button-wrapper">
                                <button @click=${this.AccesCode} class="confirm-button">Confirmar</button>
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
            </div>
        `;
    }
}