import { css, html, LitElement, unsafeCSS, type CSSResultGroup, type PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import styles from './login.css?inline'
import Script from './Script';
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

    protected firstUpdated(_changedProperties: PropertyValues): void {
        Script.Auth()
    }

    render() {
        return html`
            <div class="body">
                <div class="login-container">
                    <div class="avatar"></div>

                    <div class="input-group">
                    <i class="fa fa-envelope"></i>
                    <input name="username" type="text" placeholder="ID de usuario">
                    </div>

                    <div class="input-group">
                    <i class="fa fa-lock"></i>
                    <input name="password" type="password" placeholder="Código de ingreso">
                    </div>

                    <div class="options">
                    <a href="#">No recuerdo mi código</a>
                    </div>

                    <button @click=${Script.Login} class="login-btn">INGRESAR</button>
                </div>
            </div>
        `;
    }
    onChangePage(){this.setUrl('/client')}

}
