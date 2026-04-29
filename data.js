// Selectrucks Zapata — inventory data & constants

const BRANCHES = [
  { id: 'tlal', name: 'Tlalnepantla',  state: 'Edo. de México', count: 48, tel: '55 5321 3030', hours: 'L-V 9:00-18:00 · S 9:00-14:00', flagship: true },
  { id: 'aero', name: 'Aeropuerto',    state: 'Edo. de México', count: 34, tel: '59 5954 9933', hours: 'L-V 9:00-18:00 · S 9:00-14:00' },
  { id: 'tamp', name: 'Tampico',       state: 'Tamaulipas',     count: 22, tel: '833 301 4653', hours: 'L-V 9:00-18:00 · S 9:00-13:00' },
  { id: 'gdl',  name: 'Guadalajara',   state: 'Jalisco',        count: 41, tel: '33 3180 8541', hours: 'L-V 9:00-18:00 · S 9:00-14:00' },
  { id: 'gdlo', name: 'Guadalajara Occidente', state: 'Jalisco', count: 28, tel: '33 3837 6500', hours: 'L-V 9:00-18:00 · S 9:00-14:00' },
  { id: 'leon', name: 'León',          state: 'Guanajuato',     count: 31, tel: '47 710 0016',  hours: 'L-V 9:00-18:00 · S 9:00-14:00' },
  { id: 'mty',  name: 'Monterrey',     state: 'Nuevo León',     count: 52, tel: '81 8305 4500', hours: 'L-V 9:00-18:00 · S 9:00-14:00', flagship: true },
  { id: 'qro',  name: 'Querétaro',     state: 'Querétaro',      count: 37, tel: '44 2209 6900', hours: 'L-V 9:00-18:00 · S 9:00-14:00' },
  { id: 'cela', name: 'Celaya',        state: 'Guanajuato',     count: 13, tel: '461 689 1108', hours: 'L-V 9:00-18:00 · S 9:00-13:00' },
];

const BRANDS = ['Freightliner', 'Kenworth', 'International', 'Volvo', 'Peterbilt', 'Mack', 'Mercedes-Benz', 'Scania'];
const TYPES  = ['Tractocamión', 'Camión de carga', 'Volteo', 'Pipa', 'Refrigerado', 'Cama baja'];
const PRICES = [
  { label: 'Hasta $500,000',       min: 0, max: 500000 },
  { label: '$500,000 - $900,000',  min: 500000, max: 900000 },
  { label: '$900,000 - $1.4M',     min: 900000, max: 1400000 },
  { label: '$1.4M - $2M',          min: 1400000, max: 2000000 },
  { label: 'Más de $2M',           min: 2000000, max: Infinity },
];

const UNITS = [
  { id: 1,  brand: 'Freightliner', model: 'Cascadia',   year: 2020, km: '420,000', engine: 'DD15 · 505hp', type: 'Tractocamión',    price: 1200000, monthly: 28490, branch: 'Querétaro',          featured: true, warranty: true, status: 'Disponible' },
  { id: 2,  brand: 'Kenworth',     model: 'T680',       year: 2021, km: '380,000', engine: 'PACCAR MX-13', type: 'Tractocamión',    price: 1450000, monthly: 34200, branch: 'Monterrey',          featured: true, warranty: true, status: 'Disponible' },
  { id: 3,  brand: 'International',model: 'LT625',      year: 2019, km: '510,000', engine: 'A26 · 475hp',  type: 'Tractocamión',    price: 980000,  monthly: 23100, branch: 'Guadalajara',        featured: false,warranty: true, status: 'Disponible' },
  { id: 4,  brand: 'Volvo',        model: 'VNL 860',    year: 2022, km: '195,000', engine: 'D13 · 500hp',  type: 'Tractocamión',    price: 1680000, monthly: 39600, branch: 'Tlalnepantla',       featured: true, warranty: true, status: 'Nuevo ingreso' },
  { id: 5,  brand: 'Kenworth',     model: 'T370',       year: 2020, km: '280,000', engine: 'PX-9 · 350hp', type: 'Camión de carga', type: 'Camión de carga', price: 890000, monthly: 20990, branch: 'León', featured: false, warranty: true, status: 'Disponible' },
  { id: 6,  brand: 'Freightliner', model: 'M2 106',     year: 2021, km: '310,000', engine: 'Cummins B6.7', type: 'Camión de carga', price: 760000,  monthly: 17920, branch: 'Celaya',             featured: false,warranty: true, status: 'Disponible' },
  { id: 7,  brand: 'International',model: 'WorkStar',   year: 2018, km: '620,000', engine: 'N13 · 450hp',  type: 'Volteo',          price: 620000,  monthly: 14620, branch: 'Tampico',            featured: false,warranty: true, status: 'Oferta' },
  { id: 8,  brand: 'Peterbilt',    model: '579',        year: 2020, km: '395,000', engine: 'PACCAR MX-13', type: 'Tractocamión',    price: 1320000, monthly: 31100, branch: 'Monterrey',          featured: true, warranty: true, status: 'Disponible' },
  { id: 9,  brand: 'Mack',         model: 'Anthem',     year: 2019, km: '470,000', engine: 'MP8 · 445hp',  type: 'Tractocamión',    price: 1050000, monthly: 24750, branch: 'Aeropuerto',         featured: false,warranty: true, status: 'Disponible' },
  { id: 10, brand: 'Volvo',        model: 'FMX 440',    year: 2021, km: '240,000', engine: 'D13 · 440hp',  type: 'Volteo',          price: 1180000, monthly: 27800, branch: 'Guadalajara Occidente', featured: false, warranty: true, status: 'Disponible' },
  { id: 11, brand: 'Mercedes-Benz',model: 'Actros 2644',year: 2020, km: '350,000', engine: 'OM471 · 435hp',type: 'Tractocamión',    price: 1390000, monthly: 32800, branch: 'Tlalnepantla',       featured: true, warranty: true, status: 'Disponible' },
  { id: 12, brand: 'Scania',       model: 'R 450',      year: 2019, km: '480,000', engine: 'DC13 · 450hp', type: 'Tractocamión',    price: 1160000, monthly: 27350, branch: 'Querétaro',          featured: false,warranty: true, status: 'Oferta' },
];

window.BRANCHES = BRANCHES;
window.BRANDS = BRANDS;
window.TYPES = TYPES;
window.PRICES = PRICES;
window.UNITS = UNITS;
