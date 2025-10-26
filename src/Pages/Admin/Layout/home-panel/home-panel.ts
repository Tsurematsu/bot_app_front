import { css, html, LitElement, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import styles from "./home-panel.css?inline"
@customElement('home-panel')
export class HomePanel extends LitElement {
    static styles = css`${unsafeCSS(styles)}`
    @property() setPanel = (_x)=>{}
    render() {
        return html`
            <h1>Hola, bienvenido administrador</h1>
            <button @click=${()=>this.setPanel("none")} >set none</button>
        `;
    }
}
