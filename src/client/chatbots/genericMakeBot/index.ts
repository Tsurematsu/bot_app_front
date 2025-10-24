import { css, html, LitElement, unsafeCSS} from 'lit';
import { customElement, property, queryAll, state } from 'lit/decorators.js';
import styles from './genericMakeBot.css?inline'


export interface configBotProps {
    email:boolean;
    username:boolean;
    password:boolean;
    phone:boolean;
}

@customElement('generic-make-bot-panel')
export class Index extends LitElement {
    static styles = css`${unsafeCSS(styles)}`;

    @property()
    type:string = "generic";

    @property({ type: String })
    title: string = "Configuración Genérica";

    @property({ type: Object })
    config: configBotProps = {
        email: true,
        username: true,
        password: true,
        phone: true
    };

    @property({ type: Boolean })
    enableButtons: boolean = true;

    @queryAll('input')
    inputs!: NodeListOf<HTMLInputElement>;

    @property()
    onVincule: (x) => void = (_x) => {};

    @property()
    onCancel: () => void = () => {};

    @state()
    private showPassword = false;

    private togglePasswordVisibility() {
        this.showPassword = !this.showPassword;
    }
    render() {
        return html`
            <slot></slot>
          <div class="main-container">
              <div class="form-wrapper">
                  <h1 class="form-title">${this.title}</h1>

                  <form class="form-fields" @submit=${(e: Event) => e.preventDefault()}>
                      ${this.config.email ? html`
                      <!-- Email -->
                      <div class="field-group">
                          <label class="field-label" for="email">
                              Correo electrónico
                          </label>
                          <input id="email" class="input-field" type="email" placeholder="Tu correo electrónico"
                              autocomplete="email" />
                      </div>
                      `:""}

                      ${this.config.username ? html`

                      <!-- Usuario -->
                      <div class="field-group">
                          <label class="field-label" for="username">
                              Usuario
                          </label>
                          <input id="username" class="input-field" type="text" placeholder="Tu nombre de usuario"
                              autocomplete="username" />
                      </div>
                      `:""}

                      ${this.config.password ? html`
                      <!-- Contraseña -->
                      <div class="field-group">
                          <label class="field-label" for="password">
                              Contraseña
                          </label>
                          <div class="password-wrapper">
                              <input id="password" class="input-field" type="${this.showPassword ? 'text' : 'password'}"
                                  placeholder="Tu contraseña" autocomplete="current-password" />
                              <button class="password-toggle" type="button" @click=${this.togglePasswordVisibility}
                                  aria-label="${this.showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}">
                                  <span class="icon">
                                      ${this.showPassword ? 'visibility_off' : 'visibility'}
                                  </span>
                              </button>
                          </div>
                      </div>
                      `:""}

                      ${this.config.phone ? html`
                      <!-- Teléfono -->
                      <div class="field-group">
                          <label class="field-label" for="phone">
                              Número de teléfono
                          </label>
                          <input id="phone" class="input-field" type="tel" placeholder="Tu número de teléfono"
                              autocomplete="tel" />
                      </div>
                      `:""}

                      <!-- Botones -->
                      <div class="button-group">
                          <button @click=${() => {
                            if (this.onVincule) this.onVincule(this.inputs)
                          }} class="button button-primary ${!this.enableButtons ? 'disabled' : ''}" type="submit">
                              Vincular
                          </button>
                          <button @click=${this.onCancel} class="button button-secondary" type="button">
                              Cancelar
                          </button>
                      </div>
                  </form>
              </div>
          </div>
         `;
    }
}
