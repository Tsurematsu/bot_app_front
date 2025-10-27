import { LitElement, css, html, unsafeCSS, type PropertyValues } from 'lit';
import { customElement, property, query, queryAll, state } from 'lit/decorators.js';
import styles from "./layout-panel-create-bot-client.css?inline"
import "./modal-auth-device/modal-auth-device";
import type { ModalAuthDevice } from './modal-auth-device/modal-auth-device';
import script from './script';
@customElement('layout-panel-create-bot-client')
export class LayoutPanelCreateBotClient extends LitElement {
    static styles = css`${unsafeCSS(styles)}`
    
    @state() 
    private config = {
        email : false,
        username : false,
        password : false, 
        phone: false
    }

    @state()
    public open = false;
    @state() typeBot = ""

    @state()
    private buttonDisable: boolean = false;

    @queryAll('input') inputs!: NodeListOf<HTMLInputElement>;

    @property() success = ()=>{}

    @query('modal-auth-device') modalAuthDevice : ModalAuthDevice
    async onAccept(){script.createBot(this.modalAuthDevice, this.typeBot, this.success)}
    onCancel(){this.success()}
    @state()
    private showPassword = false;
    private togglePasswordVisibility() {this.showPassword = !this.showPassword;}
    render() {
        if (this.typeBot=="WhatsApp"){
            this.config = {
                email: false,
                password: false,
                phone: true,
                username: false,
            }
        }
        if (!this.open) return ""
        return html`
            <modal-auth-device></modal-auth-device>
            <div class="main-container">
                <div class="form-wrapper">
                    <h1 class="form-title">${this.title}</h1>

                    <form class="form-fields" @submit=${(e: Event)=> e.preventDefault()}>
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
                            <button @click=${this.onAccept} class="button button-primary ${this.buttonDisable ? 'disabled' : ''}" type="submit" ?disabled=${this.buttonDisable} >
                                Vincular
                            </button >
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
