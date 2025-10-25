import { css, html, LitElement, unsafeCSS } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import styles from "./NotificacionAutomatica.css?inline"
@customElement('notificacion-automatica')
export class NotificacionAutomatica extends LitElement {
    static styles = css`${unsafeCSS(styles)}`
    @state() public open = false

    @state() public listChats = []
    render() {
        if (!this.open) return html``;
        return html`
        <div class="modal">
            <div class="modal-content">
                <div>
                    <h2>Selecciona un chat</h2>
                </div>
                <div>
                    <span>Lista de bots</span>
                    <ul>
                        ${this.listChats.map(e=>html`
                            <li>
                                ${e.name}
                            </li>
                        `)}
                    </ul>
                </div>
                <div>
                    <button @click=${()=> (this.open = false)}>Aceptar</button>
                    <button @click=${()=> (this.open = false)}>Cancelar</button>
                </div>
            </div>
        </div>
        `;
    }
}
