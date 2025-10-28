import { LitElement, css, html, unsafeCSS } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import styles from "./calendario-layout-client.css?inline"
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import images from '../../../../images';

interface Evento {
  date: string; // ISO string for time (hora)
  name: string;
  description?: string;
}

interface DayData {
  date: string; // ISO string for date (solo día, mes, año)
  events: Evento[];
}

type ViewMode = 'Month' | 'Week' | 'Day';

@customElement('calendario-layout-client')
export class CalendarioLayoutClient extends LitElement {
  static styles = css`${unsafeCSS(styles)}`;

  @state()
  private calendarData: DayData[] = [];

  @state()
  private selectedDate: string = '';

  @state()
  private currentMonth: Date = new Date();


  constructor() {
    super();
    // Inicializar con fecha actual
    const today = new Date();
    this.currentMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    this.selectedDate = this.getDateString(today);
    
    // Datos de ejemplo
    this.initializeExampleData();
  }

  private initializeExampleData() {
    const today = new Date();
    const todayStr = this.getDateString(today);
    
    // Crear un evento para hoy
    this.calendarData = [
      {
        date: todayStr,
        events: [
          {
            date: this.setTimeToDate(today, 10, 0),
            name: 'Reunión de equipo',
            description: 'Discutir el progreso del sprint.'
          },
          {
            date: this.setTimeToDate(today, 14, 30),
            name: 'Llamada con cliente',
            description: 'Seguimiento de proyecto'
          }
        ]
      }
    ];
  }

  // Helper para crear fecha con hora específica
  private setTimeToDate(date: Date, hours: number, minutes: number): string {
    const d = new Date(date);
    d.setHours(hours, minutes, 0, 0);
    return d.toISOString();
  }

  render() {
    return html`
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet" />

      <div class="calendar-container">
        <!-- Header -->
        <header class="app-header">
          <div class="header-content">
            <button class="icon-button" aria-label="Menú">
              ${unsafeHTML(images.svg.settings)}
            </button>
            <h2 class="header-title">${this.getMonthYearString(this.currentMonth)}</h2>
            <button class="today-button" @click=${this.goToToday}>Hoy</button>
          </div>
        </header>
          <!-- Calendar Picker -->
          <div class="calendar-picker">
            <div class="calendar-content">
              <div class="calendar-nav">
                <button class="icon-button" aria-label="Mes anterior" @click=${this.previousMonth}>
                  ${unsafeHTML(images.svg.chevronLeft)}
                </button>
                <p class="calendar-nav-title">${this.getMonthYearString(this.currentMonth)}</p>
                <button class="icon-button" aria-label="Mes siguiente" @click=${this.nextMonth}>
                  ${unsafeHTML(images.svg.chevronRight)}
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
          <h3 class="section-header">${this.getFormattedSelectedDate()}</h3>

          <!-- Event List -->
          <div class="event-list">
            ${this.renderEvents()}
          </div>
        </main>
      </div>
    `;
  }

  // Navegación de calendario
  private previousMonth() {
    const newMonth = new Date(this.currentMonth);
    newMonth.setMonth(newMonth.getMonth() - 1);
    this.currentMonth = newMonth;
  }

  private nextMonth() {
    const newMonth = new Date(this.currentMonth);
    newMonth.setMonth(newMonth.getMonth() + 1);
    this.currentMonth = newMonth;
  }

  private goToToday() {
    const today = new Date();
    this.currentMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    this.selectedDate = this.getDateString(today);
  }

  // Selección de día
  private selectDay(date: Date) {
    this.selectedDate = this.getDateString(date);
    //console.log('Día seleccionado:', this.selectedDate);
    //console.log('Eventos encontrados:', this.getEventsForDate(this.selectedDate));
  }

  // Obtener string de fecha (solo día, mes, año a las 00:00:00)
  private getDateString(date: Date): string {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    return d.toISOString();
  }

  // Obtener eventos de un día específico
  private getEventsForDate(dateStr: string): Evento[] {
    //console.log('Buscando eventos para:', dateStr);
    //console.log('Datos del calendario:', this.calendarData);
    
    const dayData = this.calendarData.find(d => {
      //console.log('Comparando:', d.date, 'con', dateStr);
      return d.date === dateStr;
    });
    
    return dayData ? dayData.events : [];
  }

  // Verificar si un día tiene eventos
  private hasEvents(date: Date): string | null {
    const dateStr = this.getDateString(date);
    const events = this.getEventsForDate(dateStr);

    if (events.length === 0) return null;

    // Retornar color basado en cantidad de eventos
    if (events.length === 1) return 'green';
    if (events.length === 2) return 'yellow';
    return 'red';
  }

  // Formatear fecha seleccionada
  private getFormattedSelectedDate(): string {
    const date = new Date(this.selectedDate);
    const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

    return `${days[date.getDay()]}, ${date.getDate()} de ${months[date.getMonth()]}`;
  }

  // Obtener string de mes y año
  private getMonthYearString(date: Date): string {
    const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    return `${months[date.getMonth()]} ${date.getFullYear()}`;
  }

