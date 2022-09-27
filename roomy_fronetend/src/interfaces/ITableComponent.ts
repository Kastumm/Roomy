interface ITableComponent {
  style?: string;
  columns: string[];
  data: Object[];
  keys: string[];
  keyRenderer?: any;
  unit: string[];
}

export default ITableComponent;
