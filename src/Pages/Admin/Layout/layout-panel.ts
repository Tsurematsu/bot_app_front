import { html, LitElement, type PropertyValues } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import StartPanelScript from './LayoutPanel.script';
import "./home-panel/home-panel";
import "./users-panel/users-panel";
import "./components/navbar-component";

@customElement('layout-panel')
export class LayoutPanel extends LitElement {
    private instantPanel = false
    
    @state() private showPanel = false
    
    @state() private panel = "users"
    public setPanel = (e)=>{this.panel = e}
    
    protected firstUpdated(_changedProperties: PropertyValues): void {
        
    }

    render() {
        StartPanelScript.onValidUser((e)=>this.showPanel=e, (e)=>this.instantPanel=e)
        if (!(this.instantPanel || this.showPanel)) return ""
        if (this.panel == "home") return html`<home-panel .setPanel=${this.setPanel}></home-panel>`
        if (this.panel == "users") return html`<users-panel><navbar-component .setPanel=${this.setPanel}></navbar-component></users-panel>`
        return html`<h1>panel no seleccionado</h1>`
    }
}
