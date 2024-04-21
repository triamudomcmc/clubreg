import { useToast } from "@components/common/Toast/ToastContext"
import { CheckIcon, PlusCircleIcon, XIcon } from "@heroicons/react/outline"
import { PencilIcon } from "@heroicons/react/solid"
import { isEmpty } from "@utilities/object"
import classNames from "classnames"
import { IContactObject, IContactType, TValueTypes } from "./valueTypes"
import { FC, Fragment, useEffect, useState } from "react"
import { TUpdateFieldFunction } from "./ClubTable"
import Link from "next/link"
import { useRouter } from "next/router"

const validateData = (data: TValueTypes) => {
  // if (value.type === "string" && value.value === "") return null
  if (data.type === "number" && isNaN(+data.value)) return { reason: "กรอกค่าเป็นตัวเลขเท่านั้น" }
  return null
}

const processData = (data: IContactType) => {
  const out = Object.keys(data).reduce((prev, curr) => {
    const newObj = { ...prev }

    const currContact: IContactObject = data[curr]
    newObj[curr] = !currContact?.context || !currContact?.type ? {} : currContact

    return newObj
  }, {}) as IContactType

  return out
}

export const TableContactRow: FC<{ initialData: IContactType; title: string; updateField: TUpdateFieldFunction }> = ({
  initialData,
  title,
  updateField,
}) => {
  const [beforeData, setBeforeData] = useState(processData(initialData))
  const [data, setData] = useState(processData(initialData))
  const [mode, setMode] = useState<"view" | "edit">("view")

  useEffect(() => {
    setData(processData(initialData))
    setBeforeData(processData(initialData))
  }, [initialData])

  const onComfirm = async () => {
    // const errors = validateData(data)
    // if (errors) {
    //   onDecline()
    //   // addToast
    //   return
    // }

    const processedData = processData(data)

    const out = await updateField("contact", {
      type: "contact_object",
      value: isEmpty(processedData.contact) ? {} : processedData.contact,
    })
    const out2 = await updateField("contact2", {
      type: "contact_object",
      value: isEmpty(processedData.contact2) ? {} : processedData.contact2,
    })
    const out3 = await updateField("contact3", {
      type: "contact_object",
      value: isEmpty(processedData.contact3) ? {} : processedData.contact3,
    })

    const filteredOutputs = [out, out2, out3].filter((e) => !e.status)

    if (filteredOutputs.length !== 0) {
      // should be toast
      filteredOutputs.forEach((o) => {
        console.error(o.report)
      })

      onDecline()
      return
    }

    setBeforeData(processedData)
    setData(processedData)

    setMode("view")
  }

  const onDecline = () => {
    setData(beforeData)
    setMode("view")
  }

  return (
    <div className="grid grid-cols-1 border-b border-gray-200 py-4 md:grid-cols-[2fr,3fr] md:items-center md:py-6">
      <p className="text-TUCMC-gray-600">{title}</p>
      {mode === "view" && (
        <div className="fle=x items-start space-y-2">
          <div className="flex flex-col items-start space-y-2">
            {Object.values(data)
              .filter((e: IContactObject) => !isEmpty(e))
              .map((e: IContactObject, i) => (
                <p key={`${e.type}-${e.context}-${i}`}>
                  {e.type} : {e.context}
                </p>
              ))}
          </div>

          <button onClick={() => setMode("edit")}>
            <PencilIcon className="h-5 w-5 text-gray-900" />
          </button>
        </div>
      )}

      {mode === "edit" && (
        <div className="flex flex-col items-start space-y-4">
          <div className="flex space-x-2">
            <input
              value={(data.contact as IContactObject)?.type ?? ""}
              onChange={(e) =>
                setData({ ...data, contact: { ...(data.contact as IContactObject), type: e.target.value } })
              }
              className="w-20 rounded-md border border-gray-300"
              type="text"
              placeholder="FB"
            />
            <input
              value={(data.contact as IContactObject)?.context ?? ""}
              onChange={(e) =>
                setData({ ...data, contact: { ...(data.contact as IContactObject), context: e.target.value } })
              }
              className="rounded-md border border-gray-300"
              type="text"
              placeholder="TUCMC"
            />
          </div>

          <div className="flex space-x-2">
            <input
              value={(data.contact2 as IContactObject)?.type ?? ""}
              onChange={(e) =>
                setData({ ...data, contact2: { ...(data.contact2 as IContactObject), type: e.target.value } })
              }
              className="w-20 rounded-md border border-gray-300"
              type="text"
              placeholder="IG"
            />
            <input
              value={(data.contact2 as IContactObject)?.context ?? ""}
              onChange={(e) =>
                setData({ ...data, contact2: { ...(data.contact2 as IContactObject), context: e.target.value } })
              }
              className="rounded-md border border-gray-300"
              type="text"
              placeholder="tucmc_official"
            />
          </div>

          <div className="flex space-x-2">
            <input
              value={(data.contact3 as IContactObject)?.type ?? ""}
              onChange={(e) =>
                setData({ ...data, contact3: { ...(data.contact3 as IContactObject), type: e.target.value } })
              }
              className="w-20 rounded-md border border-gray-300"
              type="text"
              placeholder="Line"
            />
            <input
              value={(data.contact3 as IContactObject)?.context ?? ""}
              onChange={(e) =>
                setData({ ...data, contact3: { ...(data.contact3 as IContactObject), context: e.target.value } })
              }
              className="rounded-md border border-gray-300"
              type="text"
              placeholder="@TUCMC"
            />
          </div>

          <div className="flex space-x-2">
            <button className="rounded-md bg-green-400 p-2 transition-colors hover:bg-green-500" onClick={onComfirm}>
              <CheckIcon className="h-5 w-5 text-white" />
            </button>
            <button className="rounded-md bg-red-400 p-2 transition-colors hover:bg-red-500" onClick={onDecline}>
              <XIcon className="h-5 w-5 text-white" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export const TableRow: FC<{
  editable?: boolean
  description?: string
  title: string
  field: string
  declineVal?: boolean
  initialData: TValueTypes
  updateField: TUpdateFieldFunction
  validateFunc?: (data) => { reason: string } | null
}> = ({ editable, title, description, initialData, field, updateField, validateFunc, declineVal = false }) => {
  const [beforeData, setBeforeData] = useState(initialData)
  const [data, setData] = useState(initialData)
  const [mode, setMode] = useState<"view" | "edit">("view")

  useEffect(() => {
    setData(initialData)
    setBeforeData(initialData)
  }, [initialData])

  const { addToast } = useToast()

  const onComfirm = async () => {
    const validateErrors = validateData(data)

    if (validateFunc) {
      const validateFuncOut = validateFunc(data)

      if (validateFuncOut?.reason && validateFuncOut?.reason === "teacher_to_student") {
        addToast({
          theme: "modern",
          icon: "warning",
          title: "จำนวนนักเรียนในชมรมสูงสุดไม่สอดคล้องกับจำนวนที่ปรึกษา",
          text: "ครูที่ปรึกษา 1 คน ควรมีสัดส่วนต่อนักเรียนในชมรมไม่น้อยกว่า 26.5 คน",
        })
      }

      if (validateFuncOut?.reason && validateFuncOut?.reason === "limit_exceded") {
        addToast({
          theme: "modern",
          icon: "cross",
          title: "ไม่สามารถกำหนดจำนวนสมาชิกเก่าได้",
          text: "จำนวนสมาชิกเก่าที่จำยืนยันสิทธิ์ได้จะต้องไม่เกิน 33% ของจำนวนนักเรียนในชมรมสูงสุด",
        })
      }

      if (declineVal) {
        if (validateFuncOut?.reason) {
          return
        }
      }

      if (validateErrors) {
        onDecline()
        // toast errors
        return
      }
    }

    const out = await updateField(field, data)

    if (!out.status) {
      // should be toast
      console.error(out.report)
      onDecline()
      return
    }

    setBeforeData(data)
    setMode("view")
  }

  const onDecline = () => {
    setData(beforeData)
    setMode("view")
  }

  return (
    <div className="grid grid-cols-1 border-b border-gray-200 py-4 md:grid-cols-[2fr,3fr] md:items-center md:py-6">
      <div className="flex flex-col">
        <p className="text-TUCMC-gray-600">{title}</p>
        {description && <p className="mb-1 text-sm text-TUCMC-gray-500">{description}</p>}
      </div>
      {mode === "view" && (
        <div className="flex items-start space-x-2">
          <div className="block">{data.value}</div>
          {editable && (
            <button onClick={() => setMode("edit")}>
              <PencilIcon className="h-5 w-5 text-gray-900" />
            </button>
          )}
        </div>
      )}

      {editable && mode === "edit" && (
        <div className="flex items-center space-x-2">
          {data.type === "string" && (
            <textarea
              className="w-full rounded-md border border-gray-300"
              // type="text"
              onChange={(e) => setData({ ...data, value: e.target.value })}
              // value={value.value}
              placeholder={String(initialData.value)}
              value={data.value}
            />
          )}

          {data.type === "number" && (
            <input
              className="rounded-md border border-gray-300"
              type="number"
              onChange={(e) => {
                if (isNaN(+e.target.value)) return
                setData({ ...data, value: +e.target.value })
              }}
              value={String(data.value)}
              placeholder={String(initialData.value)}
            />
          )}

          <div className="flex space-x-2">
            <button className="rounded-md bg-green-400 p-2 transition-colors hover:bg-green-500" onClick={onComfirm}>
              <CheckIcon className="h-5 w-5 text-white" />
            </button>
            <button className="rounded-md bg-red-400 p-2 transition-colors hover:bg-red-500" onClick={onDecline}>
              <XIcon className="h-5 w-5 text-white" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export const StatusText: FC<{ status: "declined" | "accepted" | "pending" }> = ({ status }) => {
  return (
    <div className="flex items-center space-x-2">
      {status === "declined" && (
        <>
          <div className="h-5 w-5 rounded-full bg-red-400" />
          <p className="text-red-400">ไม่ผ่านการตรวจสอบ</p>
        </>
      )}
      {status === "accepted" && (
        <>
          <div className="h-5 w-5 rounded-full bg-green-400" />
          <p className="text-green-400">ผ่านการตรวจสอบ</p>
        </>
      )}
      {status === "pending" && (
        <>
          <div className="h-5 w-5 rounded-full bg-TUCMC-orange-400" />
          <p className="text-TUCMC-orange-400">อยู่ระหว่างการตรวจสอบ</p>
        </>
      )}
    </div>
  )
}

const removeSectionSlugs = (currPanel: string) => {
  let res = currPanel.split("_")[0]
  return res.startsWith("ก30920") && res !== "ก30920-8" && res !== "ก30920-9" ? "ก30920" : res
}

export const TableWebDataRow: FC<{
  status: "declined" | "accepted" | "pending"
  reason?: string
  getCurrPanel: () => string
}> = ({ status, getCurrPanel, reason }) => {
  const [currStatus, setStatus] = useState(status)
  const [currReason, setReason] = useState(reason)

  const router = useRouter()

  useEffect(() => {
    setStatus(status)
  }, [status])

  useEffect(() => {
    setReason(reason)
  }, [reason])

  return (
    <div className="grid grid-cols-1 space-y-2 border-b border-gray-200 py-4 md:grid-cols-[2fr,3fr] md:items-center md:space-y-0 md:py-6">
      <div className="flex flex-col">
        <p className="text-TUCMC-gray-600">การแสดงผลในเว็บไซต์</p>
        <p className="text-sm text-TUCMC-gray-500">แก้ไขข้อมูลชมรมที่จะแสดงในหน้าเว็บไซต์</p>
      </div>
      <div className="flex space-x-12">
        <button
          onClick={() => {
            const currPanel = getCurrPanel()
            router.push(`/clubs/${removeSectionSlugs(currPanel)}/edit`)
          }}
          className="rounded-md border border-gray-300 bg-white py-2 px-8 transition-colors hover:bg-gray-100"
        >
          แก้ไข
        </button>

        <div className="flex items-center space-x-2">
          <StatusText status={currStatus} />
          {currStatus === "declined" && currReason && (
            <p className="text-sm text-TUCMC-red-400">สาเหตุ: {currReason}</p>
          )}
        </div>
      </div>
    </div>
  )
}
