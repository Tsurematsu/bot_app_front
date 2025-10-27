import { css, html, LitElement, unsafeCSS, type PropertyValues } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import styles from "./page-client.css?inline"
import PageClientScript from './PageClientScript';
import "./components/into-email-code-component";
import images from '../../images';
import { unsafeSVG } from 'lit/directives/unsafe-svg.js';
import { Router } from '@vaadin/router';
@customElement('page-client')
export class Client extends LitElement {
    static styles = css`${unsafeCSS(styles)}`
    @state() panelCode = false
    @state() email = ""
    @state() disableSendEmail = false
    protected firstUpdated(_changedProperties: PropertyValues): void {
        PageClientScript.onLoad()
    }
    render() {
        if (this.panelCode) return html`<into-email-code-component .email=${this.email} .panelStatus=${(e)=>this.panelCode=e}></into-email-code-component>`
        return html`
            <link href="https://fonts.googleapis.com" rel="preconnect" />
            <link href="https://fonts.gstatic.com" rel="preconnect" />
            <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap" rel="stylesheet" />
            <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet" />
            <link href="styles-login.css" rel="stylesheet" />
            <button id="backImage" @click=${()=>Router.go("/")} >${unsafeSVG(images.svg.arrowBack)}</button>
            <div class="body">
                <div class="container">
                    <main class="main">

                        <div class="text-center">
                            <h2 class="title">Ingresa tu correo electrónico</h2>
                            <p class="subtitle">Te enviaremos un código de acceso para iniciar sesión de forma segura.</p>
                        </div>
            
                        <div class="input-container">
                            <label class="visually-hidden" for="email">Correo electrónico</label>
                            <input
                                .value=${this.email} 
                                class="email-input" 
                                id="email" 
                                placeholder="Correo electrónico" 
                                type="email"
                                @input=${(e: Event) => this.email = (e.target as HTMLInputElement).value}
                            />
                        </div>
            
                        <div class="button-container">
                            <button @click=${()=>PageClientScript.sendEmail(this.email, (e)=>{this.panelCode=e}, (e)=>{this.disableSendEmail=e})} class="submit-button" ?disabled=${this.disableSendEmail}>Enviar Código</button>
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
