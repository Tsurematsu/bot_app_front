import { css, html, LitElement, unsafeCSS } from 'lit';
import { customElement } from 'lit/decorators.js';
import styles from './chatbots.css?inline'
export default function chatbots(){
    return html`
        <chatbots-el></chatbots-el>
    `
}
@customElement('chatbots-el')
export class ChatbotsClass extends LitElement {
    static styles = css`${unsafeCSS(styles)}`
    render() {
        return html`
            <h2>Tus Chatbots</h2>
            <div class="api-list">
                <!-- API Item 1 -->
                <div class="api-item active">
                    <div class="api-icon"><img src="/public/whastapp.png" alt=""></div>
                    <div class="api-content">
                        <p class="api-title">WhatsApp Chat</p>
                        <div class="api-status active">Active</div>
                    </div>
                    <div class="api-arrow"><img src="/public/angulo.png" alt=""></div>
                </div>

                <!-- API Item 2 -->
                <div class="api-item inactive">
                    <div class="api-icon"><img src="/public/marketplace.png" alt=""></div>
                    <div class="api-content">
                        <p class="api-title">MarketPlace Chat</p>
                        <div class="api-status inactive">Inactive</div>
                    </div>
                    <div class="api-arrow"><img src="/public/angulo.png" alt=""></div>
                </div>

            </div>
        `;
    }
}
