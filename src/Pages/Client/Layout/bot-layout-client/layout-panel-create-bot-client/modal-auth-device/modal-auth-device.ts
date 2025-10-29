import { LitElement, css, html, unsafeCSS } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import styles from "./modal-auth-device.css?inline"
import images from '../../../../../../images';

@customElement('modal-auth-device')
export class ModalAuthDevice extends LitElement {
    static styles = css`${unsafeCSS(styles)}`
    
    @state() public open = false
    @state() public config = {
        code : "",
        imageBase64 : "",
        starting : false
    }
    render() {
        if (!this.open) return ""
        return html`
            <div class="overlay" @click="${()=>this.open=false}">
                <div class="modal" @click="${(e: Event) => e.stopPropagation()}">
                    <header class="modal-header">
                        <h2>Confirmación requerida</h2>
                        <button class="close-btn" @click="${()=>this.open=false}">✕</button>
                    </header>
                    <section class="modal-body">
                        ${this.config.code.length > 0 ? html`
                        <div @click=${async ()=>{await navigator.clipboard.writeText(this.config.code);}} class="section">
                            <h3>Ingrese el código en su dispositivo</h3>
                            <p class="code"><strong>${this.config.code}</strong></p>
                        </div>
                        `:""}
                        ${this.config.imageBase64.length > 0 ? html`
                        <div class="section">
                            <h3>Resuelva el captcha</h3>
                            <img src="${this.config.imageBase64}" alt="Captcha" class="captcha" />
                        </div>
                        `:""}
                        ${this.config.starting?html`
                            <div class="section onLoading">
                                <h3>Ya casi estamos listos! preparando sistema de respuestas...</h3>
                                <img src="${images.rocket}" width="100" alt="">
                            </div>
                        `:""}
                        ${this.config.imageBase64.length == 0 && this.config.code.length == 0 && !this.config.starting ? html`
                        <div class="section onLoading">
                            <h3>Espere mientras preparamos su bot...</h3>
                            <img src="${images.configuracionDeLaAplicacionMovil}" width="100" alt="">
                        </div>
                        `:""}
                    </section>
                </div>
            </div>
        `;
    }
}
