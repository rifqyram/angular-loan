export interface SidenavSetting {
  path: string;
  icon: string;
  label: string;
}

export const sidenavSetting: SidenavSetting[] = [
  {
    path: '/setting',
    icon: 'bi bi-person',
    label: 'Profile'
  },
  {
    path: 'document',
    icon: 'bi bi-file-earmark',
    label: 'Document'
  }
]
