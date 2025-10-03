const airlineLogos = [
  {
    name: "ایران ایر",
    logo: "Iran_Air_logo.png",
  },
  {
    name: "ایران ایرتور",
    logo: "Iran_Airtour.png",
  },
  {
    name: "آسمان",
    logo: "Aseman.png",
  },
  {
    name: "کیش ایر",
    logo: "Kish_Airlines.png",
  },
  {
    name: "ماهان ایر",
    logo: "mahan.png",
  },
  {
    name: "هواپیمایی کاسپین",
    logo: "Caspian_Airlines.png",
  },
  {
    name: "قشم ایر",
    logo: "Qeshm.png",
  },
  {
    name: "زاگرس ایر",
    logo: "Zagros.png",
  },
  {
    name: "هواپیمایی تابان",
    logo: "Taban.png",
  },
  {
    name: "هواپیمایی آتا",
    logo: "Ata.png",
  },
  {
    name: "معراج",
    logo: "Meraj.png",
  },
  {
    name: "سپهران",
    logo: "Sepehran.jpg",
  },
  {
    name: "هواپیمایی کارون",
    logo: "Karun-Airlines.png",
  },
  {
    name: "وارش",
    logo: "Varesh.png",
  },
  {
    name: "فلای پرشیا",
    logo: "Fly-persia.png",
  },
  {
    name: "آوا ایر",
    logo: "Ava_airline.png",
  },
  {
    name: "فلای کیش",
    logo: "Fly_Kish.png",
  },
  {
    name: "اطلس ایر",
    logo: "atlas.webp",
  },
  {
    name: "اروان",
    logo: "Air1air.jpg",
  },
  {
    name: "چابهار",
    logo: "chabahar.png",
  },
  {
    name: "پارس ایر",
    logo: "pars.png",
  },
];

export function getAirlineLogo(airlineName: string): string {
  const exactMatch = airlineLogos.find(
    (airline) => airline.name === airlineName.trim()
  );

  if (exactMatch) {
    return `/img/logo-ariline/${exactMatch.logo}`;
  }

  const partialMatch = airlineLogos.find(
    (airline) =>
      airline.name.includes(airlineName.trim()) ||
      airlineName.trim().includes(airline.name)
  );

  if (partialMatch) {
    return `/img/logo-ariline/${partialMatch.logo}`;
  }

  return "/img/THYAO.IS 1.png";
}


