import { css, html, LitElement, unsafeCSS, type CSSResultGroup } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import styles from "./users-panel.css?inline"
import "../components/content-component";
import "./components/user-item-component";
import UsersPanelScript from './UsersPanel.script';
import Fetch from '../../../../Helpers/herlperFetch';
interface getPoint {
    id:number,
    user_name: string,
    user_email: string,
    user_permissions: string[]
}
@customElement('users-panel')
export class UsersPanel extends LitElement {
    static styles = css`${unsafeCSS(styles)}`

    private initListUsers = []
    @state() private listUsers = []
    public setInitListUsers = (e)=>this.initListUsers=e
    public setListUsers = (e)=>this.listUsers=e

    private clickItem = async (e: getPoint)=>{
        console.log("elemento click", e);
        await Fetch.post("/admin/deleteClient", {id:e.id})
        UsersPanelScript.loadClients(this.setInitListUsers, this.setListUsers)
    }

    render() {
        UsersPanelScript.loadClients(this.setInitListUsers, this.setListUsers)
        const localListUsers : getPoint[] =  this.listUsers.length == 0? this.initListUsers : this.listUsers;
        return html`
            <div class="api-list">
                ${localListUsers.map((e)=>html`
                    <user-item-component .clickItem=${this.clickItem} userName=${e.user_name} .data=${e}></user-item-component>
                `)}
            </div>
        `;
    }
}
