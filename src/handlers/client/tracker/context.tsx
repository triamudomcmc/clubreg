import React, {useContext, useEffect, useState} from "react";
import {Tracker} from "@client/tracker/track";

export const useTracker = () => {
  return useContext(TrackerContext)
}

const TrackerContext = React.createContext<{tracker: Tracker, isInit: boolean} | null>(null)

export const TrackerProvider = ({children}) => {
  const toast = trackerAction()
  return <TrackerContext.Provider value={toast}>
    {children}
  </TrackerContext.Provider>
}

const trackerAction = () => {

  const rawTracker = new Tracker()
  const [tracker, setTracker] = useState(rawTracker)
  const [isInit, setIsInit] = useState(true)

  useEffect(() => {
    const init = async () => {
      setTracker(await rawTracker.init())
    }

    init()
    setIsInit(false)
  },[])

  return {
    tracker,
    isInit
  }
}