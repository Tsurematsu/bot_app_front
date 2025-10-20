import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';

export default function request(){
    return html`<request-code></request-code>`
}

@customElement('request-code')
export class Index extends LitElement {
    render() {
        return html`
            request code
        `;
    }
}
