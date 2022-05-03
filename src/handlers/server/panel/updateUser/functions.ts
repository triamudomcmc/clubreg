import initialisedDB from "@server/firebase-admin"

const getAffectedUsers = async (objectDoc, req, target = null) => {
  const position = target || objectDoc.get("position")[req.body.panelID]

  const affectedUsers = await initialisedDB
    .collection("data")
    .where(`position.${req.body.panelID}`, target ? ">=" : ">", position)
    .get()

  return { affectedUsers }
}

const updateSelf = (batch, objectRefId, req, pos = 0) => {

  const section = (req.body.section)
  const target = req.body.sectionUpdate
  if (target !== section) {
    batch.set(
      initialisedDB.collection("data").doc(objectRefId),
      {
        audition: { [req.body.panelID]: req.body.task.action },
        position: { [req.body.panelID]: pos },
        section: { [req.body.panelID]: target },
      },
      { merge: true }
    )
  }else{
    batch.set(
      initialisedDB.collection("data").doc(objectRefId),
      {
        audition: { [req.body.panelID]: req.body.task.action },
        position: { [req.body.panelID]: pos },
      },
      { merge: true }
    )
  }
}

const getShiftRate = (direction) => {
  let shiftRate
  switch (direction) {
    case "up":
      shiftRate = 1
      break
    case "down":
      shiftRate = -1
  }

  return shiftRate
}

const performBatchShift = (affectedUsers, batch, req, direction: "up" | "down") => {
  const shiftRate = getShiftRate(direction)

  affectedUsers.forEach((doc) => {
    const section = (req.body.section)
      if (section) {
        const s = doc.get("section")
        if (s[req.body.panelID] !== section) return
      }

    batch.set(
      initialisedDB.collection("data").doc(doc.id),
      { position: { [req.body.panelID]: doc.get("position")[req.body.panelID] + shiftRate } },
      { merge: true }
    )
  })
}

export const removeFromReserve = async (objectDoc, req, objectRefId) => {
  if (objectDoc.get("position") && req.body.panelID in objectDoc.get("position")) {
    const { affectedUsers } = await getAffectedUsers(objectDoc, req)
    const batch = initialisedDB.batch()

    updateSelf(batch, objectRefId, req)
    performBatchShift(affectedUsers, batch, req, "down")

    await batch.commit()
  }
}

export const moveFromNonReserve = async (objectRefId, req) => {
  const section = (req.body.section)
  const target = req.body.sectionUpdate
  if (target !== section) {
    await initialisedDB
    .collection("data")
    .doc(objectRefId)
    .set({ audition: { [req.body.panelID]: req.body.task.action }, section: { [req.body.panelID]: target } }, { merge: true })
  }else{
    await initialisedDB
    .collection("data")
    .doc(objectRefId)
    .set({ audition: { [req.body.panelID]: req.body.task.action } }, { merge: true })
  }
}

export const moveToReserve = async (objectDoc, objectRefId, req) => {
  const { affectedUsers } = await getAffectedUsers(objectDoc, req, req.body.task.pos)
  const batch = initialisedDB.batch()

  performBatchShift(affectedUsers, batch, req, "up")
  updateSelf(batch, objectRefId, req, req.body.task.pos)

  await batch.commit()
}
