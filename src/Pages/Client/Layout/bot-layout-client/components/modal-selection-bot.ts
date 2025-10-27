import { css, html, LitElement, unsafeCSS, type CSSResultGroup } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import styles from "./modal-selection-bot.css?inline"

@customElement('modal-selection-bot')
export class ModalSeleccionBot extends LitElement {
    static styles = css`${unsafeCSS(styles)}`
    @state() public open = false
    @state() public options = {
        Whatsapp: true,
        Marketplace: true,
        Instagram: true,
    }
    @property() accept = (_x)=>{}
    render() {
        if (!this.open) return ""
        return html`    
        <div class="modal">
            <div class="modal-content">
                <div>
                    <h2>Crear Nuevo Bot</h2>
                </div>
                <div>
                    <span>Lista de bots</span>
                    <ul>
                        ${this.options.Whatsapp ? html`
                        <li @click=${()=> this.accept('WhatsApp')}>
                            WhatsApp
                        </li>
                        `: ""}

                        ${this.options.Marketplace ? html`
                        <li @click=${()=> this.accept('MarketPlace')}>
                            MarketPlace
                        </li>
                        `: ""}

                        ${this.options.Instagram ? html`
                        <li @click=${()=> this.accept('Instagram')}>
                            Instagram
                        </li>
                        `: ""}

                        ${!this.options.Whatsapp && !this.options.Instagram && !this.options.Marketplace ? html`
                        <li @click=${()=> (this.open = false)}>
                            Alcanzaste el limite de bots!
                        </li>
                        `: ""}

                    </ul>
                </div>
                <div>
                    <button @click=${()=> (this.open = false)}>Cerrar</button>
                </div>
            </div>
        </div>
        `;
    }
}
