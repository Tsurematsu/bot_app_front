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
                    <h3>Informacion de la compañía</h3>
                    <div class="field">
                        <label for="user-id">Nombre de la empresa</label>
                        <input type="text" id="user-id" value="" placeholder="Mi empresa sas">
                    </div>
                    <div class="field">
                        <label for="user-email">Correo publico de contacto</label>
                        <input type="email" id="user-email" value="" placeholder="Mi empresa sas">
                    </div>
                    <div class="field">
                        <label for="business-context">Descripcion del Negocio</label>
                        <textarea id="business-context" rows="3" placeholder="Describe el enfoque del negocio..."></textarea>
                    </div>
                </div>


                <!-- Prompt de Contexto -->
                <div class="settings-block">
                    <h3>Instrucciones IA</h3>
                    <div class="field">
                        <label for="context-prompt">Aquí le especificas al tu asistente como debe actuar frente al cliente</label>
                        <textarea id="context-prompt" rows="4" placeholder="Escribe aquí el contexto general..."></textarea>
                    </div>
                     <div class="field">
                         <button class="add-product-btn">Generar prompt con IA</button>
                    </div>
                </div>

                <!-- Items Configurables -->
                <div class="settings-block">
                    <h3>Ejemplos de respuestas</h3>
                    <table class="settings-table">
                        <thead>
                            <tr>
                                <th>Pregunta</th>
                                <th>Respuesta</th>
                                <th>Acción</th>
                            </tr>
                        </thead>
                        <tbody id="items-table">
                            <tr>
                                <td><input type="text" value="Item 1"></td>
                                <td><input type="text" value="Valor 1"></td>
                                <td><button class="delete-btn">X</button></td>
                            </tr>
                            <!-- Más filas dinámicamente -->
                        </tbody>
                    </table>
                    <button class="add-item-btn">➕ Agregar Ítem</button>
                </div>

                <!-- Productos -->
                <div class="settings-block">
                    <h3>Productos</h3>
                    <ul class="product-list">
                        <li>Producto A</li>
                        <li>Producto B</li>
                        <li>Producto C</li>
                    </ul>
                    <div class="field">

                        <button class="add-product-btn">➕ Agregar Producto</button>
                    </div>
                    <div class="field">
                        <label for="context-prompt">Aquí puedes cargar tus productos desde un sitio web</label>
                        <input type="text" id="user-id" value="" placeholder="https:www.dominio.com/tu-Sección">
                        <button class="add-product-btn">➕ Cargar Productos</button>
                    </div>
                </div>

                <div class="settings-block">
                    <div class="field">
                        <button class="add-product-btn">📱 Contactanos si hay un error</button>
                        <button class="add-product-btn">🔗 Requerir soporte a un enlace</button>
                        <button class="add-product-btn">📁 Cargar datos desde un pdf</button>
                    </div>
                    <div class="field">
                        <button @click=${this.logOut} class="logout-btn">🔓 Cerrar Sesión</button>
                    </div>
                </div>

                <!-- Botón Cerrar Sesión -->
            </div>

        `;
    }
}
