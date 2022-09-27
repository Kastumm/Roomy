interface IRoomCardComponent {
  name: string;
  status: string;
  capacity: number;
  activeMeetings: number;
  permision: string;
  actionButtonAdmin?: any;
  actionButton: any;
}

export default IRoomCardComponent;
