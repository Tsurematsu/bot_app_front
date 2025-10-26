import { css, html, LitElement, unsafeCSS } from 'lit';
import { customElement } from 'lit/decorators.js';
import styles from './credenciales.css?inline'
export default function credenciales(){
    return html`
        <credenciales-el></credenciales-el>
    `
}

@customElement('credenciales-el')
export class CredencialesClass extends LitElement {
    static styles = css`${unsafeCSS(styles)}`
    render() {
        return html`
            <h2>Credenciales</h2>
            <div class="credentials-list">

                <!-- Credencial API 1 -->
                <div class="credential-item">
                    <div class="credential-header">
                        <div class="credential-icon">🔑</div>
                        <p class="credential-title">Image Recognition API</p>
                    </div>
                    <div class="credential-fields">
                        <div class="field">
                            <label for="user1">Usuario</label>
                            <input type="text" id="user1" value="user_image_api" readonly>
                        </div>
                        <div class="field">
                            <label for="pass1">Contraseña</label>
                            <input type="password" id="pass1" value="password123" readonly>
                        </div>
                    </div>
                </div>

                <!-- Credencial API 2 -->
                <div class="credential-item">
                    <div class="credential-header">
                        <div class="credential-icon">🔐</div>
                        <p class="credential-title">Text Translation API</p>
                    </div>
                    <div class="credential-fields">
                        <div class="field">
                            <label for="user2">Usuario</label>
                            <input type="text" id="user2" value="traductor_user" readonly>
                        </div>
                        <div class="field">
                            <label for="pass2">Contraseña</label>
                            <input type="password" id="pass2" value="secure456" readonly>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }    
}
