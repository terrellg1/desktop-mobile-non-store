// Nonchalant — sample catalog using real product cutouts.
// Each color carries its own img (and optional back) + a warm `tile` tone for the gallery bg.
window.NCL_DATA = {
  nav: ['New', 'Tees', 'Hoodies', 'Bottoms', 'Basics', 'Sale'],
  products: [
    { id: 1, name: 'World Without NON Tee', price: '$42', cat: 'Tees', isNew: true, badge: 'New',
      colors: [
        { color:'#E4D6C0', name:'Bone', tile:'#E7DBC7', img:'img/world-tee.png' },
        { color:'#1A1613', name:'Onyx', tile:'#D8CBB5', img:'img/world-tee.png' },
      ] },
    { id: 2, name: 'Day Maker Tee', price: '$40', cat: 'Tees',
      colors: [
        { color:'#EADFC9', name:'Cream', tile:'#EADFC9', img:'img/daymaker-tee-cream.png' },
        { color:'#B0362E', name:'Red', tile:'#E0C7B4', img:'img/daymaker-tee-red.png' },
      ] },
    { id: 3, name: 'Love NON Tee', price: '$40', cat: 'Tees', isNew: true, badge: 'Best seller',
      colors: [
        { color:'#D8C7B0', name:'Oat', tile:'#DFD0BA', img:'img/love-non-tee.png' },
      ] },
    { id: 4, name: 'ZOS Ride Tee', price: '$44', cat: 'Tees',
      colors: [
        { color:'#D6C6B0', name:'Sand', tile:'#DECFB8', img:'img/zos-ride-tee-sand.png' },
        { color:'#B7B7B7', name:'Grey', tile:'#DAD4C8', img:'img/zos-ride-tee-grey.png' },
        { color:'#3C3A38', name:'Charcoal', tile:'#D3CABA', img:'img/zos-ride-tee-charcoal.png' },
      ] },
    { id: 5, name: 'ZOS Skeleton Hoodie', price: '$78', cat: 'Hoodies', isNew: true, badge: 'Best seller',
      colors: [
        { color:'#CFC3B0', name:'Ash', tile:'#DDD3C2', img:'img/skeleton-hoodie-front.png', back:'img/skeleton-hoodie-back.png' },
        { color:'#E8D24A', name:'Butter', tile:'#E9DCA8', img:'img/zos-hoodie-yellow.png', back:'img/skeleton-hoodie-yellow.png' },
      ] },
    { id: 6, name: 'Nonchalant Zip Hoodie', price: '$90', cat: 'Hoodies',
      colors: [
        { color:'#E6DAC6', name:'Bone', tile:'#E7DBC7', img:'img/nonchalant-zip-white.png' },
        { color:'#7C5B42', name:'Brown', tile:'#DAC7B2', img:'img/nonchalant-zip-brown.png' },
        { color:'#1A1613', name:'Onyx', tile:'#D6CAB6', img:'img/nonchalant-zip-black.png' },
      ] },
    { id: 7, name: 'Nonchalant Crewneck', price: '$66', cat: 'Basics',
      colors: [
        { color:'#E7E7E7', name:'Ash', tile:'#DDD6C7', img:'img/nonchalant-crew-ash.png' },
      ] },
    { id: 8, name: 'ZOS Sweatpants', price: '$68', cat: 'Bottoms',
      colors: [
        { color:'#D6C6B0', name:'Sand', tile:'#DECFB8', img:'img/zos-sweatpants-sand.png' },
        { color:'#B9B3A8', name:'Fog', tile:'#D9D2C4', img:'img/zos-sweatpants-fog.png' },
      ] },
  ],
  categories: [
    { name: 'Tees', fill: '#E4D6C0', img: 'img/world-tee.png' },
    { name: 'Hoodies', fill: '#CFC3B0', img: 'img/zos-hoodie-yellow.png' },
    { name: 'Bottoms', fill: '#D6C6B0', img: 'img/nonchalant-pants-sand.png' },
    { name: 'Basics', fill: '#EADFC9', img: 'img/daymaker-tee-cream.png' },
  ],
  sizes: ['XS','S','M','L','XL','XXL'],
};
// Back-compat: expose first color's image + tile as product-level img/fill for cards.
window.NCL_DATA.products.forEach((p) => { p.img = p.colors[0].img; p.fill = p.colors[0].tile; });
