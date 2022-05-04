export default interface UserData {
  student_id: string
  title: string
  firstname: string
  lastname: string
  room: string
  number: string
  level: string
  club: string
  old_club: string
  audition: {}
  panelID?: Array<string>
  admin?: boolean
  safeMode?: boolean
  conTasks?: {}
  tucmc?: boolean
}
