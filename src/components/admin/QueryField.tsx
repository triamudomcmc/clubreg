import {Listbox, Transition} from "@headlessui/react";
import {CheckIcon, SelectorIcon} from "@heroicons/react/solid";
import React, {Fragment, useEffect, useState} from "react";
import {Input} from "@components/auth/Input";
import classnames from "classnames";

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export const QueryField = ({ clear, setClear, updateQuery }) => {

  const fields = [
    {id: 0, name: "student_id"},
    {id: 1, name: "firstname"},
    {id: 2, name: "lastname"},
    {id: 3, name: "level"},
    {id: 4, name: "room"},
    {id: 5, name: "club"}
  ]

  const operators = [
    {id: 0, name: "=="},
    {id: 1, name: "!="},
    {id: 2, name: ">"},
    {id: 3, name: ">="},
    {id: 4, name: "<"},
    {id: 5, name: "<="}
  ]

  const [field, setField] = useState(fields[0])
  const [operator, setOperator] = useState(operators[0])
  const [context, setContext] = useState("")

  useEffect(() => {
    updateQuery({
      field: field.name, operator: operator.name, context
    })
  }, [field, operator, context])

  useEffect(() => {
    if (clear) {
      setField(fields[0])
      setOperator(operators[0])
      setContext("")
      setClear(false)
    }
  },[clear])

  return (
    <div className="flex space-x-4">
      <div className="min-w-[152px]">
        <Listbox value={field} onChange={setField}>
          {({open}) => (
            <>
              <Listbox.Label className="block text-gray-700">Field</Listbox.Label>
              <div className="mt-1 relative">
                <Listbox.Button
                  className="bg-white relative w-full border border-gray-300 text-lg rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-TUCMC-pink-500 focus:border-TUCMC-pink-500">
                  <span className="block truncate">{field.name}</span>
                  <span
                    className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true"/>
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
                    className="absolute mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-lg ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none"
                  >
                    {fields.map((person) => (
                      <Listbox.Option
                        key={person.id}
                        className={({active}) =>
                          classNames(
                            active ? 'text-white bg-TUCMC-pink-600' : 'text-gray-900',
                            'cursor-default select-none relative py-2 pl-3 pr-9'
                          )
                        }
                        value={person}
                      >
                        {({selected, active}) => (
                          <>
                        <span
                          className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>
                          {person.name}
                        </span>

                            {selected ? (
                              <span
                                className={classNames(
                                  active ? 'text-white' : 'text-TUCMC-pink-600',
                                  'absolute inset-y-0 right-0 flex items-center pr-4'
                                )}
                              >
                            <CheckIcon className="h-5 w-5" aria-hidden="true"/>
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
          {({open}) => (
            <>
              <Listbox.Label className="block text-gray-700">Operator</Listbox.Label>
              <div className="mt-1 relative">
                <Listbox.Button
                  className="bg-white relative w-full border border-gray-300 text-lg rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-TUCMC-pink-500 focus:border-TUCMC-pink-500">
                  <span className="block truncate">{operator.name}</span>
                  <span
                    className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true"/>
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
                    className="absolute mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-lg ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none"
                  >
                    {operators.map((person) => (
                      <Listbox.Option
                        key={person.id}
                        className={({active}) =>
                          classNames(
                            active ? 'text-white bg-TUCMC-pink-600' : 'text-gray-900',
                            'cursor-default select-none relative py-2 pl-3 pr-9'
                          )
                        }
                        value={person}
                      >
                        {({selected, active}) => (
                          <>
                        <span
                          className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>
                          {person.name}
                        </span>

                            {selected ? (
                              <span
                                className={classNames(
                                  active ? 'text-white' : 'text-TUCMC-pink-600',
                                  'absolute inset-y-0 right-0 flex items-center pr-4'
                                )}
                              >
                            <CheckIcon className="h-5 w-5" aria-hidden="true"/>
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
        <span className="text-gray-700 tracking-tight">Context</span>
        <input
          type="text"
          onChange={event => {setContext(event.target.value)}}
          value={context}
          className={classnames("appearance-none outline-none border shadow-sm border-gray-300 rounded-md px-4 py-2 my-1 w-full focus:ring-TUCMC-pink-500 focus:border-TUCMC-pink-500 text-lg placeholder-gray-500")}/>

      </div>
    </div>
  )
}