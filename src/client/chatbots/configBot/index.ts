import { css, html, LitElement, unsafeCSS, type PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import styles from './configBot.css?inline'

@customElement('config_bot-el')
export class config_botClass extends LitElement {
    static styles = css`${unsafeCSS(styles)}`
    @property() closePanel = ()=>{}
    @property() titleCard = 'app'
    @property() bot_process = ""
    @property() type=""

    protected firstUpdated(_changedProperties: PropertyValues): void {
        console.log("Hello", this.bot_process);
        
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
            <div class="card">
                <div class="card-icon"><img width="30" src="/public/restaurar.png" alt=""></div>
                <div class="card-text">
                <p>Activar/Desactivar</p>
                <p>Activa o desactiva el bot.</p>
                </div>
                <label class="switch">
                <input type="checkbox">
                <span class="slider"></span>
                </label>
            </div>

            <div class="card">
                <div class="card-icon"><img width="30" src="/public/restaurar.png" alt=""></div>
                <div class="card-text">
                <p>Agendamiento automático</p>
                <p>Activa o desactiva el agendamiento automático.</p>
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

