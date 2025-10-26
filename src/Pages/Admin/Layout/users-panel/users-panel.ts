import { css, html, LitElement, unsafeCSS, type CSSResultGroup } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import styles from "./users-panel.css?inline"
import "../components/content-component";
import "./components/user-item-component";
import UsersPanelScript from './UsersPanel.script';
@customElement('users-panel')
export class UsersPanel extends LitElement {
    static styles = css`${unsafeCSS(styles)}`

    private initListUsers = []
    @state() private listUsers = []
    public setInitListUsers = (e)=>this.initListUsers=e
    public setListUsers = (e)=>this.listUsers=e

    private clickItem = (_x)=>{
        console.log("elemento click");
    }

    render() {
        UsersPanelScript.loadClients(this.setInitListUsers, this.setListUsers)
        const localListUsers =  this.listUsers.length == 0? this.initListUsers : this.listUsers;
        return html`
            <content-component>
                <header class="header">
                    <h1>Clientes</h1>
                </header>
                <div class="api-list">
                    ${localListUsers.map((e)=>html`
                        <user-item-component .clickItem=${this.clickItem} userName=${"Carlos Mensa"}></user-item-component>
                    `)}
                </div>
            </content-component>
            <slot></slot>
        `;
    }
}
