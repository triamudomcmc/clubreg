import initialisedDB from "@server/firebase-admin";

export const getUserDataFromRefID = async (dataRefID, req) => {

  const userDoc = await initialisedDB.collection("data").doc(dataRefID).get()
  if (!userDoc.get("panelID").includes(req.body.panelID)) return {status: false, report: "invalidPermission"}

  return {status: true}
}

const filterMembersData = (members, req) => {
  return members.map(value => {
    const obj = value.data()
    return {
      status: obj.audition[req.body.panelID],
      title: obj.title,
      firstname: obj.firstname,
      lastname: obj.lastname,
      student_id: obj.student_id,
      level: obj.level,
      room: obj.room,
      dataRefID: value.id,
      ..."position" in obj && {position: obj.position[req.body.panelID]}
    }
  })
}

export const getMembers = async (req) => {

  const members = await initialisedDB.collection("data").where(`audition.${req.body.panelID}`, "!=", "").get()

  return filterMembersData(members.docs, req)
}