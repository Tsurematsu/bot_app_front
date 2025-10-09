import { css, html, LitElement, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import styles from "./admin.css?inline"
import clientes from './clientes';
import credenciales from './credenciales';
import configuracion_admin from './configuracion_admin';
export default function admin(SetUrl, GetUrl){
    return html`<admin-el .setUrl=${SetUrl} .getUrl=${GetUrl}></admin-el>`
}
@customElement('admin-el')
export class AdminClass extends LitElement {
    static styles = css`${unsafeCSS(styles)}`
    @property() private setUrl = (url)=>{};
    @property() private getUrl = ()=>{};
    render() {
        return html`
        <div class="body">
            <div class="app-wrapper">
                <!-- MAIN -->
                <main class="main">
                    ${configuracion_admin()}
                </main>

                <!-- NAV -->
                <nav class="nav">
                    <div class="container">
                        <div class="nav-links">
                            <div href="#" class="nav-link active">
                                <img width="30" src="/public/editar.png" alt="">
                                <span class="label">Usuarios</span>
                            </div>
                            <div href="#" class="nav-link">
                                <img width="30" src="/public/tarjeta-de-identificacion.png" alt="">
                                <span class="label">Credenciales</span>
                            </div>
                            <div href="#" class="nav-link">
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
    onChangePage(){this.setUrl('/')}
}
