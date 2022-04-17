import initialisedDB from "@server/firebase-admin"

export const fetchStudentIDAction = async (req, res, ID) => {
  try {
    const studentDoc = initialisedDB.collection("data").where("student_id", "==", req.body.studentID)
    const out = await studentDoc.get()

    if (out.empty || out.size === 0) {
      return { status: false, report: "student_not_found" }
    } else if (out.size > 0) {
      // if (ID.studentID === req.body.studentID) {
      //   return { status: false, report: "cannot_add_self" }
      // }

      const data = await out.docs[0].data()
      return { status: true, report: "success", data }
    }
  } catch (e: any) {
    return { status: false, report: e }
  }
}
