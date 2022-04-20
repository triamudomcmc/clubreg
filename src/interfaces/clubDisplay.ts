type RawContactType = {
  type: "FB" | "IG" | "Twitter" | "YT" | "Line" | "Tiktok" | "ไม่มี"
  context: string
}

type ContactType = RawContactType | {}

type ReviewType = {
  contact: string
  context: string
  name: string
  profile: string
  year: number
}

export interface ClubDisplay {
  audition: boolean
  contact: ContactType
  contact2: ContactType
  contact3: ContactType
  count: number
  description: string
  nameEN: string
  nameTH: string
  reviews: ReviewType[]
  images?: {
    mainImage?: string
    "picture-1"?: string
    "picture-2"?: string
    "picture-3"?: string
  }
}
