export interface CategoryStyle {
  bg: string;
  /** Path to this category's icon file in public/icons/. */
  icon: string;
}

const DEFAULT_STYLE: CategoryStyle = {
  bg: '#F1F5F9',
  icon: '/icons/uncategorized.svg',
};

// One icon per real category name — not a rotating generic palette, so each
// icon is actually meaningful for its category.
const STYLES: Record<string, CategoryStyle> = {
  'How Tos': { bg: '#DBEAFE', icon: '/icons/how-tos.svg' },
  'Overview Guide': { bg: '#EDE9FE', icon: '/icons/overview-guide.svg' },
  Features: { bg: '#FEF3C7', icon: '/icons/features.svg' },
  Uncategorized: { bg: '#F1F5F9', icon: '/icons/uncategorized.svg' },
  'Invoicing and Order Management': { bg: '#DCFCE7', icon: '/icons/invoicing-order-management.svg' },
  'Lead Management': { bg: '#FFEDD5', icon: '/icons/lead-management.svg' },
  'Project PnL and Expense Management': { bg: '#FFE4E6', icon: '/icons/project-pnl-expense-management.svg' },
  'Customer Service Helpdesk': { bg: '#E0F2FE', icon: '/icons/customer-service-helpdesk.svg' },
  'Indian Invoicing': { bg: '#ECFCCB', icon: '/icons/indian-invoicing.svg' },
  'Tips & Tricks': { bg: '#FAE8FF', icon: '/icons/tips-and-tricks.svg' },
};

export function getCategoryStyle(name: string): CategoryStyle {
  return STYLES[name] ?? DEFAULT_STYLE;
}
