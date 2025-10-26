import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

@customElement('en-desarrollo')
export class EnDesarrolloComponent extends LitElement {
  @state() public phoneNumber = '123456789';
  @state() public title = 'Estamos desarrollando esta área';
  @state() public message = 'Si tiene algún problema, por favor contáctenos al';
  @state() public buttonText = 'Volver';
  @property() backClicked = ()=>{}

  static styles = css`
    :host {
      display: block;
      font-family: 'Inter', sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    .container {
      position: relative;
      display: flex;
      height: 50vh;
      width: 100%;
      flex-direction: column;
      padding: 1rem;
      background-color: #101622;
    }

    .content-wrapper {
      display: flex;
      flex: 1;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }

    .content {
      display: flex;
      max-width: 28rem;
      flex-direction: column;
      align-items: center;
      gap: 1.5rem;
      text-align: center;
    }

    .icon-container {
      display: flex;
      height: 4rem;
      width: 4rem;
      align-items: center;
      justify-content: center;
      border-radius: 9999px;
      background-color: rgba(17, 82, 212, 0.2);
      color: #1152d4;
    }

    .icon {
      font-size: 2.25rem;
      font-family: 'Material Symbols Outlined';
      font-weight: normal;
      font-style: normal;
      line-height: 1;
      letter-spacing: normal;
      text-transform: none;
      display: inline-block;
      white-space: nowrap;
      word-wrap: normal;
      direction: ltr;
    }

    .text-wrapper {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.5rem;
    }

    .title {
      font-size: 1.25rem;
      font-weight: 700;
      line-height: 1.25;
      letter-spacing: -0.025em;
      color: white;
    }

    .description {
      font-size: 1rem;
      font-weight: 400;
      line-height: 1.5;
      color: #94a3b8;
    }

    .phone-link {
      font-weight: 500;
      color: #1152d4;
      text-decoration: none;
    }

    .phone-link:hover {
      text-decoration: underline;
    }

    .footer {
      padding-bottom: 1rem;
    }

    .button {
      width: 100%;
      padding: 0.75rem;
      font-size: 1rem;
      font-weight: 700;
      color: white;
      background-color: #1152d4;
      border: none;
      border-radius: 0.5rem;
      cursor: pointer;
      transition: background-color 0.2s;
    }

    .button:hover {
      background-color: rgba(17, 82, 212, 0.9);
    }

    .button:active {
      background-color: rgba(17, 82, 212, 0.8);
    }

    @media (max-width: 640px) {
      .container {
        padding: 0.75rem;
      }
    }
  `;


  render() {
    return html`
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap" rel="stylesheet">
      <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet">
      
      <div class="container">
        <div class="content-wrapper">
          <div class="content">
            <div class="icon-container">
              <span class="icon">construction</span>
            </div>
            <div class="text-wrapper">
              <h1 class="title">${this.title}</h1>
              <p class="description">
                ${this.message} 
                <a class="phone-link" href="tel:${this.phoneNumber}">
                  ${this.phoneNumber}
                </a>.
              </p>
            </div>
          </div>
        </div>
        <div class="footer">
          <button class="button" @click=${this.backClicked}>
            ${this.buttonText}
          </button>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'en-desarrollo': EnDesarrolloComponent;
  }
}