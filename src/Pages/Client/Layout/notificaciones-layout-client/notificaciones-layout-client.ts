import { LitElement, css, html, unsafeCSS } from 'lit';
import { customElement } from 'lit/decorators.js';
import styles from "./notificaciones-layout-client.css?inline"
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import images from '../../../../images';
@customElement('notificaciones-layout-client')
export class NotificacionesLayoutClient extends LitElement {
    static styles = css`${unsafeCSS(styles)}`
    render() {
        return html`
            <div class="body">
                <!-- Top App Bar -->
                <div class="app-bar">
                    <h1 class="app-bar-title">Notifications</h1>
                    <button class="mark-read-btn">Mark all as read</button>
                </div>
                <div class="container">

                    <div class="content">
                        <!-- Grouping Header -->
                        <!-- <h4 class="group-header">Today</h4> -->

                        <!-- Accordion Notification Item -->
                        <details class="notification-item accordion" open>
                            <summary class="notification-summary">
                                <div class="notification-icon-wrapper">
                                    <div class="notification-icon icon-chat">
                                        ${unsafeHTML(images.svg.chat)}
                                    </div>
                                    <span class="notification-badge"></span>
                                </div>
                                <div class="notification-content">
                                    <p class="notification-title">New Message from Alex</p>
                                    <p class="notification-description">Hey, are you free to talk later today?</p>
                                </div>
                                <div class="notification-time">
                                    <p>5m ago</p>
                                </div>
                            </summary>
                            <div class="notification-details">
                                <p>Hey, are you free to talk later today? I wanted to discuss the new project proposal
                                    and get your feedback on the latest designs.</p>
                                <div class="notification-actions">
                                    <button class="btn-primary">Reply</button>
                                    <button class="btn-secondary">Archive</button>
                                </div>
                            </div>
                        </details>

                        <!-- List Item Notification -->
                        <div class="notification-item list-item">
                            <div class="notification-icon-wrapper">
                                <div class="notification-avatar"
                                    style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuCPfzcWJmSpBAYy24WmE_TpiTrEAaW-bsHB96A9bOZpuBiVWZnvZMRLFOd8UG3TC4MG1k00dQYL2m3nuBQ6ckvMAm7lxExxtMiltQuHhcxtH6DsnbAkPPHkrZH-tF2Fzf2dgVkfympTLKD8wDTQN_47Ax-jzLUxzdDPEiNQKQe86-3YguScf94mwKDyC3Grb-yZ_bGRJMUlpaDqiw2d2cebWTFLHUo18M1bp5TveyBb4eFoDDDo-seX_5C2b62hHTrtW42cTW-xgaM");'>
                                </div>
                            </div>
                            <div class="notification-content">
                                <p class="notification-title">New Follower</p>
                                <p class="notification-description">Jenna started following you.</p>
                            </div>
                            <div class="notification-time">
                                <p>1h ago</p>
                            </div>
                        </div>

                        <!-- Grouping Header -->
                        <!-- <h4 class="group-header">Yesterday</h4> -->

                        <!-- List Item Notification -->
                        <div class="notification-item list-item">
                            <div class="notification-icon-wrapper">
                                <div class="notification-icon icon-success">
                                    ${unsafeHTML(images.svg.checkCircle)}
                                </div>
                            </div>
                            <div class="notification-content">
                                <p class="notification-title">Payment Successful</p>
                                <p class="notification-description">Your payment of $49.99 to Notion was successful.</p>
                            </div>
                            <div class="notification-time">
                                <p>1:30 PM</p>
                            </div>
                        </div>

                        <!-- Accordion Notification Item -->
                        <details class="notification-item accordion">
                            <summary class="notification-summary">
                                <div class="notification-icon-wrapper">
                                    <div class="notification-icon icon-shipping">
                                        ${unsafeHTML(images.svg.localShipping)}
                                    </div>
                                </div>
                                <div class="notification-content">
                                    <p class="notification-title">Your order has shipped!</p>
                                    <p class="notification-description">Track your package to see the estimated delivery
                                        date.</p>
                                </div>
                                <div class="notification-time">
                                    <p>11:15 AM</p>
                                </div>
                            </summary>
                            <div class="notification-details">
                                <p>Your order #123-456789 from "Modern Designs Co." has been shipped and is on its way.
                                    You can expect it to arrive within 3-5 business days.</p>
                                <div class="notification-actions">
                                    <button class="btn-primary">View Details</button>
                                </div>
                            </div>
                        </details>

                        <!-- Empty State -->
                        <div class="empty-state">
                            <div class="empty-state-icon">
                                ${unsafeHTML(images.svg.notificationsOff)}
                            </div>
                            <h3 class="empty-state-title">You're all caught up!</h3>
                            <p class="empty-state-description">Check back later for new notifications.</p>
                        </div>
                    </div>
                </div>
            </div>`;
    }
}
