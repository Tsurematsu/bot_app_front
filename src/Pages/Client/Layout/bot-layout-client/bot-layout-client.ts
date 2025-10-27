import { css, html, LitElement, unsafeCSS } from 'lit';
import { customElement, query, state } from 'lit/decorators.js';
import styles from "./bot-layout-client.css?inline"
import images from '../../../../images';
import "./components/modal-selection-bot";
import type { ModalSeleccionBot } from './components/modal-selection-bot';
import "./layout-panel-create-bot-client/layout-panel-create-bot-client";
import type { LayoutPanelCreateBotClient } from './layout-panel-create-bot-client/layout-panel-create-bot-client';
@customElement('bot-layout-client')
export class BotLayoutClient extends LitElement {
    static styles = css`${unsafeCSS(styles)}`

    @state() parentOpen = true
    
    @query("layout-panel-create-bot-client") layoutPanelCreateBotClient : LayoutPanelCreateBotClient
    private CreateBotSuccess =()=>{
        this.layoutPanelCreateBotClient.open = false
        this.parentOpen = true
    }

    @query('modal-selection-bot') modalSelectionBot : ModalSeleccionBot
    onSelectedModalSelectionBot = (option)=>{
        this.parentOpen = false
        this.modalSelectionBot.open = false
        this.layoutPanelCreateBotClient.typeBot = option
        this.layoutPanelCreateBotClient.open = true
    }

    render() {
        return html`
            <modal-selection-bot .accept=${this.onSelectedModalSelectionBot}></modal-selection-bot>
            <layout-panel-create-bot-client .success=${this.CreateBotSuccess}></layout-panel-create-bot-client>
            ${this.parentOpen?html`
            <div class="chatbots-header">
                <h2>Tus Chatbots</h2>
                <button @click=${()=>this.modalSelectionBot.open = true} class="btn-add-bot">
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
            `:""}
        `;
    }
}
