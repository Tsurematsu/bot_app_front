import { css, html, LitElement, unsafeCSS, type PropertyValues } from 'lit';
import { customElement, query, state } from 'lit/decorators.js';
import styles from "./credencial-panel.css?inline"
@customElement('credencial-panel')
export class CredencialPanel extends LitElement {
    static styles = css`${unsafeCSS(styles)}`
    @state() listKeys = []
    @state() selectKeys = {}
    @query('#optionSelected') optionSelected!:HTMLSelectElement
    protected firstUpdated(_changedProperties: PropertyValues): void {
        // FETCH.get("/action/getKeys").then((e)=>{this.listKeys = e['keys']})
    }
    handleRemoveKey(key: string) {
        const newKeys = {...this.selectKeys};
        delete newKeys[key];
        this.selectKeys = newKeys;
    }
    render() {
        return html`
            <main class="main">
                <br>
                <div class="form-group">
                    <label for="username">Nombre de usuario</label>
                    <input name="username" type="text" placeholder="Ingrese el nombre de usuario">
                </div>

                <div class="form-group">
                    <label for="username">Email</label>
                    <input name="email" type="text" placeholder="Ingrese el email del usuario">
                </div>

                <div class="form-group">
                    <label for="username">Telefono</label>
                    <input name="telefono" type="text" placeholder="Ingrese telefono del usuario">
                </div>

                <div class="form-group">
                    <label for="username">Lista de claves</label>
                    <select id="optionSelected" class="key-selector">
                        ${this.listKeys.map((e)=>html`<option>${e}</option>`)}
                    </select>
                    <button class="add-key-button" @click=${()=>{
                        this.selectKeys[this.optionSelected.value] = "";
                        this.selectKeys={...this.selectKeys}
                        }}>
                        Agregar
                    </button>
                    <ul class="selected-keys-list">
                        ${Object.keys(this.selectKeys).map((e) => html`
                        <li class="key-item">
                            <span class="key-item-text">${e}</span>
                            <button class="remove-key-button" @click=${()=> this.handleRemoveKey(e)}>
                                ✕
                            </button>
                        </li>
                        `)}
                    </ul>
                </div>

                <button class="generate-button">Generar enlace de acceso</button>

                <div class="form-group">
                    <label for="generated-code">Enlace generado</label>
                    <div class="generated-code-container">
                        <input name="token" type="text" id="generated-code" value="" readonly>
                        <button class="copy-button">
                            <span class="material-symbols-outlined">copy</span>
                        </button>
                    </div>
                </div>
            </main>
        `;
    }
}
