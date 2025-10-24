import { css, html, LitElement, unsafeCSS } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import styles from './modalMakeBot.css?inline'
export default function modalMakeBot() {
  return html`
        <modal-make-bot></modal-make-bot>
    `
}

@customElement('modal-make-bot')
export class ModalMakeBot extends LitElement {
  static styles = css`${unsafeCSS(styles)}`;
  @property()
  acceptCallback: (e: string) => void = (_x) => { };

  @property()
  cancelCallback: () => void = () => { }

  @state()
  public statusModal: boolean = false;

  private selectedBot: string = '';

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
              <li @click=${() => this.selectedBot = 'WhatsApp'}>
                WhatsApp
              </li>

              <li @click=${() => this.selectedBot = 'MarketPlace'}>
                MarketPlace
              </li>

              <li @click=${() => this.selectedBot = 'Instagram'}>
                Instagram
              </li>
            </ul>
          </div>
            <div>
              <button class="close-btn" @click=${() => { this.cancelCallback(); this.statusModal = false; }}>Cancelar</button>
            <button class="close-btn" @click=${() => { this.acceptCallback(this.selectedBot); this.statusModal = false; }}>Aceptar</button>
            </div>
          </div>
      </div>
    `;
  }
}
function unsafeCS(styles: string): number | import("lit").CSSResultGroup {
  throw new Error('Function not implemented.');
}

