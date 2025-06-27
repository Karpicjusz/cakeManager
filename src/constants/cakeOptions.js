export const STEP_ORDER = ['size', 'sponge', 'creme', 'gelly', 'crisp', 'decorations', 'text', 'delivery'];

export const CAKE_OPTIONS = {
  size: {
    id: 'size',
    title: 'Cake Size',
    next: 'sponge',
  },
  sponge: {
    id: 'sponge',
    title: 'Sponge Cake',
    next: 'creme',
    options: [
      { id: 'normal', name: 'Normal', description: 'Classic vanilla sponge', color: 'linear-gradient(135deg, #F4D03F, #F7DC6F)' },
      { id: 'gluten-free', name: 'Gluten-Free', description: 'Almond flour based', color: 'linear-gradient(135deg, #D2B48C, #DEB887)' },
      { id: 'egg-free', name: 'Egg-Free', description: 'Plant-based recipe', color: 'linear-gradient(135deg, #FFF8DC, #FFFEF0)' },
      { id: 'both-free', name: 'Gluten & Egg Free', description: 'Allergy-friendly option', color: 'linear-gradient(135deg, #E8E8E8, #F0F0F0)' },
    ],
  },
  creme: {
    id: 'creme',
    title: 'Creme Flavour',
    next: 'gelly',
    options: [
      { id: 'vanilla', name: 'Vanilla Bean', description: 'Classic creamy vanilla', color: 'linear-gradient(135deg, #F3EFEA, #FFFFFF)' },
      { id: 'chocolate', name: 'Chocolate Fudge', description: 'Rich dark chocolate', color: 'linear-gradient(135deg, #5D4037, #795548)' },
      { id: 'strawberry', name: 'Strawberry Swirl', description: 'Sweet strawberry cream', color: 'linear-gradient(135deg, #FADADD, #FFC0CB)' },
      { id: 'pistachio', name: 'Pistachio Green', description: 'Nutty and delicious', color: 'linear-gradient(135deg, #B2D8B4, #CDE5CF)' },
      { id: 'lemon', name: 'Lemon Zest', description: 'Refreshing citrus cream', color: 'linear-gradient(135deg, #FFFACD, #FFFDE0)' },
    ],
  },
   gelly: {
    id: 'gelly',
    title: 'Gelly Fruit',
    next: 'crisp',
    options: [
      { id: 'raspberry', name: 'Raspberry', description: 'Classic sharp & sweet', color: 'linear-gradient(135deg, #E30B5D, #C70039)' },
      { id: 'mango', name: 'Mango-Passion Fruit', description: 'Tropical and tangy', color: 'linear-gradient(135deg, #FFC300, #FFD700)' },
      { id: 'forest-berry', name: 'Forest Berries', description: 'A rich, dark berry mix', color: 'linear-gradient(135deg, #7B1F54, #900C3F)' },
      { id: 'kiwi-lime', name: 'Kiwi & Lime', description: 'Zesty and vibrant', color: 'linear-gradient(135deg, #84DE02, #A1E533)' },
    ],
  },
  crisp: {
    id: 'crisp',
    title: 'Crisp Layer',
    next: 'decorations',
    options: [
      { id: 'praline', name: 'Hazelnut Praline', description: 'A crunchy classic', color: 'linear-gradient(135deg, #D4A574, #E6C589)' },
      { id: 'white-chocolate', name: 'White Choc Crunch', description: 'Sweet & creamy crisp', color: 'linear-gradient(135deg, #F5F5DC, #FFFDD0)' },
      { id: 'dark-chocolate', name: 'Dark Choc & Feuilletine', description: 'Rich with a wafer crunch', color: 'linear-gradient(135deg, #4E342E, #6D4C41)' },
      { id: 'coconut', name: 'Coconut Dacquoise', description: 'Light and nutty', color: 'linear-gradient(135deg, #FFF5EE, #FAF0E6)' },
    ],
  },
  decorations: {
    id: 'decorations',
    title: 'Decorations',
    next: 'text',
    popular: [
      'Fresh flowers & edible blooms',
      'Gold leaf & metallic accents',
      'Custom fondant figures',
      'Buttercream piping designs',
    ],
  },
  text: {
    id: 'text',
    title: 'Custom Text',
    next: 'delivery',
  },
  delivery: {
    id: 'delivery',
    title: 'Delivery Date',
    next: null, // This is the last step, so next is null
  },
};

export const TIER_CONFIGS = {
  single: { min: 10, max: 20, name: 'Single Tier Cake', desc: 'Perfect for intimate gatherings' },
  double: { min: 21, max: 70, name: 'Two Tier Cake', desc: 'Ideal for medium-sized parties' },
  triple: { min: 71, max: 200, name: 'Three Tier Cake', desc: 'Grand celebration cake for large events' },
};