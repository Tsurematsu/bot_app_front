import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('content-component')
export class ContentComponent extends LitElement {
    static styles = css`
        .body {
            display: flex;
            flex-direction: column;
            height: 100dvh;
            font-family: 'Inter', sans-serif;
            margin: 0;
            padding: 0;
            background-color: #101922;
            color: white;
        }

        .app-wrapper {
            display: flex;
            flex-direction: column;
            flex: 1; /* Toma el alto restante */
            margin: 0 10px;
            overflow: hidden; /* Evita desbordamiento */
        }

        .main {
            flex: 1; /* Ocupa el espacio disponible, empuja el navbar hacia abajo */
            overflow-y: auto; /* Si hay mucho contenido, aparece scroll */
        }

    `
    render() {
        return html`
            <div class="body">
                <div class="app-wrapper">
                    <!-- MAIN -->
                    <main class="main">
                        <slot></slot>
                    </main>
                </div>
            </div>
        `;
    }
}
