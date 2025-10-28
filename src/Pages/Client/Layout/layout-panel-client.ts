import { css, html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import "./components/content-component-client";
import LayoutPanelClientScript from './LayoutPanelClientScript';
import "./config-layout-client/config-layout-client";
import "./bot-layout-client/bot-layout-client";
import "./calendario-layout-client/calendario-layout-client";

@customElement('layout-panel-client')
export class LayoutPanelClient extends LitElement {
    private instantPanel = false
    static styles = css`
        .container{
            background-color: #101922;
        }
    `
    @state() private showPanel = false
    
    @state() private panel = "calendar"
    public setPanel = (e)=>{this.panel = e}
    
    private initialized = false;
    connectedCallback() {
        super.connectedCallback();
        if (!this.initialized) {
            this.initialized = true;
            LayoutPanelClientScript.onValidUser((e)=>this.showPanel=e, (e)=>this.instantPanel=e)
        }
    }
        
    render() {
        if (!(this.instantPanel || this.showPanel)) return ""
        return html`
           <div class="container">
                <content-component-client .setPanel=${this.setPanel}>
                    ${this.panel == "bots"?html`<bot-layout-client></bot-layout-client>`:""}
                    ${this.panel == "calendar"?html`<calendario-layout-client></calendario-layout-client>`:""}
                    ${this.panel == "notify"?html`<span>notificaciones</span>`:""}
                    ${this.panel == "facture"?html`<span>facturación</span>`:""}
                    ${this.panel == "config"?html`<config-layout-client></config-layout-client>`:""}
                </content-component-client>
           </div>
        `
    }
}
