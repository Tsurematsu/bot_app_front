import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('layout-panel-client')
export class LayoutPanelClient extends LitElement {
    render() {
        return html`
            <h1>Bienvenido, cliente</h1>
        `;
    }
}
