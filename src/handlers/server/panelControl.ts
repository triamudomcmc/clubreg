import {fetchSession} from "@server/fetchUser";
import initialisedDB from "@server/firebase-admin";

export const fetchPanel = async (req, res) => {

  const {logged, ID} = await fetchSession(req,res, req.body.fingerPrint)

  if (!logged) return {status: false, report: "sessionError"}
  const userDoc = await initialisedDB.collection("data").doc(ID.dataRefID).get()
  if (userDoc.get("panelID") !== req.body.panelID) return {status: false, report: "invalidPermission"}
  const members = await initialisedDB.collection("data").where(`audition.${req.body.panelID}`, "!=", "").get()
  const filtered = members.docs.map(value => {
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

  return {status: true, report: "success", data: filtered}
}

export const submitPending = async (req, res) => {

  const {logged, ID} = await fetchSession(req,res, req.body.fingerPrint)
  if (!logged) return {status: false, report: "sessionError"}
  const userDoc = await initialisedDB.collection("data").doc(ID.dataRefID).get()
  if (userDoc.get("panelID") !== req.body.panelID) return {status: false, report: "invalidPermission"}

  const tasks = req.body.tasks
  const batch = initialisedDB.batch()
  for (let user of Object.keys(tasks)) {
    const ref = initialisedDB.collection("data").doc(user)
    if (tasks[user].action === "reserved") {
      batch.set(ref, {audition: {[req.body.panelID]: tasks[user].action}, position: {[req.body.panelID]:  tasks[user].pos}}, {merge:true})
    }else{
      batch.set(ref, {audition: {[req.body.panelID]: tasks[user].action}}, {merge:true})
    }
  }
  await batch.commit()

  return {status: true, report: "success"}
}


export const updateUser = async (req, res) => {

  const {logged, ID} = await fetchSession(req,res, req.body.fingerPrint)
  if (!logged) return {status: false, report: "sessionError"}
  const userDoc = await initialisedDB.collection("data").doc(ID.dataRefID).get()
  if (userDoc.get("panelID") !== req.body.panelID) return {status: false, report: "invalidPermission"}

  const objectRefId = req.body.objectRefID
  const objectDoc = await initialisedDB.collection("data").doc(objectRefId).get()
  if (req.body.task.action === "passed" || req.body.task.action === "failed") {
    if (objectDoc.get("position") && req.body.panelID in objectDoc.get("position")) {
      const position = objectDoc.get("position")[req.body.panelID]
      const shiftTask = await initialisedDB.collection("data").where(`position.${req.body.panelID}`, ">",position).get()
      const batch = initialisedDB.batch()
      batch.set(initialisedDB.collection("data").doc(objectRefId), {audition: {[req.body.panelID]: req.body.task.action}, position: {[req.body.panelID]: 0}}, {merge:true})
      shiftTask.forEach((doc) => {
        batch.set(initialisedDB.collection("data").doc(doc.id), {position: {[req.body.panelID]:  doc.get("position")[req.body.panelID] - 1}}, {merge:true})
      })
      await batch.commit()
    }
  }


  return {status: true, report: "success"}
}


export const updatePosition = async (req, res) => {

  const {logged, ID} = await fetchSession(req,res, req.body.fingerPrint)
  if (!logged) return {status: false, report: "sessionError"}
  const userDoc = await initialisedDB.collection("data").doc(ID.dataRefID).get()
  if (userDoc.get("panelID") !== req.body.panelID) return {status: false, report: "invalidPermission"}

  const tasks = req.body.tasks
  const batch = initialisedDB.batch()
  for (let item of tasks) {
    const ref = initialisedDB.collection("data").doc(item.dataRefID)
    batch.set(ref, {position: {[req.body.panelID]:  item.position}}, {merge:true})
  }
  await batch.commit()

  return {status: true, report: "success"}
}