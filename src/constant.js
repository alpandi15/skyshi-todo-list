import IconSortList from './statics/icons/sort.svg'
import IconSortDown from './statics/icons/sort-down.svg'
import IconSortUp from './statics/icons/sort-up.svg'
import IconSortZa from './statics/icons/sort-za.svg'
import IconSortAz from './statics/icons/sort-az.svg'

export const API_HOST = 'https://todo.api.devcode.gethired.id'
export const EMAIL = 'm.alpandi57@gmail.com'

export const LIST_PRIORITY = [
  {id: 1, priority: 'very-high', title: 'Very High', color: 'bg-[#ED4C5C]'},
  {id: 2, priority: 'high', title: 'High', color: 'bg-[#F8A541]'},
  {id: 3, priority: 'medium', title: 'Medium', color: 'bg-[#00A790]'},
  {id: 4, priority: 'low', title: 'Low', color: 'bg-[#428BC1]'},
  {id: 5, priority: 'very-low', title: 'Very Low', color: 'bg-[#8942C1]'},
]

export const SORT_LIST = [
  {id: 1,title: 'Terbaru', icon: IconSortDown},
  {id: 2,title: 'Terlama', icon: IconSortUp},
  {id: 3,title: 'A-Z', icon: IconSortAz},
  {id: 4,title: 'Z-A', icon: IconSortZa},
  {id: 5,title: 'Belum Selesai', icon: IconSortList},
]