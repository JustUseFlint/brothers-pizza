// All facts here are sourced — see research/notes.md
export const PHONE = '(765) 361-1800';
export const TEL = 'tel:+17653611800';
export const ADDR1 = '205 E Market St';
export const ADDR2 = 'Crawfordsville, IN 47933';
export const FB = 'https://www.facebook.com/BrothersPizzaCompany/';
export const GIFT = 'https://brotherspizzaco.hrpos.heartland.us/';
export const JOBS = 'https://docs.google.com/forms/d/e/1FAIpQLSfJWmHklpPKDOnY0DfpQU1aAgbxYVV4dkMtBmRUc8QBMfTeXg/viewform';
export const GMAPS = 'https://www.google.com/maps/search/?api=1&query=Brothers+Pizza+Company+205+E+Market+St+Crawfordsville+IN+47933';
export const GMAP_EMBED = 'https://www.google.com/maps/embed?origin=mfe&pb=!1m12!1m8!1m3!1d6108.924598790928!2d-86.899485!3d40.042781!3m2!1i1024!2i768!4f13.1!2m1!1s205+E+Market+St,+Crawfordsville,+IN+47933,+USA!6i16!3m1!1sen-US';
export const MENU_SOURCE = 'Prices from Brothers Pizza’s own online-ordering menu (Heartland), checked November 9, 2026. Online ordering is switched off right now, so please confirm prices when you call.';
// 0=Sun … 6=Sat ; [open, close] in minutes after midnight, America/Indianapolis
export const HOURS = [[16 * 60, 21 * 60], [11 * 60, 21 * 60], [11 * 60, 21 * 60], [11 * 60, 21 * 60], [11 * 60, 21 * 60], [11 * 60, 21 * 60], [11 * 60, 21 * 60]];

