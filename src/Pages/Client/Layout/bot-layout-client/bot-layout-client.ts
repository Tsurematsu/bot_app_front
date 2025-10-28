import { css, html, LitElement, unsafeCSS } from 'lit';
import { customElement, query, state } from 'lit/decorators.js';
import styles from "./bot-layout-client.css?inline"
import images from '../../../../images';
import "./components/modal-selection-bot";
import type { ModalSeleccionBot } from './components/modal-selection-bot';
import "./layout-panel-create-bot-client/layout-panel-create-bot-client";
import type { LayoutPanelCreateBotClient } from './layout-panel-create-bot-client/layout-panel-create-bot-client';
import script, { type pointBot } from './script';
@customElement('bot-layout-client')
export class BotLayoutClient extends LitElement {
    static styles = css`${unsafeCSS(styles)}`

    @state() parentOpen = true

    @query("layout-panel-create-bot-client") layoutPanelCreateBotClient: LayoutPanelCreateBotClient
    private CreateBotSuccess = () => {
        this.layoutPanelCreateBotClient.open = false
        this.parentOpen = true
    }

    @query('modal-selection-bot') modalSelectionBot: ModalSeleccionBot
    onSelectedModalSelectionBot = (option) => {
        this.parentOpen = false
        this.modalSelectionBot.open = false
        this.layoutPanelCreateBotClient.typeBot = option
        this.layoutPanelCreateBotClient.open = true
    }

    @state()
    private dinamoList: pointBot[] = []
    private staticList: pointBot[] = []

    private initialized = false;
    connectedCallback() {
        super.connectedCallback();
        if (!this.initialized) {
            this.initialized = true;
            script.getBots(
                (e) => this.dinamoList = e,
                (e) => this.staticList = e
            )
        }
    }


    private cardsData = {
        "Whatsapp": {
            title: "Chat Whatsapp",
            image: images.whastapp,
        },
        "MarketPlace": {
            title: "Chat MarketPlace",
            image: "",
        },
        "Instagram": {
            title: "Chat Instagram",
            image: "",
        },
    }

    private selectItem(data : pointBot){
        console.log(data);
        
    }

    render() {
        const listBots: pointBot[] = this.dinamoList.length == 0 ? this.staticList : this.dinamoList
        return html`
            <modal-selection-bot .accept=${this.onSelectedModalSelectionBot}></modal-selection-bot>
            <layout-panel-create-bot-client .success=${this.CreateBotSuccess}></layout-panel-create-bot-client>
            ${this.parentOpen ? html`
            <div class="chatbots-header">
                <h2>Tus Chatbots</h2>
                <button @click=${() => this.modalSelectionBot.open = true} class="btn-add-bot">
                    <span class="btn-icon">+</span>
                    <span class="btn-text">Añadir Bot</span>
                </button>
            </div>
            <div class="api-list">
                ${listBots.map((e) => {
                const getType = Object.entries(e.bot_type).find(([keyed, v])=>v)[0]
                return html`
                    <div @click=${()=>this.selectItem(e)}  class="api-item active">
                        <div class="api-icon"><img src="${this.cardsData[getType].image}" alt=""></div>
                        <div class="api-content">
                            <p class="api-title">${this.cardsData[getType].title}</p>
                            <div class="api-status active">Activo</div>
                        </div>
                        <div class="api-arrow"><img src="${images.angulo}" alt=""></div>
                    </div>    
                `})}
            </div>
            `: ""}
        `;
    }
}
