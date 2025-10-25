import { css, html, LitElement, unsafeCSS } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import styles from "./NotificacionAutomatica.css?inline"
@customElement('notificacion-automatica')
export class NotificacionAutomatica extends LitElement {
    static styles = css`${unsafeCSS(styles)}`
    @state()
    public statusModal = false
    render() {
        if (!this.statusModal) return html``;
        return html`
        <div class="modal">
            <div class="modal-content">
                <div>
                    <h2>Crear Nuevo Bot</h2>
                </div>
                <div>
                    <span>Lista de bots</span>
                    <ul>
                        <li>
                            Alcanzaste el limite de bots!
                        </li>
                    </ul>
                </div>
                <div>
                    <button @click=${()=> (this.statusModal = false)}>Cerrar</button>
                </div>
            </div>
        </div>
        `;
    }
}
