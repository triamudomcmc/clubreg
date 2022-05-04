export interface ClubData {
  new_count: number
  new_count_limit: number
  old_count: number
  old_count_limit: number
  count_limit: number
  place: string
  audition: boolean
  message: string
  contact: { type: string; context: string }
  contact2: { type: string; context: string }
  contact3: { type: string; context: string }
  teacher_count: number
  status: "pending" | "accepted" | "declined"
  title: string
}
