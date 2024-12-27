import { TRole } from "@/interfaces/user";

export interface ISidebarItem {
  _id: string;
  href: string;
  label: string;
  icon: any;
  visible: TRole[];
  children?: ISidebarItem[];
}

export interface ISidebarItems {
  _id: string;
  label: string;
  items: ISidebarItem[];
}
