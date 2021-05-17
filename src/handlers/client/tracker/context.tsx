import React, {useContext, useEffect, useState} from "react";
import {Tracker} from "@client/tracker/track";
import Toast from "@components/common/Toast";

export const useTracker = () => {
  return useContext(TrackerContext)
}

const TrackerContext = React.createContext<{tracker: Tracker} | null>(null)

export const TrackerProvider = ({children}) => {
  const toast = trackerAction()
  return <TrackerContext.Provider value={toast}>
    <Toast/>
    {children}
  </TrackerContext.Provider>
}

const trackerAction = () => {

  const rawTracker = new Tracker()
  const [tracker, setTracker] = useState(rawTracker)

  useEffect(() => {
    const init = async () => {
      setTracker(await rawTracker.init())
    }

    init()
  },[])

  return {
    tracker
  }
}