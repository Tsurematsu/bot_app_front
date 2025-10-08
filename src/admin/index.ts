import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
export default function admin(SetUrl, GetUrl){
    return html`<admin-el .setUrl=${SetUrl} .getUrl=${GetUrl}></admin-el>`
}
@customElement('admin-el')
export class AdminClass extends LitElement {
    @property()
    private setUrl = (url)=>{};
    @property() 
    private getUrl = ()=>{};
    render() {
        return html`
            <h1>it's page administrator</h1>
            <button @click=${this.onChangePage}>ir a principal</button>
        `;
    }
     onChangePage(){this.setUrl('/')}
}