  // Renderizar días del calendario
  private renderCalendarDays() {
    const year = this.currentMonth.getFullYear();
    const month = this.currentMonth.getMonth();

    // Primer día del mes y último día
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    // Día de la semana del primer día (0 = domingo, ajustamos a lunes = 0)
    let firstDayOfWeek = firstDay.getDay() - 1;
    if (firstDayOfWeek === -1) firstDayOfWeek = 6;

    // Días del mes anterior a mostrar
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    const daysFromPrevMonth = firstDayOfWeek;

    const days = [];
    const today = new Date();
    const todayStr = this.getDateString(today);

    // Días del mes anterior
    for (let i = daysFromPrevMonth; i > 0; i--) {
      const date = new Date(year, month - 1, prevMonthLastDay - i + 1);
      days.push({
        date,
        num: prevMonthLastDay - i + 1,
        muted: true,
        start: i === daysFromPrevMonth ? firstDayOfWeek + 1 : undefined
      });
    }

    // Días del mes actual
    for (let i = 1; i <= lastDay.getDate(); i++) {
      const date = new Date(year, month, i);
      const dateStr = this.getDateString(date);
      days.push({
        date,
        num: i,
        muted: false,
        today: dateStr === todayStr,
        selected: dateStr === this.selectedDate,
        event: this.hasEvents(date)
      });
    }

    // Días del mes siguiente
    const remainingDays = 42 - days.length; // 6 semanas x 7 días
    for (let i = 1; i <= remainingDays; i++) {
      const date = new Date(year, month + 1, i);
      days.push({
        date,
        num: i,
        muted: true
      });
    }

    return days.map(day => html`
      <button 
        class="day-button ${day.muted ? 'muted' : ''} ${day.today ? 'today' : ''}"
        style="${day.start ? `grid-column-start: ${day.start}` : ''}"
        @click=${() => this.selectDay(day.date)}
      >
        <div class="day-cell ${day.today ? 'today-ring' : ''} ${day.selected ? 'selected' : ''}">
          ${day.num}
          ${day.event ? html`<div class="event-indicator ${day.event}"></div>` : ''}
        </div>
      </button>
    `);
  }

  // Renderizar eventos del día seleccionado
  private renderEvents() {
    const events = this.getEventsForDate(this.selectedDate);

    if (events.length === 0) {
      return html`
        <div style="text-align: center; padding: 2rem; color: #666;">
          <p>No hay eventos para este día</p>
        </div>
      `;
    }

    return events.map(event => {
      const eventDate = new Date(event.date);
      const hours = eventDate.getHours();
      const minutes = eventDate.getMinutes();
      const ampm = hours >= 12 ? 'PM' : 'AM';
      const displayHours = hours % 12 || 12;
      const time = `${displayHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${ampm}`;

      // Determinar color basado en la hora
      let color = 'green';
      if (hours < 12) color = 'green';
      else if (hours < 15) color = 'red';
      else color = 'yellow';

      return html`
        <div class="event-item">
          <p class="event-time">${time}</p>
          <div class="event-divider"></div>
          <div class="event-card">
            <div class="event-header">
              <div class="event-color-bar ${color}"></div>
              <p class="event-title">${event.name}</p>
            </div>
            ${event.description ? html`
              <p class="event-description">${event.description}</p>
            ` : ''}
          </div>
        </div>
      `;
    });
  }

  // Agregar nuevo evento
  private addEvent() {
    //console.log('Agregar nuevo evento para:', this.selectedDate);

    // Crear hora actual + 1 hora
    const selectedDate = new Date(this.selectedDate);
    const eventTime = new Date(selectedDate);
    eventTime.setHours(new Date().getHours() + 1, 0, 0, 0);

    const newEvent: Evento = {
      date: eventTime.toISOString(),
      name: 'Nuevo evento',
      description: 'Descripción del evento'
    };

    this.addEventToCalendar(this.selectedDate, newEvent);
  }

  // Método helper para agregar eventos
  private addEventToCalendar(dateStr: string, event: Evento) {
    const existingDay = this.calendarData.find(d => d.date === dateStr);

    if (existingDay) {
      existingDay.events.push(event);
      // Ordenar eventos por hora
      existingDay.events.sort((a, b) => 
        new Date(a.date).getTime() - new Date(b.date).getTime()
      );
    } else {
      this.calendarData.push({
        date: dateStr,
        events: [event]
      });
    }

    // Forzar actualización
    this.calendarData = [...this.calendarData];
    //console.log('Evento agregado. Datos actualizados:', this.calendarData);
  }

  // Método helper para eliminar eventos
  public removeEvent(dateStr: string, eventIndex: number) {
    const dayData = this.calendarData.find(d => d.date === dateStr);
    if (dayData) {
      dayData.events.splice(eventIndex, 1);
      if (dayData.events.length === 0) {
        this.calendarData = this.calendarData.filter(d => d.date !== dateStr);
      } else {
        this.calendarData = [...this.calendarData];
      }
    }
  }
}