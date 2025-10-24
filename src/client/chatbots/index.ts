import { css, html, LitElement, unsafeCSS } from 'lit';
import { customElement, query, state } from 'lit/decorators.js';
import styles from './chatbots.css?inline'
import configBot from './configBot';
import { ModalMakeBot } from './modalMakeBot/modalMakeBot';
import { type configBotProps } from './genericMakeBot';
import './modalConfirm';
import type { ModalConfirm } from './modalConfirm';

export default function chatbots(){
    return html`
        <chatbots-el></chatbots-el>
    `
}

@customElement('chatbots-el')
export class ChatbotsClass extends LitElement {
    static styles = css`${unsafeCSS(styles)}`

    
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

    // ---------------------------------------------------
    // Estados para la creación de un nuevo bot
    // ---------------------------------------------------
    @query('#modal-make-bot')
    modalMakeBotElement!: ModalMakeBot
    @query('#modal-confirm-bot')
    modalConfirmBotElement!: ModalConfirm

    @state()
    private makeBot = false;
    @state()
    private enableButtons = true;
    
    private openTypeBot = '';
    private configBotTitle = 'Hello! Configure tu bot';
    private configureBot: configBotProps = {
        email: true,
        username: true,
        password: true,
        phone: true
    }
    // Método para añadir un nuevo bot
    private ModalAddBotAccept = (bot: string) => {
        const makeBotByWhatsApp = () => {
            this.configBotTitle = 'Vincule su bot de WhatsApp';
            this.openTypeBot = 'WhatsApp';
            this.configureBot = {
                email: false,
                username: false,
                password: false,
                phone: true
            }
            this.makeBot = true;
        }

        const makeBotByMarketPlace = () => {
            this.configBotTitle = 'Vincule su bot de MarketPlace';
            this.openTypeBot = 'MarketPlace';
            this.configureBot = {
                email: true,
                username: false,
                password: true,
                phone: false
            }
            this.makeBot = true;
        }

        const makeBotByInstagram = () => {
            this.configBotTitle = 'Vincule su bot de Instagram';
            this.openTypeBot = 'Instagram';
            this.configureBot = {
                email: false,
                username: true,
                password: true,
                phone: false
            }
            this.makeBot = true;
        }

        const types = {
            "WhatsApp": makeBotByWhatsApp,
            "MarketPlace": makeBotByMarketPlace,
            "Instagram": makeBotByInstagram
        }
        types[bot]?.();
    }

    makeBotAcceptCallback(elements:NodeListOf<HTMLInputElement>){
        const data = Array.from(elements).reduce((acc, input) => {
            acc[input.id] = input.value;
            return acc;
        }, {} as Record<string, string>);
        if (this.openTypeBot == "WhatsApp") {
            this.enableButtons = false;

        }
        this.modalConfirmBotElement.code = "123456";
        this.modalConfirmBotElement.open = true;

    }

    render() {
        if (this.openConfig) return configBot(this.closePanel, this.namePanel);
        if (this.makeBot) return html`
            <modal-confirm id="modal-confirm-bot"></modal-confirm>
            <generic-make-bot-panel 
                .onVincule=${(e) => this.makeBotAcceptCallback(e)} 
                .onCancel=${()=>{this.makeBot = false; this.enableButtons = true;}} 
                .config=${this.configureBot} 
                .title=${this.configBotTitle} 
                .type=${this.openTypeBot},
                .enableButtons=${this.enableButtons}
                ></generic-make-bot-panel>
            
            `
        return html`
            <modal-make-bot id="modal-make-bot" .acceptCallback=${this.ModalAddBotAccept}></modal-make-bot>
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