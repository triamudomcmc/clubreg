import {
  CheckCircleIcon,
  CheckIcon,
  ChevronDownIcon,
  ExclamationCircleIcon,
  SelectorIcon,
  SortAscendingIcon,
  XCircleIcon,
} from "@heroicons/react/solid"
import { Fragment, useEffect, useState } from "react"
import classnames from "classnames"
import Modal from "@components/common/Modals"
import css from "./bubble.module.css"
import { motion, useAnimation } from "framer-motion"
import { Listbox, Transition } from "@headlessui/react"
import classNames from "classnames"

const getRandomTransformOrigin = () => {
  const value = (16 + 40 * Math.random()) / 100
  const value2 = (15 + 36 * Math.random()) / 100
  return {
    originX: value,
    originY: value2,
  }
}

const getRandomDelay = () => -(Math.random() * 0.7 + 0.05)

const randomDuration = () => Math.random() * 0.07 + 0.23

const variants = {
  start: (i) => ({
    rotate: i % 2 === 0 ? [-1, 1.3, 0] : [1, -1.4, 0],
    transition: {
      delay: getRandomDelay(),
      repeat: Infinity,
      duration: randomDuration(),
    },
  }),
  reset: {
    rotate: 0,
  },
}

function arrayMax(arr) {
  return arr.reduce(function (p, v) {
    return p > v ? p : v
  }, 0)
}

