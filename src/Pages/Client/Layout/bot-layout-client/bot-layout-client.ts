import { css, html, LitElement, unsafeCSS } from 'lit';
import { customElement } from 'lit/decorators.js';
import styles from "./bot-layout-client.css?inline"
import images from '../../../../images';
@customElement('bot-layout-client')
export class BotLayoutClient extends LitElement {
    static styles = css`${unsafeCSS(styles)}`
    render() {
        return html`
            <!-- <modal-make-bot id="modal-make-bot" ></modal-make-bot> -->
            <div class="chatbots-header">
                <h2>Tus Chatbots</h2>
                <button class="btn-add-bot">
                    <span class="btn-icon">+</span>
                    <span class="btn-text">Añadir Bot</span>
                </button>
            </div>
            <div class="api-list">
                <div class="api-item active">
                    <div class="api-icon"><img src="${images.whastapp}" alt=""></div>
                    <div class="api-content">
                        <p class="api-title">Chat Whatsapp</p>
                        <div class="api-status active">Activo</div>
                    </div>
                    <div class="api-arrow"><img src="${images.angulo}" alt=""></div>
                </div>
            </div>
        `;
    }
}
