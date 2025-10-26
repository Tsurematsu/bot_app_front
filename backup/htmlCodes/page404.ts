import { LitElement, css, html, unsafeCSS } from 'lit';
import { customElement } from 'lit/decorators.js';
import styles from './page404.css?inline';

import questionMarkCircle from 'heroicons/24/outline/question-mark-circle.svg?raw';

import { unsafeSVG } from 'lit/directives/unsafe-svg.js';
export default function page404() {
    return html`
        <page404-el></page404-el>
    `
}
@customElement('page404-el')
export class Page404Class extends LitElement {
    static styles = css`${unsafeCSS(styles)}`

    render() {
        return html`
            <title>Página no encontrada</title>
            <div class="body">
                <div class="container">
                    <!-- Illustration -->
                    <div class="icon-wrapper">
                        <svg width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                            ${unsafeSVG(questionMarkCircle)}
                        </svg>
                    </div>
                    
                    <!-- HeadlineText -->
                    <h1 class="headline">
                        ¡Ups! Página no encontrada
                    </h1>
                    
                    <!-- BodyText -->
                    <p class="body-text">
                        Parece que el enlace está roto o la página ha sido eliminada. No te preocupes, te ayudamos a volver.
                    </p>
                    
                    <!-- SingleButton -->
                    <div class="button-wrapper">
                        <button @click=${() => window.location.href = '/'} class="primary-button">
                            <span class="button-text">Ir a la Página Principal</span>
                        </button>
                    </div>
                </div>
            </div>
        `;
    }
}
