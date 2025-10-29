import { css, html, LitElement, unsafeCSS, type PropertyValues } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import styles from './configBot.css?inline'
import "./NotificacionAutomatica"
import type { NotificacionAutomatica } from './NotificacionAutomatica';
import Fetch from '../../../../../Helpers/herlperFetch';
import images from '../../../../../images';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import "./modalProccessBot/modalProcessBot";
import type { ModalProcessBot } from './modalProccessBot/modalProcessBot';
import type { point_bot_WhatsApp_status } from '../../../../../server/point.whatsapp';
@customElement('config_bot-el')
export class config_botClass extends LitElement {
    static styles = css`${unsafeCSS(styles)}`
    @property() closePanel = ()=>{}
    @property() titleCard = 'app'
    @property() type=""
    
    @query('notificacion-automatica') private notificacionAutomatica:NotificacionAutomatica;
    @query('modal-process-bot') modalProcessBot : ModalProcessBot
    @state() private botActive = false
    @state() public bot_process = ""
    @state() public open = false;

    iniI = false
    async init(){
        if (this.iniI) return
        this.iniI = true
        const resInto = await Fetch.post('/bot/WhatsApp/status', {bot_process:this.bot_process})
        this.botActive = resInto.success
    }

    enableActive = true
    async onActiveBot(){
        if (!this.enableActive) return
        this.enableActive = false
        if (this.botActive) {
            this.modalProcessBot.title = "Desactivando sistema"
            this.modalProcessBot.message = "Estamos desactivando el chat..."
            this.modalProcessBot.image = images.hourglass
            this.modalProcessBot.open = true
            console.log("disable"); 
            const res =  await Fetch.post('/bot/WhatsApp/kill', {bot_process: this.bot_process})
            this.botActive = false
            await new Promise(r=>setTimeout(r, 1000))
            console.log(res);
        }else{
            this.modalProcessBot.title = "Activando sistema"
            this.modalProcessBot.message = "Estamos preparando su chatbot..."
            this.modalProcessBot.image = images.repairTools
            this.modalProcessBot.open = true
            console.log("enable"); 
            const res =  await Fetch.post('/bot/WhatsApp/link', {bot_process: this.bot_process})
            const errorMessage = async ()=>{
                this.modalProcessBot.title = "Error"
                this.modalProcessBot.message = "Hubo un error interno, le notificaremos al desarrollador ..."
                this.modalProcessBot.image = images.warning
                this.modalProcessBot.open = true
                await new Promise(r=>setTimeout(r, 8000))
            }
            if (!res.success) await errorMessage()
            let statusRunning = false;
            await new Promise((r)=>{
                const codeInterval = setInterval(async () => {
                    const resStatus : point_bot_WhatsApp_status = await Fetch.post('/bot/WhatsApp/status', {bot_process: this.bot_process});
                    if (!resStatus.success) {
                        await errorMessage()
                        this.modalProcessBot.open = false
                        this.botActive = false
                        clearInterval(codeInterval)
                        r("")
                        return;
                    }
                    
                    if (resStatus.result.listen == "running") {
                        statusRunning = true
                        this.modalProcessBot.message = "Listo!! su chatbot esta en linea!!"
                        this.modalProcessBot.image = images.party
                        this.botActive = true
                        await new Promise(r=>setTimeout(r, 2000))
                        this.modalProcessBot.open = false
                        clearInterval(codeInterval)
                        r("")
                    }else if (resStatus.result.listen == "waiting" && !statusRunning) {
                        await new Promise(r=>setTimeout(r, 2000))
                        this.modalProcessBot.message = "Ya casi!!, estamos cargando las configuraciones..."
                        //TODO : Reparar bug (flasheo de imagen)
                        // this.modalProcessBot.image = images.settingsGif
                    }
                }, 500);
            })
        }
        this.enableActive = true
        this.modalProcessBot.open = false
    }

    render() {
        if (this.open) this.init()
        if (!this.open) this.iniI = false
        if (!this.open) return ""
        return html`
            <modal-process-bot></modal-process-bot>
            <notificacion-automatica></notificacion-automatica>
            <div class="app-container">  
            <!-- Encabezado -->
            <header class="header">
                <button @click=${this.closePanel} class="back-button"><img width="30" src="${images.flechaBack}" alt=""></button>
                <h1 class="title" style="text-transform: uppercase;">${this.titleCard}</h1>
            </header>
            <!-- Contenido Principal -->
            <main class="main">
            <div @click=${async ()=>{
                this.notificacionAutomatica.open = true
                // const getChats = await Fetch.post('/action/Whatsapp/getChats', {idProceso_bot:this.bot_process})
                // const elements = Object.values(getChats.chats).filter(e=>e["fijado"]=true)
                // const range = elements.slice(0, 5)
                // this.notificacionAutomatica.listChats = range 
                // console.log(getChats);
            }} class="card">
                <div class="card-icon">
                    <img width="30" src="${images.notificacion}" alt="">
                </div>
                <div class="card-text">
                    <p>Notificación automática</p>
                    <p>Notifica a clientes potenciales <br> mediante un contacto privado</p>
                </div>
            </div>

            <!-- Activar / Desactivar -->
            <div @click=${this.onActiveBot} class="card">
                <div class="card-icon">${unsafeHTML(images.svg.bot)}</div>
                <div class="card-text">
                <p>Activar/Desactivar</p>
                <p>Activa o desactiva el bot.</p>
                </div>
                <label class="switch">
                <input @click=${(e : Event)=>{
                    const checkButton = e.target as HTMLInputElement
                    checkButton.checked = this.botActive
                    setTimeout(() => {checkButton.checked = this.botActive}, 100);
                }} type="checkbox" ?checked=${this.botActive}>
                <span class="slider"></span>
                </label>
            </div>

            <div class="card">
                <div class="card-icon"><img width="30" src="${images.calendario}" alt=""></div>
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
