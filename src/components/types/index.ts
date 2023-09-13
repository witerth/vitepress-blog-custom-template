export interface MenuItem {
  title: string;
  link: string;
  level: number;
  children?: MenuItem[];
}
