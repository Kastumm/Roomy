class CalendarEvent {
  title: string;
  start: Date;
  end: Date;
  constructor(title: string, start: Date, end: Date) {
    this.title = title;
    this.start = start;
    this.end = end;
  }
}

export default CalendarEvent;
