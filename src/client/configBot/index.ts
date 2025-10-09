import { css, html, LitElement, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import styles from './configBot.css?inline'
export default function configBot(closePanel, titleCard){
    return html`
        <config_bot-el .closePanel=${closePanel} titleCard=${titleCard}></config_bot-el>
    `
}
@customElement('config_bot-el')
export class config_botClass extends LitElement {
    static styles = css`${unsafeCSS(styles)}`
    @property() closePanel = ()=>{}
    @property() titleCard = 'app'
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
                <!-- Activar / Desactivar -->
                <div class="card">
                    <div class="card-icon"><img width="30" src="/public/restaurar.png" alt=""></div>
                    <div class="card-text">
                        <p>Activar/Desactivar</p>
                        <p>Activa o desactiva tus APIs</p>
                    </div>
                    <label class="switch">
                        <input type="checkbox">
                        <span class="slider"></span>
                    </label>
                </div>
                <!-- Vincular -->
                <a class="card" href="#">
                    <div class="card-icon"><img width="25" src="/public/enlaces.png" alt=""></div>
                    <p class="card-label">Vincular</p>
                    <img width="30" src="/public/flecha-next.png" alt="">
                </a>
                <!-- Respuestas -->
                <a class="card" href="#">
                    <div class="card-icon"><img width="40" src="/public/conversaciones.png" alt=""></div>
                    <p class="card-label">Respuestas</p>
                    <img width="30" src="/public/flecha-next.png" alt="">
                </a>
                <!-- Opciones Avanzadas -->
                <a class="card" href="#">
                    <div class="card-icon"> <img width="30" src="/public/pro.png" alt=""></div>
                    <p class="card-label">Opciones Avanzadas</p>
                    <img width="30" src="/public/flecha-next.png" alt="">
                </a>

            </main>
        </div>
        `;
    }
}
function unfaceCSS(styles: string): number | import("lit").CSSResultGroup {
    throw new Error('Function not implemented.');
}

