import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

export default function modal(){
    return html`
        <modal-el></modal-el>
    `
}

@customElement('modal-el')
export class Modal extends LitElement {
    open;
    logs;

    constructor() {
        super();
        this.open = false;
        this.logs = [
            '10:15:32 [ERROR] Fallo en conexión con base de datos',
            '10:17:08 [WARN] Intento de acceso no autorizado',
            '10:19:45 [INFO] Servicio reiniciado correctamente',
        ];
    }

    static styles = css`
    :host {
      position: fixed;
      inset: 0;
      display: none;
      z-index: 9999;
    }

    :host([open]) {
      display: block;
    }

    .overlay {
      position: absolute;
      inset: 0;
      background-color: rgba(0, 0, 0, 0.7);
    }

    .modal {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: #1e293b;
      color: #f1f5f9;
      padding: 1.5rem;
      border-radius: 0.5rem;
      width: 90%;
      max-width: 500px;
      max-height: 80%;
      overflow-y: auto;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.4);
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
    }

    .header h2 {
      font-size: 1.25rem;
      font-weight: 600;
    }

    .close-btn {
      background: none;
      border: none;
      color: #f1f5f9;
      font-size: 1.5rem;
      cursor: pointer;
    }

    ul {
      list-style: none;
      padding: 0;
    }

    li {
      background-color: #334155;
      margin-bottom: 0.5rem;
      padding: 0.5rem 1rem;
      border-radius: 0.375rem;
      font-family: monospace;
      font-size: 0.875rem;
      border-left: 3px solid #1173d4;
    }

    li.error { border-color: #e11d48; }
    li.warn { border-color: #facc15; }
    li.info { border-color: #22d3ee; }
  `;

    closeModal() {
        this.open = false;
        this.dispatchEvent(new CustomEvent('modal-close'));
    }

    getLogType(log) {
        if (log.includes('[ERROR]')) return 'error';
        if (log.includes('[WARN]')) return 'warn';
        if (log.includes('[INFO]')) return 'info';
        return '';
    }

    render() {
        if (!this.open) return html``;

        return html`
        <div class="overlay" @click=${this.closeModal}></div>
        <div class="modal" @click=${e => e.stopPropagation()}>
            <div class="header">
            <h2>Logs del sistema</h2>
            <button class="close-btn" @click=${this.closeModal}>&times;</button>
            </div>
            <ul>
            ${this.logs.map(
                log => html`<li class=${this.getLogType(log)}>${log}</li>`
            )}
            </ul>
        </div>
    `;
    }
}
