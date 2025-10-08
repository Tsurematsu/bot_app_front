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
            <button @click=${this.closePanel} class="back-button">
                <svg fill="currentColor" height="24" viewBox="0 0 256 256" width="24" xmlns="http://www.w3.org/2000/svg">
                <path d="M224,128a8,8,0,0,1-8,8H59.31l58.35,58.34a8,8,0,0,1-11.32,11.32l-72-72a8,8,0,0,1,0-11.32l72-72a8,8,0,0,1,11.32,11.32L59.31,120H216A8,8,0,0,1,224,128Z"></path>
                </svg>
            </button>
            <h1 class="title" style="text-transform: uppercase;">${this.titleCard}</h1>
            </header>

            <!-- Contenido Principal -->
            <main class="main">

                <!-- Activar / Desactivar -->
                <div class="card">
                    <div class="card-icon">
                        <svg class="text-white" fill="currentColor" height="24" viewBox="0 0 256 256" width="24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M176,56H80a72,72,0,0,0,0,144h96a72,72,0,0,0,0-144Zm0,128H80A56,56,0,0,1,80,72h96a56,56,0,0,1,0,112ZM80,88a40,40,0,1,0,40,40A40,40,0,0,0,80,88Zm0,64a24,24,0,1,1,24-24A24,24,0,0,1,80,152Z"></path>
                        </svg>
                    </div>
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
                    <div class="card-icon">
                    <svg fill="currentColor" height="24" viewBox="0 0 256 256" width="24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M137.54,186.36a8,8,0,0,1,0,11.31l-9.94,10A56,56,0,0,1,48.38,128.4L72.5,104.28A56,56,0,0,1,149.31,102a8,8,0,1,1-10.64,12,40,40,0,0,0-54.85,1.63L59.7,139.72a40,40,0,0,0,56.58,56.58l9.94-9.94A8,8,0,0,1,137.54,186.36Z"></path>
                    </svg>
                    </div>
                    <p class="card-label">Vincular</p>
                    <svg class="arrow" fill="currentColor" height="24" viewBox="0 0 256 256" width="24">
                    <path d="M221.66,133.66l-72,72a8,8,0,0,1-11.32-11.32L196.69,136H40a8,8,0,0,1,0-16H196.69L138.34,61.66a8,8,0,0,1,11.32-11.32l72,72A8,8,0,0,1,221.66,133.66Z"/>
                    </svg>
                </a>

                <!-- Respuestas -->
                <a class="card" href="#">
                    <div class="card-icon">
                    <svg fill="currentColor" height="24" viewBox="0 0 256 256" width="24">
                        <path d="M140,128a12,12,0,1,1-12-12A12,12,0,0,1,140,128ZM84,116a12,12,0,1,0,12,12A12,12,0,0,0,84,116Zm88,0a12,12,0,1,0,12,12A12,12,0,0,0,172,116Z"/>
                    </svg>
                    </div>
                    <p class="card-label">Respuestas</p>
                    <svg class="arrow" fill="currentColor" height="24" viewBox="0 0 256 256" width="24">
                    <path d="M221.66,133.66l-72,72a8,8,0,0,1-11.32-11.32L196.69,136H40a8,8,0,0,1,0-16H196.69L138.34,61.66a8,8,0,0,1,11.32-11.32l72,72A8,8,0,0,1,221.66,133.66Z"/>
                    </svg>
                </a>

                <!-- Opciones Avanzadas -->
                <a class="card" href="#">
                    <div class="card-icon">
                    <svg fill="currentColor" height="24" viewBox="0 0 256 256" width="24">
                        <path d="M128,80a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Z"/>
                    </svg>
                    </div>
                    <p class="card-label">Opciones Avanzadas</p>
                    <svg class="arrow" fill="currentColor" height="24" viewBox="0 0 256 256" width="24">
                    <path d="M221.66,133.66l-72,72a8,8,0,0,1-11.32-11.32L196.69,136H40a8,8,0,0,1,0-16H196.69L138.34,61.66a8,8,0,0,1,11.32-11.32l72,72A8,8,0,0,1,221.66,133.66Z"/>
                    </svg>
                </a>

            </main>
        </div>
        `;
    }
}
function unfaceCSS(styles: string): number | import("lit").CSSResultGroup {
    throw new Error('Function not implemented.');
}

