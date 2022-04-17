import { Listbox, Transition } from "@headlessui/react"
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid"
import React, { Fragment, useEffect, useState } from "react"
import { Input } from "@components/auth/Input"
import classnames from "classnames"

function classNames(...classes) {
  return classes.filter(Boolean).join(" ")
}

export const QueryField = ({ clear, setClear, updateQuery }) => {
  const fields = [
    { id: 0, name: "student_id" },
    { id: 1, name: "firstname" },
    { id: 2, name: "lastname" },
    { id: 3, name: "level" },
    { id: 4, name: "room" },
    { id: 5, name: "club" },
  ]

  const operators = [
    { id: 0, name: "==" },
    { id: 1, name: "!=" },
    { id: 2, name: ">" },
    { id: 3, name: ">=" },
    { id: 4, name: "<" },
    { id: 5, name: "<=" },
  ]

  const [field, setField] = useState(fields[0])
  const [operator, setOperator] = useState(operators[0])
  const [context, setContext] = useState("")

  useEffect(() => {
    updateQuery({
      field: field.name,
      operator: operator.name,
      context,
    })
  }, [field, operator, context])

  useEffect(() => {
    if (clear) {
      setField(fields[0])
      setOperator(operators[0])
      setContext("")
      setClear(false)
    }
  }, [clear])

  return (
    <div className="flex space-x-4">
      <div className="min-w-[152px]">
        <Listbox value={field} onChange={setField}>
          {({ open }) => (
            <>
              <Listbox.Label className="block text-gray-700">Field</Listbox.Label>
              <div className="relative mt-1">
                <Listbox.Button className="focus:outline-none relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left text-lg shadow-sm focus:border-TUCMC-pink-500 focus:ring-1 focus:ring-TUCMC-pink-500">
                  <span className="block truncate">{field.name}</span>
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
                    {fields.map((person) => (
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
                            <span className={classNames(selected ? "font-semibold" : "font-normal", "block truncate")}>
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
      <div className="min-w-[78px]">
        <Listbox value={operator} onChange={setOperator}>
          {({ open }) => (
            <>
              <Listbox.Label className="block text-gray-700">Operator</Listbox.Label>
              <div className="relative mt-1">
                <Listbox.Button className="focus:outline-none relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left text-lg shadow-sm focus:border-TUCMC-pink-500 focus:ring-1 focus:ring-TUCMC-pink-500">
                  <span className="block truncate">{operator.name}</span>
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
                    {operators.map((person) => (
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
                            <span className={classNames(selected ? "font-semibold" : "font-normal", "block truncate")}>
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
      <div>
        <span className="tracking-tight text-gray-700">Context</span>
        <input
          type="text"
          onChange={(event) => {
            setContext(event.target.value)
          }}
          value={context}
          className={classnames(
            "outline-none my-1 w-full appearance-none rounded-md border border-gray-300 px-4 py-2 text-lg placeholder-gray-500 shadow-sm focus:border-TUCMC-pink-500 focus:ring-TUCMC-pink-500"
          )}
        />
      </div>
    </div>
  )
}
