import { html, LitElement, type PropertyValues } from 'lit';
import { customElement } from 'lit/decorators.js';
import FETCH from '../tools/FETCH';
export default function AccessClient(){
    return html`<access-client></access-client>`
}

@customElement('access-client')
export class Index extends LitElement {

    protected firstUpdated(_changedProperties: PropertyValues): void {
        const token = window.location.hash.slice(1)
        window.location.hash = ""
        FETCH.post("/auth/into", {token}).then((response)=>{window.location.href = '?client'})
        
    }
    
    render() {
        return html`
            <h1>Acceso</h1>
        `;
    }
}
