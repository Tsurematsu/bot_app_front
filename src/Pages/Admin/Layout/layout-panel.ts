import { css, html, LitElement, type CSSResultGroup, type PropertyValues } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import StartPanelScript from './LayoutPanel.script';
import "./home-panel/home-panel";
import "./users-panel/users-panel";
import "./components/navbar-component";
import "./credencial-panel/credencial-panel";
import "./components/content-component";

@customElement('layout-panel')
export class LayoutPanel extends LitElement {
    private instantPanel = false
    static styles = css`
        .container{
            background-color: #101922;
        }
    `
    @state() private showPanel = false
    
    @state() private panel = "users"
    public setPanel = (e)=>{this.panel = e}
    @state() private textHeader = "Usuarios"
    public setTitle = (e)=>this.textHeader=e
    
    private initialized = false;
    connectedCallback() {
        super.connectedCallback();
        if (!this.initialized) {
            this.initialized = true;
            StartPanelScript.onValidUser((e)=>this.showPanel=e, (e)=>this.instantPanel=e)
        }
    }

    render() {
        if (!(this.instantPanel || this.showPanel)) return ""
        return html`
           <div class="container">
                <content-component .textHeader=${this.textHeader}>
                    ${this.panel == "home"?html`<home-panel .setPanel=${this.setPanel}></home-panel>`:""}
                    ${this.panel == "users"?html`<users-panel></users-panel>`:""}
                    ${this.panel == "credencial"?html`<credencial-panel></credencial-panel>`:""}
                </content-component>
                <navbar-component .setPanel=${this.setPanel} .setTitle=${this.setTitle}></navbar-component>
           </div>
        `
    }
}
