import { LitElement, css, html, unsafeCSS, type CSSResultGroup } from 'lit';
import { customElement } from 'lit/decorators.js';
import styles from "./plan-layout-client.css?inline"
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import images from '../../../../images';
@customElement('plan-layout-client')
export class PlanLayoutClient extends LitElement {
    static styles = css`${unsafeCSS(styles)}`
    static properties = {
        planName: { type: String },
        planDescription: { type: String },
        nextBillingDate: { type: String },
        price: { type: String },
        apiCalls: { type: Object },
        storage: { type: Object },
        bandwidth: { type: Object },
        userSeats: { type: Object }
    };
    planName: string;
    planDescription: string;
    nextBillingDate: string;
    price: string;
    apiCalls: { current: number; total: number; percentage: number; };
    storage: { current: string; total: string; percentage: number; };
    bandwidth: { current: string; total: string; percentage: number; };
    userSeats: { current: number; total: number; percentage: number; };

    constructor() {
        super();
        this.planName = 'Plan Mensual Pro';
        this.planDescription = 'Acceso a todas las funciones premium y soporte dedicado.';
        this.nextBillingDate = '25 de Oct, 2024';
        this.price = '$29.99';
        this.apiCalls = { current: 250, total: 500, percentage: 50 };
        this.storage = { current: '3.5GB', total: '10GB', percentage: 35 };
        this.bandwidth = { current: '78GB', total: '100GB', percentage: 78 };
        this.userSeats = { current: 4, total: 5, percentage: 80 };
    }
    render() {
        return html`
                <!-- Barra Superior -->
                <header class="top-bar">
                    <div class="icon-container">
                        ${unsafeHTML(images.svg.arrowBack)}
                    </div>
                    <h1 class="header-title">Mi Plan</h1>
                    <div class="settings-container">
                        <button class="settings-btn">
                            ${unsafeHTML(images.svg.settings)}
                        </button>
                    </div>
                </header>
                  <div class="plan-container">

                      <main class="main-content">
                          <!-- Tarjeta Principal del Plan -->
                          <section class="plan-card">
                              <div class="plan-info">
                                  <p class="plan-title">${this.planName}</p>
                                  <p class="plan-description">${this.planDescription}</p>
                                  <div class="plan-manage">
                                      <p class="manage-text">Gestionar Plan</p>
                                      ${unsafeHTML(images.svg.arrowBack)}
                                  </div>
                              </div>
                          </section>

                          <!-- Información de Facturación -->
                          <section class="billing-info">
                              <div class="billing-left">
                                  <div class="icon-box">
                                      ${unsafeHTML(images.svg.calendarMonth)}

                                  </div>
                                  <p class="billing-text">Próxima facturación el ${this.nextBillingDate}</p>
                              </div>
                              <div class="billing-price">
                                  <p>${this.price}</p>
                              </div>
                          </section>

                          <!-- Sección de Consumo de Productos -->
                          <section class="consumption-section">
                              <h2 class="section-title">Consumo de Productos</h2>
                              <div class="consumption-items">

                                  <!-- Llamadas API -->
                                  <div class="consumption-item">
                                      <div class="item-content">
                                          <div class="icon-box">
                                              ${unsafeHTML(images.svg.api)}
                                          </div>
                                          <div class="item-details">
                                              <div class="item-header">
                                                  <p class="item-name">Llamadas API</p>
                                                  <p class="item-usage">${this.apiCalls.current} /
                                                      ${this.apiCalls.total}</p>
                                              </div>
                                              <div class="progress-bar">
                                                  <div class="progress-fill"
                                                      style="width: ${this.apiCalls.percentage}%;"></div>
                                              </div>
                                          </div>
                                      </div>
                                  </div>

                                  <!-- Almacenamiento -->
                                  <div class="consumption-item">
                                      <div class="item-content">
                                          <div class="icon-box">
                                              ${unsafeHTML(images.svg.database)}
                                          </div>
                                          <div class="item-details">
                                              <div class="item-header">
                                                  <p class="item-name">Almacenamiento</p>
                                                  <p class="item-usage">${this.storage.current} / ${this.storage.total}
                                                  </p>
                                              </div>
                                              <div class="progress-bar">
                                                  <div class="progress-fill"
                                                      style="width: ${this.storage.percentage}%;"></div>
                                              </div>
                                          </div>
                                      </div>
                                  </div>

                                  <!-- Ancho de Banda -->
                                  <div class="consumption-item">
                                      <div class="item-content">
                                          <div class="icon-box">
                                              ${unsafeHTML(images.svg.syncAlt)}
                                          </div>
                                          <div class="item-details">
                                              <div class="item-header">
                                                  <p class="item-name">Ancho de Banda</p>
                                                  <p class="item-usage">${this.bandwidth.current} /
                                                      ${this.bandwidth.total}</p>
                                              </div>
                                              <div class="progress-bar">
                                                  <div class="progress-fill"
                                                      style="width: ${this.bandwidth.percentage}%;"></div>
                                              </div>
                                          </div>
                                      </div>
                                  </div>

                                  <!-- Usuarios -->
                                  <div class="consumption-item">
                                      <div class="item-content">
                                          <div class="icon-box">
                                              ${unsafeHTML(images.svg.group)}
                                          </div>
                                          <div class="item-details">
                                              <div class="item-header">
                                                  <p class="item-name">Usuarios</p>
                                                  <p class="item-usage">${this.userSeats.current} /
                                                      ${this.userSeats.total}</p>
                                              </div>
                                              <div class="progress-bar">
                                                  <div class="progress-fill"
                                                      style="width: ${this.userSeats.percentage}%;"></div>
                                              </div>
                                          </div>
                                      </div>
                                  </div>

                              </div>
                          </section>
                      </main>
                  </div>
        `;
    }
}
