import { css, html, LitElement, svg, unsafeCSS } from 'lit';
import { customElement } from 'lit/decorators.js';
import "../Client/page-client";
import styles from "./page-home.css?inline"
import images from '../../images';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { Router } from '@vaadin/router';
@customElement('page-home')
export class HOme extends LitElement {
    static styles = css`${unsafeCSS(styles)}`;
    clickPlan(MENSAJE){
        const numero = '573507809645';
        const msg = `https://wa.me/${numero}?text=${MENSAJE}`;
        window.open(msg, '_blank').focus();
    }
    render() {
        return html`
            <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet"/>
            <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet"/>
            <div class="body">
                <div class="root-container">
                    <!-- TopAppBar -->
                    <header class="header">
                        <div class="header-icon">${unsafeHTML(images.svg.bot)}</div>
                        <h2 class="header-title">Jerbot</h2>
                        <div class="header-menu">
                            <button @click=${()=>Router.go("/admin")} class="menu-button">${unsafeHTML(images.svg.menu)}</button>
                        </div>
                    </header>

                    <!-- Hero Section -->
                    <main class="main-content">
                        <div class="hero-section">
                            <h1 class="hero-title">Conversaciones que Convierten</h1>
                            <p class="hero-text">
                                Automatiza los filtros para tu negocio, que lleguen a ti los clientes más potenciales, agenda citas automatizadas según lo que necesites.
                            </p>
                            <div class="hero-button-container">
                                <button @click=${() => Router.go("/client")} class="btn-primary">
                                    <span>Login Clientes</span>
                                </button>
                            </div>
                        </div>

                        <!-- Pricing Section -->
                        <section class="pricing-section">
                            <div class="container">
                                <h2 class="section-title">Elige tu Plan Ideal</h2>
                                
                                <div class="pricing-grid">
                                    <!-- Plan Básico -->
                                    <div class="pricing-card">
                                        <h3 class="plan-name">Básico</h3>
                                        <p class="plan-description">Funcionalidades esenciales para empezar.</p>
                                        <p class="plan-price">$47.700<span class="price-period">/mes</span></p>
                                        <ul class="plan-features">
                                            <li class="feature-item">
                                                ${unsafeHTML(images.svg.checkCircle)}
                                                <span>1 Chatbot</span>
                                            </li>
                                            <li class="feature-item">
                                                ${unsafeHTML(images.svg.checkCircle)}
                                                <span>1,000 interacciones/mes</span>
                                            </li>
                                            <li class="feature-item">
                                                ${unsafeHTML(images.svg.checkCircle)}
                                                <span>Soporte básico por email</span>
                                            </li>
                                        </ul>
                                        <button @click=${() => this.clickPlan('Hola, quiero el Plan Básico')} class="btn-secondary">
                                            <span>Empezar</span>
                                        </button>
                                    </div>

                                    <!-- Plan Estándar (Destacado) -->
                                    <div class="pricing-card featured">
                                        <div class="featured-badge">Más Popular</div>
                                        <h3 class="plan-name">Estándar</h3>
                                        <p class="plan-description">La mejor relación valor/precio.</p>
                                        <p class="plan-price">$50.000<span class="price-period">/mes</span></p>
                                        <ul class="plan-features">
                                            <li class="feature-item">
                                                ${unsafeHTML(images.svg.checkCircle)}
                                                <span>Hasta 2 Chatbots</span>
                                            </li>
                                            <li class="feature-item">
                                                ${unsafeHTML(images.svg.checkCircle)}
                                                <span>5,000 interacciones/mes</span>
                                            </li>
                                            <li class="feature-item">
                                                ${unsafeHTML(images.svg.checkCircle)}
                                                <span>Agendamiento de Citas</span>
                                            </li>
                                            <li class="feature-item">
                                                ${unsafeHTML(images.svg.checkCircle)}
                                                <span>Gestión de inventario</span>
                                            </li>
                                            <li class="feature-item">
                                                ${unsafeHTML(images.svg.checkCircle)}
                                                <span>Notificaciones inmediatas</span>
                                            </li>
                                        </ul>
                                        <button @click=${() => this.clickPlan('Hola, quiero el Plan Estándar')} class="btn-primary">
                                            <span>Seleccionar Plan</span>
                                        </button>
                                    </div>

                                    <!-- Plan Premium -->
                                    <div class="pricing-card">
                                        <h3 class="plan-name">Premium</h3>
                                        <p class="plan-description">Para empresas que necesitan más.</p>
                                        <p class="plan-price">$149.000<span class="price-period">/mes</span></p>
                                        <ul class="plan-features">
                                            <li class="feature-item">
                                                ${unsafeHTML(images.svg.checkCircle)}
                                                <span>Hasta 4 Chatbots</span>
                                            </li>
                                            <li class="feature-item">
                                                ${unsafeHTML(images.svg.checkCircle)}
                                                <span>10,000 interacciones/mes</span>
                                            </li>
                                            <li class="feature-item">
                                                ${unsafeHTML(images.svg.checkCircle)}
                                                <span>Agendamiento de Citas</span>
                                            </li>
                                            <li class="feature-item">
                                                ${unsafeHTML(images.svg.checkCircle)}
                                                <span>Gestión de inventario</span>
                                            </li>
                                            <li class="feature-item">
                                                ${unsafeHTML(images.svg.checkCircle)}
                                                <span>Automatización de formularios</span>
                                            </li>
                                            <li class="feature-item">
                                                ${unsafeHTML(images.svg.checkCircle)}
                                                <span>Automatización de correos</span>
                                            </li>
                                            <li class="feature-item">
                                                ${unsafeHTML(images.svg.checkCircle)}
                                                <span>Notificaciones inmediatas</span>
                                            </li>
                                        </ul>
                                        <button @click=${() => this.clickPlan('Hola, quiero el Plan Premium')} class="btn-secondary">
                                            <span>Empezar</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </main>
                </div>
            </div>
        `;
    }
}
