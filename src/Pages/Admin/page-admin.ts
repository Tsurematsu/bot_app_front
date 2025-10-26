import { css, html, LitElement, unsafeCSS, type CSSResultGroup } from 'lit';
import { customElement } from 'lit/decorators.js';
import styles from "./page-admin.css?inline"
import images from '../../images';
const Styles = styles.replace('iconBot', images.iconBot)
@customElement('page-admin')
export class Admin extends LitElement {
    static styles = css`${unsafeCSS(Styles)}`
    render() {
        return html`
            <div class="body">
                <div >

                </div>
                <div class="login-container">
                    <div class="avatar" ></div>

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

                    <button class="login-btn">INGRESAR</button>
                </div>
            </div>
        `;
    }
}
