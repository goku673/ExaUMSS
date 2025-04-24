const images = {
    fondStart: require('./images/fondStart.png'),
    facMedicine: require('./images/facMedicine.png'),
    facLaw: require('./images/facLaw.png'),
    facTecno: require('./images/facTecno.png'),
    facEconomy: require('./images/facEconomy.png'),
    faculty: require('./images/faculty.png'),
    guide: require('./images/guide.png'),
    recent: require('./images/recent.png'),
  }as const;

export type ImageKey = keyof typeof images;
export default images;