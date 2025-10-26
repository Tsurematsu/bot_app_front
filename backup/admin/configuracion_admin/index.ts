import { css, html, LitElement, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import styles from './configuracion_admin.css?inline'
export default function configuracion_admin(username, hiddenPanel) {
    return html`
        <configuracion_admin-el .username=${username} .hiddenPanel=${hiddenPanel}></configuracion_admin-el>
    `
}

@customElement('configuracion_admin-el')
export class configuracion_adminClass extends LitElement {
    static styles = css`${unsafeCSS(styles)}`
    @property()
    private username = ""

    @property()
    private hiddenPanel =()=>{}

    render() {
        return html`

        <div class="container">
            <header class="header">
            <button @click=${this.hiddenPanel} class="back-button">
                <img width="30" src="/public/flecha-back.png" alt="">
            </button>
            <h1>Permisos</h1>
            <div class="spacer"></div>
            </header>

            <main class="main">
                <h2>${this.username}</h2>
                <div class="permissions-list">
                    <!-- Repite este bloque para cada permiso -->
                    <div class="permission-item">
                    <div class="permission-text">
                        <p class="title">Recibir chats</p>
                        <p class="description">Permite recibir mensajes de chat</p>
                    </div>
                    <label class="switch">
                        <input type="checkbox" />
                        <span class="slider"></span>
                    </label>
                    </div>

                    <div class="permission-item">
                    <div class="permission-text">
                        <p class="title">Enviar chats</p>
                        <p class="description">Permite enviar mensajes de chat</p>
                    </div>
                    <label class="switch">
                        <input type="checkbox" checked />
                        <span class="slider"></span>
                    </label>
                    </div>

                    <div class="permission-item">
                    <div class="permission-text">
                        <p class="title">Crear usuarios</p>
                        <p class="description">Permite crear nuevos usuarios</p>
                    </div>
                    <label class="switch">
                        <input type="checkbox" />
                        <span class="slider"></span>
                    </label>
                    </div>

                    <div class="permission-item">
                    <div class="permission-text">
                        <p class="title">Eliminar usuarios</p>
                        <p class="description">Permite eliminar usuarios existentes</p>
                    </div>
                    <label class="switch">
                        <input type="checkbox" />
                        <span class="slider"></span>
                    </label>
                    </div>

                    <div class="permission-item">
                    <div class="permission-text">
                        <p class="title">Modificar usuarios</p>
                        <p class="description">Permite modificar los datos de los usuarios</p>
                    </div>
                    <label class="switch">
                        <input type="checkbox" checked />
                        <span class="slider"></span>
                    </label>
                    </div>

                    <div class="permission-item">
                    <div class="permission-text">
                        <p class="title">Ver usuarios</p>
                        <p class="description">Permite ver los datos de los usuarios</p>
                    </div>
                    <label class="switch">
                        <input type="checkbox" checked />
                        <span class="slider"></span>
                    </label>
                    </div>

                    <div class="permission-item">
                    <div class="permission-text">
                        <p class="title">Crear credenciales</p>
                        <p class="description">Permite crear nuevas credenciales</p>
                    </div>
                    <label class="switch">
                        <input type="checkbox" />
                        <span class="slider"></span>
                    </label>
                    </div>

                    <div class="permission-item">
                    <div class="permission-text">
                        <p class="title">Eliminar credenciales</p>
                        <p class="description">Permite eliminar credenciales existentes</p>
                    </div>
                    <label class="switch">
                        <input type="checkbox" />
                        <span class="slider"></span>
                    </label>
                    </div>

                </div>
            </main>
        </div>
        `;
    }
}
