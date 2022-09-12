export interface NavbarData {
  path: string;
  icon: string;
  label: string;
}

export const navbarData: NavbarData[] = [
  {
    path: '/',
    icon: 'bi bi-house',
    label: 'Home'
  },
  {
    path: '/loan',
    icon: 'bi bi-cash',
    label: 'Loan'
  },
  {
    path: '/about',
    icon: 'bi bi-info',
    label: 'About'
  },
]
