import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('content-component')
export class ContentComponent extends LitElement {
    static styles = css`
        .body {
            display: flex;
            flex-direction: column;
            min-height: 100dvh;
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

        .header {
            display: flex;
            align-items: center;
            padding: 1rem;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            position: sticky;
            top: 0;
            background-color: #101922;
        }

        .header h1 {
            flex: 1;
            text-align: center;
            font-size: 1.2rem;
            font-weight: bold;
        }

    `
    @property() textHeader = "Titulo"
    render() {
        return html`
            <div class="body">
                <header class="header">
                    <h1>${this.textHeader}</h1>
                </header>
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
