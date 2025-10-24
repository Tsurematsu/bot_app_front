import { css, html, LitElement, unsafeCSS } from 'lit';
import { customElement, query, state } from 'lit/decorators.js';
import styles from './chatbots.css?inline'
import configBot from './configBot';
import modalMakeBot, { ModalMakeBot } from './modalMakeBot/modalMakeBot';

export default function chatbots(){
    return html`
        <chatbots-el></chatbots-el>
    `
}

@customElement('chatbots-el')
export class ChatbotsClass extends LitElement {
    static styles = css`${unsafeCSS(styles)}`

    @query('#modal-make-bot')
    modalMakeBotElement!: ModalMakeBot

    @state() 
    private openConfig = false;
    
    private namePanel = '';
    
    private openPanel = (name) => {
        this.namePanel = name; 
        this.openConfig = true;
    }
    
    private closePanel = () => {
        this.openConfig = false;
    }

    // Método para añadir un nuevo bot
    private AddBotAccept = (e: string) => {
        console.log('Añadir nuevo bot');
        console.log('Bot seleccionado:', e);
    }

    private AddBotCancel = () => {
        console.log('Cancelado añadir bot');
    }

    render() {
        if (this.openConfig) return configBot(this.closePanel, this.namePanel);
        
        return html`
            <modal-make-bot id="modal-make-bot" .acceptCallback=${this.AddBotAccept} .cancelCallback=${this.AddBotCancel}></modal-make-bot>
            <div class="chatbots-header">
                <h2>Tus Chatbots</h2>
                <button class="btn-add-bot" @click=${()=>this.modalMakeBotElement.statusModal = true}>
                    <span class="btn-icon">+</span>
                    <span class="btn-text">Añadir Bot</span>
                </button>
            </div>

            <div class="api-list">
                <!-- API Item 1 -->
                <div @click=${()=>this.openPanel("WhatsApp")} class="api-item active">
                    <div class="api-icon"><img src="/public/whastapp.png" alt=""></div>
                    <div class="api-content">
                        <p class="api-title">WhatsApp Chat</p>
                        <div class="api-status active">Active</div>
                    </div>
                    <div class="api-arrow"><img src="/public/angulo.png" alt=""></div>
                </div>

                <!-- API Item 2 -->
                <div @click=${()=>this.openPanel("marktplace")} class="api-item inactive">
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