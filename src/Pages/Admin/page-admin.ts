import { css, html, LitElement, unsafeCSS, type CSSResultGroup, type PropertyValues } from 'lit';
import { customElement, queryAll } from 'lit/decorators.js';
import styles from "./page-admin.css?inline"
import images from '../../images';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { Router } from '@vaadin/router';
import PageAdmin from './PageAdmin';
const Styles = styles.replace('iconBot', images.iconBot)
@customElement('page-admin')
export class Admin extends LitElement {
    static styles = css`${unsafeCSS(Styles)}`

    @queryAll('input')
    private inputs : NodeListOf<HTMLInputElement>;

    protected firstUpdated(_changedProperties: PropertyValues): void {
        PageAdmin.onLoadPage()
    }
    render() {
        return html`
            <div class="body">
                <div @click=${()=>Router.go("/")} class="back">
                    ${unsafeHTML(images.svg.arrowBack)}
                </div>
                <div class="login-container">
                    <div class="avatar" ></div>

                    <div class="input-group">
                        <i class="fa fa-envelope"></i>
                        <input name="email" type="email" placeholder="correo de usuario">
                    </div>

                    <div class="input-group">
                        <i class="fa fa-lock"></i>
                        <input name="password" type="password" placeholder="Código de ingreso">
                    </div>

                    <div class="options">
                        <a href="#">No recuerdo mi código</a>
                    </div>

                    <button @click=${(e)=>PageAdmin.loginButton(this.inputs, e)} class="login-btn">INGRESAR</button>
                </div>
            </div>
        `;
    }
}
