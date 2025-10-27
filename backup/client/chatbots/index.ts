import { css, html, LitElement, unsafeCSS, type PropertyValues } from 'lit';
import { customElement, query, state } from 'lit/decorators.js';
import styles from './chatbots.css?inline'
import { ModalMakeBot } from './modalMakeBot/modalMakeBot.ts';
import { type configBotProps } from './genericMakeBot/index.ts';
import './modalConfirm/index.ts';
import type { ModalConfirm } from './modalConfirm/index.ts';
import "./configBot/index.ts"
import "./EnDesarrolloComponent/index.ts"
import FETCH from '../../tools/FETCH';
import type { EnDesarrolloComponent } from './EnDesarrolloComponent/index.ts';

export default function chatbots(){
    return html`
        <chatbots-el></chatbots-el>
    `
}

@customElement('chatbots-el')
export class ChatbotsClass extends LitElement {
    static styles = css`${unsafeCSS(styles)}`

    

    @state()
    private listChatbot = [];
    getChatbotList = async () => {
        const res = await FETCH.get('/bots/list');
        if (!res.success) return console.log("Error fetching chatbot list");
        
        this.listChatbot = res.data;
    }
    images = {
        "WhatsappAi": html`<img src="/public/whastapp.png" alt="">`,
        "MarketPlaceAi": html`<img src="/public/marketplace.png" alt="">`,
        "InstagramAi": html`<img src="/public/instagram.png" alt="">`
    }

    @state()
    private openDevPanel = false
    protected firstUpdated(_changedProperties: PropertyValues): void {
        this.getChatbotList();
    }
    
    @state() 
    private openConfig = false;
    private namePanel = '';
    private bot_process = '';
    private bot_type = ''
    private openPanel = (name, bot_process, bot_type) => {
        this.namePanel = name; 
        this.openConfig = true;
        this.bot_process = bot_process;
        this.bot_type = bot_type;
    }
    private closePanel = () => {
        this.openConfig = false;
    }

    // ---------------------------------------------------
    // Estados para la creación de un nuevo bot
    // ---------------------------------------------------
    @query('#modal-make-bot')
    modalSelectOptionsBot!: ModalMakeBot

    @query('#modal-confirm-bot')
    modalMessageVinculeBot!: ModalConfirm

    @state()
    private makeBotPanel = false;
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
    private ModalSelectBotAccept = (bot: string) => {
        const makeBotByWhatsApp = () => {
            this.configBotTitle = 'Vincule su bot de WhatsApp';
            this.openTypeBot = 'WhatsApp';
            this.configureBot = {
                email: false,
                username: false,
                password: false,
                phone: true
            }
            this.makeBotPanel = true;
        }

        const makeBotByMarketPlace = () => {
            this.openDevPanel = true
            
            // this.configBotTitle = 'Vincule su bot de MarketPlace';
            // this.openTypeBot = 'MarketPlace';
            // this.configureBot = {
            //     email: true,
            //     username: false,
            //     password: true,
            //     phone: false
            // }
            // this.makeBotPanel = true;
        }

        const makeBotByInstagram = () => {
            this.openDevPanel = true
            
            // this.configBotTitle = 'Vincule su bot de Instagram';
            // this.openTypeBot = 'Instagram';
            // this.configureBot = {
            //     email: false,
            //     username: true,
            //     password: true,
            //     phone: false
            // }
            // this.makeBotPanel = true;
        }

        const types = {
            "WhatsApp": makeBotByWhatsApp,
            "MarketPlace": makeBotByMarketPlace,
            "Instagram": makeBotByInstagram
        }
        types[bot]?.();
    }
    requestStatusInterval = null;
    
    async makeBotAcceptCallback(elements:NodeListOf<HTMLInputElement>){
        const data = Array.from(elements).reduce((acc, input) => {
            acc[input.id] = input.value;
            return acc;
        }, {} as Record<string, string>);
        if (this.openTypeBot == "WhatsApp") {
            this.enableButtons = false;
            this.modalMessageVinculeBot.open = true;
            if (!data['phone']) return;
            const resInto = await FETCH.post('/action/Whatsapp/make', {phone: data['phone']})
            if (!resInto.success) return;
            const idProceso_bot = resInto.idProceso_bot;
            this.requestStatusInterval = setInterval(async ()=>{
                // estos son los estados que retorna el bot
                //{ 
                //     log: this.Log,
                //     app: this.App,
                //     login: this.Login,
                //     code: this.Code,
                //     listen: this.Listen,
                //     isRunning: this.child !== null
                // }
                // type AppStatus = "off" | "loading" | "on"
                const res = await FETCH.post('/action/Whatsapp/status', {idProceso_bot});
                const code = res.status.code;
                const app = res.status.app;
                if (!code) return;
                this.modalMessageVinculeBot.code = code;
                if (app == 'on') {
                    this.modalMessageVinculeBot.open = false;
                    this.makeBotPanel = false;
                    this.enableButtons = true;
                    this.getChatbotList();
                    if (this.requestStatusInterval) {
                        clearInterval(this.requestStatusInterval);
                        this.requestStatusInterval = null;
                    }
                }
            }, 1000);
        }

    }

    onCancelMakeBot = () => {
        this.makeBotPanel = false;
        this.enableButtons = true;
        if (this.requestStatusInterval) {
            clearInterval(this.requestStatusInterval);
            this.requestStatusInterval = null;
        }
    }

    render() {
        if (this.openDevPanel) return html`<en-desarrollo id="en-desarrollo" .backClicked=${()=>{ this.openDevPanel = false }}></en-desarrollo>`
        if (this.openConfig) return html`<config_bot-el 
            .closePanel=${this.closePanel} 
            .bot_process=${this.bot_process}
            .type=${this.bot_type}
            titleCard=${this.namePanel}
        ></config_bot-el>`
        if (this.makeBotPanel) return html`
            <modal-confirm id="modal-confirm-bot"></modal-confirm>
            <generic-make-bot-panel 
                .onVincule=${(e) => this.makeBotAcceptCallback(e)} 
                .onCancel=${this.onCancelMakeBot} 
                .config=${this.configureBot} 
                .title=${this.configBotTitle} 
                .type=${this.openTypeBot},
                .enableButtons=${this.enableButtons}
                ></generic-make-bot-panel>
            
            `
        return html`
            <modal-make-bot id="modal-make-bot" .acceptCallback=${this.ModalSelectBotAccept}></modal-make-bot>
            <div class="chatbots-header">
                <h2>Tus Chatbots</h2>
                <button class="btn-add-bot" @click=${()=>{
                    const listTypes = this.listChatbot.map((e)=>e["bot_type"])
                    if (listTypes.includes('WhatsappAi')) this.modalSelectOptionsBot.WhatsappOption = false;
                    this.modalSelectOptionsBot.statusModal = true
                    }}>
                    <span class="btn-icon">+</span>
                    <span class="btn-text">Añadir Bot</span>
                </button>
            </div>

            <div class="api-list">
                ${this.listChatbot.map(bot =>html`
                <div @click=${()=>this.openPanel(bot.bot_type, bot.bot_process, bot.bot_type)} class="api-item ${bot.bot_status=="active" ? 'active' :
                    'inactive'}">
                    <div class="api-icon">${this.images.WhatsappAi}</div>
                    <div class="api-content">
                        <p class="api-title">${bot.bot_type} Chat</p>
                        <div class="api-status ${bot.bot_status=="active" ? 'active' : 'inactive'}">${bot.bot_status}</div>
                    </div>
                    <div class="api-arrow"><img src="/public/angulo.png" alt=""></div>
                </div>
                `)}
            </div>
        `;
    }
}

