import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';

@customElement('modal-selection-bot')
export class ModalSeleccionBot extends LitElement {
    @state() public open = false
    @state() public options = {
        Whatsapp: true,
        Marketplace: true,
        Instagram: true,
    }
    render() {
        if (!this.open) return ""
        return html`
            <button class="btn-add-bot">
                <span class="btn-icon">+</span>
                <span class="btn-text">Añadir Bot</span>
            </button>
        `;
    }
}
