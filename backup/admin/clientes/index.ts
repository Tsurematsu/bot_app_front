import { css, html, LitElement, unsafeCSS, type PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import styles from "./clientes.css?inline"
import userItem from './userItem';
import configuracion_admin from '../configuracion_admin';
export default function clientes(setUrl){
    return html`
        <clientes-el></clientes-el>
    `
}

@customElement('clientes-el')
export class ClientesClass extends LitElement {
    static styles = css`${unsafeCSS(styles)}`
    @property() 
    private clientId = "juan"
    @state() 
    private openPanel = false
    setPanel = (clientID)=>{
        this.openPanel = true;
        this.clientId = clientID
    }
    hiddenPanel = ()=>{
        this.openPanel = false;
    }


    render() {
        if (this.openPanel) return configuracion_admin(this.clientId, this.hiddenPanel)
        return html`
            <header class="header">
                <h1>Clientes</h1>
            </header>
            <div class="api-list">
                ${userItem(this.setPanel, 'Carlos Mendoza avatar')}
            </div>
        `;
    }
}