export const PendingElement = ({
  userData,
  pendingUpdate,
  setPendingUpdate,
  reservedPos,
  setReservedPos,
  sections,
}) => {
  const [action, setAction] = useState(
    userData.dataRefID in pendingUpdate ? pendingUpdate[userData.dataRefID] : { action: "", pos: 0, section: null }
  )
  const [pos, setPos] = useState(0)
  const [warning, setWarning] = useState(false)
  const controls = useAnimation()
  const [people, setPeople] = useState([{ id: 1, name: null }])

  useEffect(() => {
    if (sections === null) {
      return
    }

    setPeople(
      sections.map((e, k) => ({
        id: k + 1,
        name: e,
      }))
    )

    setSection(
      sections.map((e, k) => ({
        id: k + 1,
        name: e,
      }))[0]
    )
  }, [sections])

  const [section, setSection] = useState(people[0])

  useEffect(() => {
    setWarning(false)
    setReservedPos((prev) => {
      delete prev[userData.dataRefID]
      return prev
    })

    console.log(reservedPos)
    if (pos > 0) {
      if (
        !(section.name in reservedPos) ||
        (!Object.values(reservedPos[section.name]).includes(pos) &&
          arrayMax(Object.values(reservedPos[section.name])) + 1 >= pos)
      ) {
        setAction({ action: "reserved", pos: pos, section: section.name })
        setReservedPos((prev) => ({ ...prev, [section.name]: { ...prev[section.name], [userData.dataRefID]: pos } }))
      } else {
        setWarning(true)
      }
    } else {
      if (action.action === "reserved") {
        reset()
      }
    }
  }, [pos])

  const reset = () => {
    setAction({ action: "", pos: 0, section: section.name })
    setPos(0)
  }

  useEffect(() => {
    setAction((prev) => ({ ...prev, section: section.name }))
  }, [section.name])

  useEffect(() => {
    if (action.action !== "")
      return setPendingUpdate((prevState) => ({ ...prevState, ...{ [userData.dataRefID]: action } }))
    setPendingUpdate((prevState) => {
      delete prevState[userData.dataRefID]
      return prevState
    })
  }, [action])

  useEffect(() => {
    if (userData.dataRefID in pendingUpdate) return
    reset()
  }, [pendingUpdate])

  const clickAction = (actionType) => {
    setAction({ action: actionType, pos: 0, section: section.name })
    setPos(0)
  }

  useEffect(() => {
    if (warning) {
      controls.start("start")
    } else {
      controls.stop()
      controls.set("reset")
    }
  }, [warning])

  return (
    <div className="flex flex-col rounded-lg bg-white p-5 shadow-md md:flex-row md:items-center md:justify-between">
      <div className="flex flex-shrink-0 flex-col md:flex-row md:items-center">
        <div className="relative flex flex-row justify-between md:items-center">
          <h1>
            {userData.title}
            {userData.firstname} {userData.lastname}
          </h1>
          <div className="absolute right-0 ml-3">
            <Listbox value={section} onChange={setSection}>
              {({ open }) => (
                <>
                  <div className="relative mt-1">
                    <Listbox.Button className="focus:outline-none relative w-full cursor-default rounded-md border border-gray-300 bg-white py-1 pl-3 pr-10 text-left text-lg shadow-sm focus:border-TUCMC-pink-500 focus:ring-1 focus:ring-TUCMC-pink-500">
                      <span className="block truncate">{section.name}</span>
                      <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                        <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                      </span>
                    </Listbox.Button>

                    <Transition
                      show={open}
                      as={Fragment}
                      leave="transition ease-in duration-100"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <Listbox.Options
                        static
                        className="focus:outline-none absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-lg shadow-lg ring-1 ring-black ring-opacity-5"
                      >
                        {people.map((person) => (
                          <Listbox.Option
                            key={person.id}
                            className={({ active }) =>
                              classNames(
                                active ? "bg-TUCMC-pink-600 text-white" : "text-gray-900",
                                "relative cursor-default select-none py-2 pl-3 pr-9"
                              )
                            }
                            value={person}
                          >
                            {({ selected, active }) => (
                              <>
                                <span
                                  className={classNames(selected ? "font-semibold" : "font-normal", "block truncate")}
                                >
                                  {person.name}
                                </span>

                                {selected ? (
                                  <span
                                    className={classNames(
                                      active ? "text-white" : "text-TUCMC-pink-600",
                                      "absolute inset-y-0 right-0 flex items-center pr-4"
                                    )}
                                  >
                                    <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                  </span>
                                ) : null}
                              </>
                            )}
                          </Listbox.Option>
                        ))}
                      </Listbox.Options>
                    </Transition>
                  </div>
                </>
              )}
            </Listbox>
          </div>
        </div>
        <span className="text-TUCMC-gray-600 md:hidden">
          {userData.student_id} | ม.{userData.level}/{userData.room}
        </span>
      </div>
      <div className="flex items-center justify-between text-TUCMC-gray-600 md:ml-10 md:w-[620px]">
        <div className="mr-14 hidden w-[200px] flex-shrink justify-between md:flex">
          <span>{userData.student_id}</span>
          <span>ม.{userData.level}</span>
          <span>{userData.room}</span>
        </div>
        <div className="mt-3 flex flex-shrink-0 space-x-2 md:mt-0">
          <div
            onClick={() => {
              action.action !== "passed" ? clickAction("passed") : reset()
            }}
            className={classnames(
              "flex cursor-pointer items-center space-x-1 rounded-md border px-6 py-1",
              action.action === "passed" && "bg-TUCMC-green-400 text-white"
            )}
          >
            <CheckCircleIcon
              className={classnames("h-5 w-5", action.action === "passed" ? "text-white" : "text-TUCMC-green-400")}
            />
            <span>รับ</span>
          </div>
          <motion.div
            custom={1}
            variants={variants}
            animate={controls}
            style={getRandomTransformOrigin()}
            className={classnames(
              "relative flex items-center space-x-1 rounded-md border px-3 py-1",
              warning && "border-TUCMC-red-400 text-TUCMC-gray-500"
            )}
          >
            <input
              style={{ width: "60px" }}
              value={pos > 0 ? pos : ""}
              onChange={(event) => {
                setPos(parseInt(event.target.value))
              }}
              className={classnames("outline-none appearance-none text-center")}
              placeholder="สำรอง"
            />
            <Modal className="absolute top-1.5 right-1.5 h-5 w-5" ToggleDep={warning} closeClickOutside={false}>
              <div className="absolute z-10 h-5 w-5 opacity-0 hover:opacity-100">
                <div className="absolute -top-10 -left-11">
                  <div className={classnames("w-28 rounded-md bg-white p-2 text-xs text-black shadow-md", css.tooltip)}>
                    <h1 className="text-center">ลำดับนี้ถูกใช้แล้ว</h1>
                  </div>
                </div>
                <ExclamationCircleIcon className="h-5 w-5 text-TUCMC-red-400" />
              </div>
              <ExclamationCircleIcon className="absolute z-[9] h-5 w-5 text-TUCMC-red-400" />
            </Modal>
          </motion.div>
          <div
            onClick={() => {
              action.action !== "failed" ? clickAction("failed") : reset()
            }}
            className={classnames(
              "flex cursor-pointer items-center space-x-1 rounded-md border px-4 py-1",
              action.action === "failed" && "bg-TUCMC-red-400 text-white"
            )}
          >
            <XCircleIcon
              className={classnames("h-5 w-5", action.action === "failed" ? "text-white" : "text-TUCMC-red-400")}
            />
            <span>ไม่รับ</span>
          </div>
        </div>
      </div>
    </div>
  )
}