export const SIZES = [
  { id: 's6', label: '6″', name: 'Personal', base: 4.75, top: 0.50, cheese: null },
  { id: 's10', label: '10″', name: 'Small', base: 8.55, top: 1.35, cheese: 1.25 },
  { id: 's12', label: '12″', name: 'Medium', base: 10.55, top: 1.55, cheese: 1.45 },
  { id: 's14', label: '14″', name: 'Large', base: 12.55, top: 1.75, cheese: 1.65 },
  { id: 's16', label: '16″', name: 'Extra large', base: 17.05, top: 2.05, cheese: 1.95 },
];
export const TOPPINGS = [
  ['pepperoni', 'Pepperoni', 'meat'], ['sausage', 'Sausage', 'meat'], ['ham', 'Ham', 'meat'], ['bacon', 'Bacon', 'meat'], ['chicken', 'Chicken', 'meat'],
  ['mushrooms', 'Mushrooms', 'veg'], ['green-peppers', 'Green peppers', 'veg'], ['red-onions', 'Red onions', 'veg'], ['black-olives', 'Black olives', 'veg'],
  ['tomatoes', 'Tomatoes', 'veg'], ['jalapenos', 'Jalapeños', 'veg'], ['banana-peppers', 'Banana peppers', 'veg'], ['pineapple', 'Pineapple', 'veg'],
];
// specialty charge added to base, by size [6,10,12,14,16]
const UP = { hi: [5, 5, 5, 5, 5.5], mid: [3, 3, 3, 3, 3.5], lo: [2, 2, 2, 2, 2.5] };
const sp = tier => SIZES.map((s, i) => +(s.base + UP[tier][i]).toFixed(2));
export const SPECIALTY = [
  { id: 'supreme', name: 'Supreme', desc: 'Sausage, pepperoni, green peppers, red onions and mushrooms.', tops: ['sausage', 'pepperoni', 'green-peppers', 'red-onions', 'mushrooms'], prices: sp('hi'), photo: 'real-supreme' },
  { id: 'meatzza', name: 'Meatzza', desc: 'Bacon, sausage, ham and pepperoni.', tops: ['bacon', 'sausage', 'ham', 'pepperoni'], prices: sp('hi') },
  { id: 'cheese-boss', name: 'Cheese Boss', desc: 'Loaded with mozzarella, cheddar and a Parmesan-Romano blend.', tops: [], cheese: 'boss', prices: sp('mid'), tags: ['veg'] },
  { id: 'chicken-bacon-ranch', name: 'Chicken Bacon Ranch', desc: 'Ranch base, roast chicken and bacon.', tops: ['chicken', 'bacon'], sauce: 'ranch', prices: sp('lo') },
  { id: 'bbq-chicken', name: 'BBQ Chicken', desc: 'BBQ sauce, roast chicken and red onions.', tops: ['chicken', 'red-onions'], sauce: 'bbq', prices: sp('lo') },
  { id: 'vegetarian', name: 'Vegetarian', desc: 'Black olives, green peppers, mushrooms, red onions and tomatoes.', tops: ['black-olives', 'green-peppers', 'mushrooms', 'red-onions', 'tomatoes'], prices: sp('hi'), tags: ['veg'] },
  { id: 'hawaiian', name: 'Hawaiian', desc: 'Ham and pineapple.', tops: ['ham', 'pineapple'], prices: sp('lo') },
  { id: 'chicken-club', name: 'Chicken Club', desc: 'On the menu, no description published. Ask what’s on it when you call.', tops: [], prices: sp('hi'), mystery: true },
  { id: 'potm', name: 'Pizza of the Month', desc: 'A new creation every month. Call to hear this month’s pie.', tops: [], prices: sp('mid'), potm: true, mystery: true },
];
export const POTM = [
  ['Jun 2026', 'Nacho', 'Mozzarella, cheddar jack, taco meat, jalapeños and tortilla chips, with sour cream on the side.'],
  ['Jul 2026', 'BBQ Bacon Cheeseburger', 'BBQ sauce, bacon, hamburger, mozzarella and cheddar.'],
  ['Aug 2026', 'Buffalo Chicken', 'Ranch, hot sauce, blue cheese crumbles, chicken and mozzarella.'],
  ['Sep 2026', 'Ultimate Sausage', 'Classic sausage, spicy Italian sausage and sweet Italian sausage.'],
  ['Oct 2026', 'Oktoberfest', 'Sliced bratwurst, banana peppers and a German mayo-mustard sauce.'],
];
const $ = n => +n.toFixed(2);
// Non-pizza menu. prices: [[label, price]]
export const MENU = [
  { id: 'apps', name: 'Breadsticks & apps', blurb: 'The breadsticks come up in nearly every review.', items: [
    { name: 'Breadsticks', desc: 'Full or half order with marinara, cheese, ranch or garlic sauce.', prices: [['Full', 6.19], ['Half', 3.70]], tags: ['veg'] },
    { name: 'Stuffed Breadsticks', desc: 'Stuffed with cheese and your choice of pepperoni, bacon or sausage, or cheese only. Choice of dipping sauce.', prices: [['Full', 7.19], ['Half', 4.19]], photo: 'real-stuffed-sticks' },
    { name: 'Boss Bites', desc: 'Six cheeses over their bread, cut into squares. Choice of sauce.', prices: [['', 6.19]], tags: ['veg'] },
    { name: 'Garlic Cheese Bread', desc: '', prices: [['', 6.19]], tags: ['veg'] },
    { name: 'Boneless Wings', desc: 'Eight boneless wings: hot, BBQ or no sauce. Dips +$0.75.', prices: [['', 9.19]] },
    { name: 'Extra Sauce', desc: 'Italian, French, BBQ, ranch, garlic, marinara. Cheese sauce $1.25.', prices: [['', 1.00]], photo: 'real-cheese-sauce' },
  ] },
  { id: 'grinders', name: 'Grinders', blurb: 'Baked on Italian bread. Add meat, veggies or sauce for $0.75.', items: [
    { name: 'Sausage Marinara', desc: 'Italian sausage, marinara and mozzarella.', prices: [['Whole', 7.99], ['Half', 4.75]] },
    { name: 'Chicken Parmesan', desc: 'Chicken, marinara and mozzarella.', prices: [['Whole', 7.99], ['Half', 4.75]] },
    { name: 'Chicken Bacon & Ranch', desc: 'Roast chicken, bacon, ranch and mozzarella.', prices: [['Whole', 7.99], ['Half', 4.75]] },
    { name: 'Texas BBQ', desc: 'Sausage, onions, BBQ sauce and mozzarella.', prices: [['Whole', 7.99], ['Half', 4.75]] },
    { name: 'Ham & Cheese', desc: 'Ham and mozzarella.', prices: [['Whole', 7.99], ['Half', 4.75]] },
  ] },
  { id: 'calzones', name: 'Calzones', blurb: 'Sauce on the side for dipping.', items: [
    { name: 'Calzone', desc: 'Cheese calzone with a dipping sauce: marinara, ranch, BBQ, garlic or cheese sauce. Add toppings for $0.85 each.', prices: [['Cheese', 6.99]], photo: 'real-calzone', tags: ['veg'] },
  ] },
  { id: 'salads', name: 'Salads', blurb: 'Dressings: house ranch, Italian or French.', items: [
    { name: 'Chef Salad', desc: 'Green peppers, tomatoes, cheddar jack and croutons with your choice of meat and dressing.', prices: [['', 6.99]] },
    { name: 'Tossed Salad', desc: 'Tomatoes, cheese, croutons and your choice of dressing.', prices: [['', 5.99]], tags: ['veg'] },
  ] },
  { id: 'dessert', name: 'Dessert', blurb: 'Eight-inch cookies.', items: [
    { name: 'Brownie Cookie', desc: 'An 8″ brownie cookie.', prices: [['8″', 6.50]], tags: ['veg'] },
    { name: 'Chocolate Chip Cookie', desc: 'An 8″ chocolate chip cookie.', prices: [['8″', 6.50]], tags: ['veg'] },
  ] },
  { id: 'drinks', name: 'Drinks', blurb: 'Coke, Diet Coke and Sprite.', items: [
    { name: 'Can', desc: 'Coke, Diet Coke or Sprite.', prices: [['', 1.50]] },
    { name: '20 oz bottle', desc: 'Coke, Diet Coke or Sprite.', prices: [['', 2.75]] },
    { name: '2-liter bottle', desc: 'Coke, Diet Coke or Sprite.', prices: [['', 3.75]] },
    { name: 'Triple XXX Root Beer', desc: '', prices: [['', 2.85]] },
    { name: 'Bottled water', desc: '', prices: [['', 1.50]] },
  ] },
];
export const REVIEWS = [
  { q: 'Some of the best pizza in central Indiana! Great breadsticks!', who: 'Google review', when: 'Dec 2025' },
  { q: 'Easily the BEST cheese pizza around.', who: 'Google review', when: 'Nov 2025' },
];
