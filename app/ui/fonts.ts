import { Inter, Lato, Raleway, Roboto } from "next/font/google";

export const inter = Inter({ subsets: ['latin'] })

export const raleway = Raleway({
  subsets: ['latin'],
  weight: ['400','500','600']
})

export const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400','500','700']
})

export const lato = Lato({
  subsets: ['latin'],
  weight: ['300','400','700']
})