import FingerprintJS from "@fingerprintjs/fingerprintjs";
import LooseTypeObject from "../../../interfaces/LooseTypeObject";

export const fetchMembers = async (panelID): Promise<{status: boolean, report: string, data: Array<LooseTypeObject<any>>}> => {

  const fp = await FingerprintJS.load()
  const fingerPrint = await fp.get();

  const data = await fetch(`/api/database/panel`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({action: "fetchMembers",panelID: panelID, fingerPrint: fingerPrint.visitorId}),
    credentials: 'include'
  })

  const res = await data.json()

  return res

}

export const submitPending = async (panelID, tasks): Promise<{status: boolean, report: string}> => {

  const fp = await FingerprintJS.load()
  const fingerPrint = await fp.get();

  const data = await fetch(`/api/database/panel`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({action: "submitPending",panelID: panelID,tasks: tasks, fingerPrint: fingerPrint.visitorId}),
    credentials: 'include'
  })

  const res = await data.json()

  return res

}