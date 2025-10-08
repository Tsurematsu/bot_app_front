import { css, html, LitElement, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import styles from './configuracion.css?inline';
export default function configuracion(setUrl){
    return html`
        <configuracion-el .setUrl=${setUrl}></configuracion-el>
    `
}

@customElement('configuracion-el')
export class ConfiguracionClass extends LitElement {
    static styles = css`${unsafeCSS(styles)}`

    @property()
    private setUrl = (url)=>{};

    logOut(){
        this.setUrl('/')
        localStorage.setItem('appSelect', '0');
    }

    render() {
        return html`
            <h2>Configuraciones</h2>
            <div class="settings-section">

                <!-- Usuario -->
                <div class="settings-block">
                    <h3>Usuario</h3>
                    <div class="field">
                        <label for="user-id">ID de Usuario</label>
                        <input type="text" id="user-id" value="usuario123">
                    </div>
                    <div class="field">
                        <label for="access-code">Código de Ingreso</label>
                        <input type="password" id="access-code" value="codigo456">
                    </div>
                </div>

                <!-- Prompt de Contexto -->
                <div class="settings-block">
                    <h3>Prompt de Contexto</h3>
                    <div class="field">
                        <label for="context-prompt">Texto</label>
                        <textarea id="context-prompt" rows="4" placeholder="Escribe aquí el contexto general..."></textarea>
                    </div>
                </div>

                <!-- Items Configurables -->
                <div class="settings-block">
                    <h3>Ítems Configurables</h3>
                    <table class="settings-table">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Valor</th>
                                <th>Acción</th>
                            </tr>
                        </thead>
                        <tbody id="items-table">
                            <tr>
                                <td><input type="text" value="Item 1"></td>
                                <td><input type="text" value="Valor 1"></td>
                                <td><button class="delete-btn">🗑️</button></td>
                            </tr>
                            <!-- Más filas dinámicamente -->
                        </tbody>
                    </table>
                    <button class="add-item-btn">➕ Agregar Ítem</button>
                </div>

                <!-- Configuración General -->
                <div class="settings-block">
                    <h3>Configuración General</h3>
                    <div class="field">
                        <label for="company-name">Nombre de Compañía</label>
                        <input type="text" id="company-name" placeholder="Ej: OpenAI S.A.">
                    </div>
                    <div class="field">
                        <label for="business-context">Contexto del Negocio</label>
                        <textarea id="business-context" rows="3" placeholder="Describe el enfoque del negocio..."></textarea>
                    </div>
                </div>

                <!-- Productos -->
                <div class="settings-block">
                    <h3>Productos</h3>
                    <ul class="product-list">
                        <li>Producto A</li>
                        <li>Producto B</li>
                        <li>Producto C</li>
                    </ul>
                    <button class="add-product-btn">➕ Agregar Producto</button>
                </div>

                <!-- Botón Cerrar Sesión -->
                <div class="settings-block logout-block">
                    <button @click=${this.logOut} class="logout-btn">🔓 Cerrar Sesión</button>
                </div>
            </div>

        `;
    }
}
