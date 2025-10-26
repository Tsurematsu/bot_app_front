import { css, html, LitElement, unsafeCSS } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import styles from './modalConfirm.css?inline';

@customElement('modal-confirm')
export class ModalConfirm extends LitElement {
  static styles = css`${unsafeCSS(styles)}`;

  @state()
  public open = false;

  @state()
  public code: string = '';

  @state()
  public imageBase64: string = '';

  private closeModal() {
    this.open = false;
  }

  render() {
    if (!this.open) return html``;
    return html`
      <div class="overlay" @click="${this.closeModal}">
          <div class="modal" @click="${(e: Event) => e.stopPropagation()}">
              <header class="modal-header">
                  <h2>Confirmación requerida</h2>
                  <button class="close-btn" @click="${this.closeModal}">✕</button>
              </header>
              <section class="modal-body">
                  ${this.code.length > 0 ? html`
                    <div @click=${async ()=>{await navigator.clipboard.writeText(this.code);}} class="section">
                      <h3>Ingrese el código en su dispositivo</h3>
                      <p class="code"><strong>${this.code}</strong></p>
                  </div>
                  `:""}
                  ${this.imageBase64.length > 0 ? html`
                    <div class="section">
                      <h3>Resuelva el captcha</h3>
                      <img src="${this.imageBase64}" alt="Captcha" class="captcha" />
                  </div>
                  `:""}
                  ${this.imageBase64.length == 0 && this.code.length == 0 ? html`
                    <div class="section onLoading">
                      <h3>Espere mientras preparamos su bot...</h3>
                      <img src="/public/configuracion-de-la-aplicacion-movil.gif" width="100" alt="">
                    </div>
                  `:""}
              </section>
          </div>
      </div>
    `;
  }
}
