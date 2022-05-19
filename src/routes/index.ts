import { IconType } from 'react-icons';
import {
  FiHome,
  FiTrendingUp,
  FiCalendar,
  FiAlertOctagon,
  FiList,
  FiMap,
  FiZoomIn,
} from 'react-icons/fi';

type RouteT =
  | 'home'
  | 'login'
  | 'searchOrders'
  | 'manageOrders'
  | 'booking'
  | 'rules'
  | 'softland'
  | 'operation'
  | 'manageExams';

const routes: Record<RouteT, string> = {
  home: '/',
  login: '/ingreso',
  searchOrders: '/buscar-ordenes',
  manageOrders: '/gestion-ordenes',
  booking: '/agenda',
  rules: '/reglas',
  softland: '/registros-softland',
  operation: '/reporte-operaciones',
  manageExams: '/gestion-examenes',
};

type LinkItemT = {
  name: string;
  icon: IconType;
  href: string;
};

export const LinkItems: LinkItemT[] = [
  { name: 'Dashboard', icon: FiHome, href: routes.home },
  { name: 'Busqueda de ordenes', icon: FiZoomIn, href: routes.searchOrders },
  { name: 'Gestion de Ordenes', icon: FiTrendingUp, href: routes.manageOrders },
  { name: 'Administrar agenda', icon: FiCalendar, href: routes.booking },
  { name: 'Reglas activas', icon: FiAlertOctagon, href: routes.rules },
  { name: 'Registros Softland', icon: FiList, href: routes.softland },
  { name: 'Reporte operaciones', icon: FiMap, href: routes.operation },
  { name: 'Administrar examenes', icon: FiMap, href: routes.manageExams },
];

export default routes;
