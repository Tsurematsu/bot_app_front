import { css, html, LitElement, unsafeCSS } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import styles from "./admin.css?inline"
import clientes from './clientes';
import credenciales from './credenciales';
import configuracion_admin from './configuracion_admin';
import config_service from './config_service';
export default function admin(SetUrl, GetUrl){
    return html`<admin-el .setUrl=${SetUrl} .getUrl=${GetUrl}></admin-el>`
}
@customElement('admin-el')
export class AdminClass extends LitElement {
    static styles = css`${unsafeCSS(styles)}`
    @property() private setUrl = (url)=>{};
    @property() private getUrl = ()=>{};
    @state() private selectPage = 0;
    private pages = [
        clientes,
        credenciales,
        config_service
    ]
    setPage = (index)=>{
        this.selectPage = index
    }
    render() {
        return html`
        <div class="body">
            <div class="app-wrapper">
                <!-- MAIN -->
                <main class="main">
                    ${this.pages[this.selectPage](this.setUrl)}
                </main>

                <!-- NAV -->
                <nav class="nav">
                    <div class="container">
                        <div class="nav-links">
                            <div @click=${()=>this.setPage(0)} class="nav-link ${this.selectPage==0?"active":""}">
                                <img width="30" src="/public/editar.png" alt="">
                                <span class="label">Usuarios</span>
                            </div>
                            <div @click=${()=>this.setPage(1)} class="nav-link ${this.selectPage==1?"active":""}">
                                <img width="30" src="/public/tarjeta-de-identificacion.png" alt="">
                                <span class="label">Credenciales</span>
                            </div>
                            <div @click=${()=>this.setPage(2)} class="nav-link ${this.selectPage==2?"active":""}">
                                <img width="30" src="/public/ajuste.png" alt="">
                                <span class="label">Configuración</span>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
        `;
    }
}
