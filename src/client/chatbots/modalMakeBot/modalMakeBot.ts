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
  
  @state()
  public statusModal: boolean = false;


  private accept(seleccionado: string) {
    this.acceptCallback(seleccionado);
    this.statusModal = false;
  }

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
                <li @click=${() => this.accept('WhatsApp')}>
                  WhatsApp
                </li>

                <li @click=${() => this.accept('MarketPlace')}>
                  MarketPlace
                </li>

                <li @click=${() => this.accept('Instagram')}>
                  Instagram
                </li>
              </ul>
            </div>
            <div>
            </div>
          </div>
      </div>
    `;
  }
}
function unsafeCS(styles: string): number | import("lit").CSSResultGroup {
  throw new Error('Function not implemented.');
}

