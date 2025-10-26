import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('layout-panel')
export class LayoutPanel extends LitElement {
    render() {
        return html`
            <h1>Bienvenido, cliente</h1>
        `;
    }
}
