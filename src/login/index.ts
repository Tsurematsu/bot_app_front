import { css, html, LitElement, unsafeCSS, type CSSResultGroup } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import styles from './login.css?inline'
export default function login(SetUrl, GetUrl){
    return html`<login-el .setUrl=${SetUrl} .getUrl=${GetUrl}></login-el>`
}

@customElement('login-el')
export class LoginClass extends LitElement {
    static styles = css`${unsafeCSS(styles)}`
    @property()
    private setUrl = (url)=>{};
    @property() 
    private getUrl = ()=>{};
    render() {
        return html`
            <div class="body">
                <div class="login-container">
                    <div class="avatar"></div>

                    <div class="input-group">
                    <i class="fa fa-envelope"></i>
                    <input type="text" placeholder="ID de usuario">
                    </div>

                    <div class="input-group">
                    <i class="fa fa-lock"></i>
                    <input type="password" placeholder="Código de ingreso">
                    </div>

                    <div class="options">
                    <label><input type="checkbox"> Recordarme</label>
                    <a href="#">No recuerdo mi código</a>
                    </div>

                    <button @click=${this.onChangePage} class="login-btn">INGRESAR</button>
                </div>

                <!-- Font Awesome for icons -->
                <script src="https://kit.fontawesome.com/a076d05399.js" crossorigin="anonymous"></script>

            </div>
            <!-- <button @click=${this.onChangePage}>Ir a administrador</button> -->
        `;
    }
    onChangePage(){this.setUrl('/client')}

}
