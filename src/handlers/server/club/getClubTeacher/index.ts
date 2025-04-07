import UserData from "@interfaces/userData"
import initialisedDB from "@server/firebase-admin"

export const getClubTeacher = async (
  req,
  res
): Promise<{ status: boolean; report?: string; data?: UserData[] }> => {
  try {
    const userSnapshot = await initialisedDB.collection("data").where("club", "==", req.body.clubID).get()

    const filteredTeacher = userSnapshot.docs.filter((doc) => {
      const data = doc.data()
      return data.title === "ครู" && data.level === "9" && data.room === "111"
    })

    if (filteredTeacher.length === 0) {
      return { status: false, report: "no_teacher" }
    }

    const teachers: UserData[] = []
    filteredTeacher.forEach((doc) => {
      teachers.push(doc.data() as UserData)
    })

    return { status: true, report: "success", data: teachers }
  } catch (e: any) {
    return { status: false, report: e }
  }
}
