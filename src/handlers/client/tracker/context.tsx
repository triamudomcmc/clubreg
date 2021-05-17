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

  const tracker = new Tracker()

  useEffect(() => {
    tracker.init()
  },[])

  return {
    tracker
  }
}