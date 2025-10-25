import { css, html, LitElement, unsafeCSS, type PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import styles from './configBot.css?inline'
import FETCH from '../../../tools/FETCH';

@customElement('config_bot-el')
export class config_botClass extends LitElement {
    static styles = css`${unsafeCSS(styles)}`
    @property() closePanel = ()=>{}
    @property() titleCard = 'app'
    @property() bot_process = ""
    @property() type=""

    @state()
    private botActive = false

    protected firstUpdated(_changedProperties: PropertyValues): void {
        this.init()
    }

    async init(){
        const resInto = await FETCH.post('/action/Whatsapp/status', {idProceso_bot:this.bot_process})
        this.botActive = resInto.success
    }

    async onActiveBot(){
        const resIntoStatus = await FETCH.post('/action/Whatsapp/status', {idProceso_bot:this.bot_process})
        
        if (!this.botActive && !resIntoStatus.success) {
            const resInto = await FETCH.post('/action/Whatsapp/link', {idProceso_bot:this.bot_process})
            this.botActive = resInto.success
            return
        }
        if (this.botActive && resIntoStatus.success) {
            const getChats = await FETCH.post('/action/Whatsapp/getChats', {idProceso_bot:this.bot_process})
            console.log(getChats);
        }
    }

    render() {
        return html`
            <div class="app-container">  
            <!-- Encabezado -->
            <header class="header">
            <button @click=${this.closePanel} class="back-button"><img width="30" src="/public/flecha-back.png" alt=""></button>
            <h1 class="title" style="text-transform: uppercase;">${this.titleCard}</h1>
            </header>
            <!-- Contenido Principal -->
            <main class="main">
            <div class="card">
                <div class="card-icon">
                    <img width="30" src="/public/restaurar.png" alt="">
                </div>
                <div class="card-text">
                    <p>Notificación automática</p>
                    <p>Notifica a clientes potenciales <br> mediante un contacto privado</p>
                </div>
            </div>

            <!-- Activar / Desactivar -->
            <div @click=${this.onActiveBot} class="card">
                <div class="card-icon"><img width="30" src="/public/restaurar.png" alt=""></div>
                <div class="card-text">
                <p>Activar/Desactivar</p>
                <p>Activa o desactiva el bot.</p>
                </div>
                <label class="switch">
                <input type="checkbox" ?checked=${this.botActive}>
                <span class="slider"></span>
                </label>
            </div>

            <div class="card">
                <div class="card-icon"><img width="30" src="/public/restaurar.png" alt=""></div>
                <div class="card-text">
                <p>Agendamiento automático</p>
                <p>Activa o desactiva <br> el agendamiento automático.</p>
                </div>
                <label class="switch">
                <input type="checkbox">
                <span class="slider"></span>
                </label>
            </div>
            
            <!-- Vincular -->
            <!-- <a class="card" href="#">
                <div class="card-icon"><img width="25" src="/public/enlaces.png" alt=""></div>
                <p class="card-label">Volver a vincular</p>
                <img width="30" src="/public/flecha-next.png" alt="">
            </a> -->
            <!-- Respuestas -->
            
            

            </main>
        </div>
        `;
    }
}
function unfaceCSS(styles: string): number | import("lit").CSSResultGroup {
    throw new Error('Function not implemented.');
}

