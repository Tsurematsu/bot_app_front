import { LitElement, css, html, unsafeCSS } from 'lit';
import { customElement } from 'lit/decorators.js';
import styles from "./calendario-layout-client.css?inline"
@customElement('calendario-layout-client')
export class CalendarioLayoutClient extends LitElement {
  static styles = css`${unsafeCSS(styles)}`;
  render() {
    return html`
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet" />

      <div class="calendar-container">
        <!-- Header -->
        <header class="app-header">
          <div class="header-content">
            <button class="icon-button" aria-label="Menú">
              <span class="material-symbols-outlined">menu</span>
            </button>
            <h2 class="header-title">Junio 2024</h2>
            <button class="today-button">Hoy</button>
          </div>
        </header>

        <!-- Main Content -->
        <main class="main-content">
          <!-- View Switcher -->
          <div class="view-switcher">
            <div class="segment-container">
              <label class="segment-label">
                <span>Mes</span>
                <input type="radio" name="view-switcher" value="Month" checked />
              </label>
              <label class="segment-label">
                <span>Semana</span>
                <input type="radio" name="view-switcher" value="Week" />
              </label>
              <label class="segment-label">
                <span>Día</span>
                <input type="radio" name="view-switcher" value="Day" />
              </label>
            </div>
          </div>

          <!-- Calendar Picker -->
          <div class="calendar-picker">
            <div class="calendar-content">
              <div class="calendar-nav">
                <button class="icon-button" aria-label="Mes anterior">
                  <span class="material-symbols-outlined">chevron_left</span>
                </button>
                <p class="calendar-nav-title">Junio 2024</p>
                <button class="icon-button" aria-label="Mes siguiente">
                  <span class="material-symbols-outlined">chevron_right</span>
                </button>
              </div>

              <div class="calendar-grid">
                <!-- Day Headers -->
                <p class="day-header">L</p>
                <p class="day-header">M</p>
                <p class="day-header">X</p>
                <p class="day-header">J</p>
                <p class="day-header">V</p>
                <p class="day-header">S</p>
                <p class="day-header">D</p>

                <!-- Days -->
                ${this.renderCalendarDays()}
              </div>
            </div>
          </div>

          <div class="divider"></div>

          <!-- Section Header -->
          <h3 class="section-header">Martes, 18 de Junio</h3>

          <!-- Event List -->
          <div class="event-list">
            ${this.renderEvents()}
          </div>
        </main>

        <!-- FAB -->
        <button class="fab" aria-label="Agregar evento">
          <span class="material-symbols-outlined">add</span>
        </button>
      </div>
    `;
  }

  private renderCalendarDays() {
    const days = [
      { num: 1, muted: true, start: 6 },
      { num: 2, muted: true },
      { num: 3 }, { num: 4 }, { num: 5 }, { num: 6 }, { num: 7 },
      { num: 8 }, { num: 9 }, { num: 10 },
      { num: 11, event: 'red' },
      { num: 12 }, { num: 13 }, { num: 14 }, { num: 15 }, { num: 16 },
      { num: 17, today: true },
      { num: 18, selected: true },
      { num: 19, event: 'green' },
      { num: 20 }, { num: 21 }, { num: 22 },
      { num: 23, event: 'red' },
      { num: 24 },
      { num: 25, event: 'yellow' },
      { num: 26 }, { num: 27 }, { num: 28 }, { num: 29 }, { num: 30 }
    ];

    return days.map(day => html`
      <button 
        class="day-button ${day.muted ? 'muted' : ''} ${day.today ? 'today' : ''}"
        style="${day.start ? `grid-column-start: ${day.start}` : ''}"
      >
        <div class="day-cell ${day.today ? 'today-ring' : ''} ${day.selected ? 'selected' : ''}">
          ${day.num}
          ${day.event ? html`<div class="event-indicator ${day.event}"></div>` : ''}
        </div>
      </button>
    `);
  }

  private renderEvents() {
    const events = [
      {
        time: '10:00 AM',
        title: 'Reunión de equipo',
        description: 'Discutir el progreso del sprint.',
        color: 'green'
      },
      {
        time: '01:00 PM',
        title: 'Llamada con cliente',
        color: 'red'
      },
      {
        time: '03:30 PM',
        title: 'Revisión de diseño',
        description: 'Feedback sobre los nuevos mockups.',
        color: 'yellow'
      }
    ];

    return events.map(event => html`
      <div class="event-item">
        <p class="event-time">${event.time}</p>
        <div class="event-divider"></div>
        <div class="event-card">
          <div class="event-header">
            <div class="event-color-bar ${event.color}"></div>
            <p class="event-title">${event.title}</p>
          </div>
          ${event.description ? html`
            <p class="event-description">${event.description}</p>
          ` : ''}
        </div>
      </div>
    `);
  }
}