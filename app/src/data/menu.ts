import type { CopyKey } from '../i18n';

export type Category = 'espresso' | 'milk' | 'filter' | 'cold' | 'tea' | 'pastries';
export type Diet = 'vegan' | 'oat' | 'decaf';
export type ListColumn = 'espresso' | 'milk' | 'filterCold' | 'tea';

export type MenuItem = {
  id: string;
  price: number;
  categories: Category[];
  /** vegan = as served; oat = made with or available with oat milk; decaf = decaf or caffeine-free. */
  diet: Diet[];
  /** Column in the full price list; omitted for items that only appear as cards. */
  list?: ListColumn;
  card?: { image: string; tag: CopyKey; name?: CopyKey };
};

// Featured cards appear in this order; the price list keeps the spec's column order.
export const MENU: MenuItem[] = [
  { id: 'flatWhite', price: 4.2, categories: ['milk'], diet: ['oat', 'decaf'], list: 'milk', card: { image: 'flat-white.webp', tag: 'tag.loved', name: 'card.flatWhite.name' } },
  { id: 'oatLatte', price: 4.6, categories: ['milk'], diet: ['vegan', 'oat', 'decaf'], card: { image: 'barista-latte-art.webp', tag: 'tag.vegan' } },
  { id: 'v60', price: 5.0, categories: ['filter'], diet: ['vegan'], list: 'filterCold', card: { image: 'v60-pour-over.webp', tag: 'tag.bean' } },
  { id: 'kanelsnegl', price: 3.8, categories: ['pastries'], diet: [], card: { image: 'kanelsnegl.webp', tag: 'tag.pairs' } },
  { id: 'cappuccino', price: 4.0, categories: ['milk'], diet: ['oat', 'decaf'], list: 'milk', card: { image: 'cappuccino.webp', tag: 'tag.classic' } },
  { id: 'cortado', price: 3.6, categories: ['espresso', 'milk'], diet: ['oat', 'decaf'], card: { image: 'cortado.webp', tag: 'tag.short' } },
  { id: 'icedOatLatte', price: 4.8, categories: ['cold', 'milk'], diet: ['vegan', 'oat', 'decaf'], card: { image: 'iced-oat-latte.webp', tag: 'tag.vegan' } },
  { id: 'coldBrewTonic', price: 5.2, categories: ['cold'], diet: ['vegan'], card: { image: 'cold-brew-tonic.webp', tag: 'tag.new' } },

  { id: 'espresso', price: 2.8, categories: ['espresso'], diet: ['vegan', 'decaf'], list: 'espresso' },
  { id: 'doppio', price: 3.4, categories: ['espresso'], diet: ['vegan', 'decaf'], list: 'espresso' },
  { id: 'americano', price: 3.4, categories: ['espresso'], diet: ['vegan', 'decaf'], list: 'espresso' },
  { id: 'macchiato', price: 3.2, categories: ['espresso', 'milk'], diet: ['oat', 'decaf'], list: 'espresso' },
  { id: 'latte', price: 4.4, categories: ['milk'], diet: ['oat', 'decaf'], list: 'milk' },
  { id: 'mocha', price: 4.8, categories: ['milk'], diet: ['oat', 'decaf'], list: 'milk' },
  { id: 'batchBrew', price: 3.2, categories: ['filter'], diet: ['vegan'], list: 'filterCold' },
  { id: 'coldBrew', price: 4.2, categories: ['cold'], diet: ['vegan'], list: 'filterCold' },
  { id: 'icedLatte', price: 4.8, categories: ['cold', 'milk'], diet: ['oat', 'decaf'], list: 'filterCold' },
  { id: 'chai', price: 4.4, categories: ['tea'], diet: ['oat'], list: 'tea' },
  { id: 'matcha', price: 4.8, categories: ['tea'], diet: ['oat'], list: 'tea' },
  { id: 'hotChocolate', price: 4.0, categories: ['tea'], diet: ['oat', 'decaf'], list: 'tea' },
  { id: 'mintTea', price: 3.2, categories: ['tea'], diet: ['vegan', 'decaf'], list: 'tea' },
];

export const CATEGORIES: Category[] = ['espresso', 'milk', 'filter', 'cold', 'tea', 'pastries'];
export const DIETS: Diet[] = ['vegan', 'oat', 'decaf'];
export const LIST_COLUMNS: ListColumn[] = ['espresso', 'milk', 'filterCold', 'tea'];
