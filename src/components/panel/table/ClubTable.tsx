import { Input } from "@components/auth/Input";
import { Button } from "@components/common/Inputs/Button";
import Modal from "@components/common/Modals";
import { ExclamationIcon } from "@heroicons/react/outline";
import { CheckCircleIcon } from "@heroicons/react/solid";
import { FC, Fragment, MouseEvent, useState } from "react"
import { TableContactRow, TableRow, TableWebDataRow } from "./TableRow"
import { IContactType } from "./valueTypes"

export type TUpdateFieldFunction = (field: string, data: any) => Promise<{ status: boolean; report: string }>

interface IClubData {
  status: "pending" | "accepted" | "declined"
  audition: string
  message: string
  contact: IContactType | {}
  contact2: IContactType | {}
  contact3: IContactType | {}
  place: string
}

export const ClubDataTable: FC<{ data: IClubData; getCurrPanel: () => string; updateField: TUpdateFieldFunction }> = ({
  data,
  getCurrPanel,
  updateField,
}) => {
  return (
    <div>
      <h1 className="border-b border-gray-200 pb-4 text-xl">ข้อมูลชมรม</h1>

      <TableWebDataRow getCurrPanel={getCurrPanel} status={data.status} />

      <TableRow
        field="audition"
        title="ประเภทการรับสมัคร"
        initialData={{ type: "string", value: data.audition }}
        updateField={updateField}
      />
      <TableRow
        field="message"
        title="ข้อความถึงสมาชิกชมรม"
        editable
        initialData={{
          type: "string",
          value: data.message,
        }}
        updateField={updateField}
      />
      <TableContactRow
        title="ช่องทางการติดต่อชมรม"
        initialData={{
          contact: data.contact,
          contact2: data.contact2,
          contact3: data.contact3,
        }}
        updateField={updateField}
      />
      <TableRow
        field="place"
        title="สถานที่ทำการเรียนการสอน"
        editable
        initialData={{ type: "string", value: data.place }}
        updateField={updateField}
      />
    </div>
  )
}

interface IProportion {
  count_limit: number
  old_count_limit: number
}

export const ProportionTable: FC<{ data: IProportion; updateField: TUpdateFieldFunction }> = ({
  data,
  updateField,
}) => {
  // fetch value from api as intialValue
  // then every accept just upxate the api and then update the v alues idk just find a way to update the values as the apis update

  return (
    <div>
      <h1 className="border-b border-gray-200 pb-4 text-xl">สัดส่วนชมรม</h1>

      <TableRow
        field="count_limit"
        title="จำนวนนักเรียนในชมรมสูงสุด"
        editable
        initialData={{ type: "number", value: data.count_limit }}
        updateField={updateField}
      />
      <TableRow
        field="old_count_limit"
        title="จำนวนสมาชิกเก่าที่จะรับเข้าชมรม"
        editable
        initialData={{ type: "number", value: data.old_count_limit }}
        updateField={updateField}
      />
      {/* <div className="grid grid-cols-1 border-b border-gray-200 py-4 md:grid-cols-[2fr,3fr] md:items-center md:py-6">
        <p className="text-TUCMC-gray-600">จำนวนสมาชิกใหม่ที่จะรับเข้าชมรม</p>

        <div className="flex items-start space-x-2">
          <div className="block">{data.new_count_limit}</div>
        </div>
      </div> */}
    </div>
  )
}

export const ClubComitteeTable: FC<{}> = ({}) => {
  // add modal

  const [modalState, setModalState] = useState(false)
  const [closeState, setCloseState] = useState(false)
  const [modalState2, setModalState2] = useState(false)
  const [closeState2, setCloseState2] = useState(false)
  // add backend actions

  const enableModal = (e: MouseEvent<HTMLButtonElement>) => {setModalState2(true)}

  return (
    <div>
      <Modal overlayClassName="fixed flex flex-col items-center justify-center top-0 left-0 bg-black bg-opacity-20 w-full min-h-screen z-[99]" 
      className="flex flex-col items-center bg-white rounded-lg min-w-[340px]" 
      CloseDep={{dep: closeState, revert: () => {
        setCloseState(false)
      }}}
      TriggerDep={{dep: modalState, revert: () => {
        setModalState(false)
      }}}>
        <div className="flex flex-col items-center px-4 py-4">
          <div className="rounded-full bg-TUCMC-orange-200 p-3 mt-1 mb-2">
            <ExclamationIcon className="w-6 h-6 text-TUCMC-orange-500"/>
          </div>
          <div className="space-y-1">
            <h1 className="text-TUCMC-gray-900 text-center">เพิ่มกรรมการชมรม</h1>
            <p className="text-TUCMC-gray-500 text-center text-sm">โปรดกรอกข้อมูลด้วยความระมัดระวัง</p>
          </div>
        </div>
        <div className="px-4 py-4 bg-TUCMC-gray-100 space-y-6 rounded-b-lg w-full">
          <Input className="h-10" placeholder="เลขประจำตัวนักเรียน"/>
          <div className="space-y-2">
            <button className="bg-TUCMC-green-400 text-white w-full rounded-lg py-2">ถัดไป</button>
            <button onClick={() => {setCloseState(true)}} className="bg-white border border-gray-400 text-gray-TUCMC-600 w-full rounded-lg py-2">ยกเลิก</button>
          </div>
        </div>
      </Modal>
      <Modal overlayClassName="fixed flex flex-col items-center justify-center top-0 left-0 bg-black bg-opacity-20 w-full min-h-screen z-[99]" 
      className="flex flex-col items-center bg-white rounded-lg min-w-[340px]" 
      CloseDep={{dep: closeState2, revert: () => {
        setCloseState2(false)
      }}}
      TriggerDep={{dep: modalState2, revert: () => {
        setModalState2(false)
      }}}>
        <div className="flex flex-col items-center px-4 py-4 w-full">
          <div className="rounded-full bg-TUCMC-orange-200 p-3 mt-1 mb-2">
            <ExclamationIcon className="w-6 h-6 text-TUCMC-orange-500"/>
          </div>
          <div className="space-y-1 w-full">
            <h1 className="text-TUCMC-gray-900 text-center">เพิ่มกรรมการชมรม</h1>
            <p className="text-TUCMC-gray-600 text-center text-sm">คุณกำลังจะเพิ่ม</p>
            <div className="flex flex-col items-center text-sm border text-TUCMC-gray-600 py-2 border-TUCMC-gray-400 rounded-md w-full">
              <span>นายปณิธิ มักเที่ยงตรง</span>
              <span>ชั้น ม.4 ห้อง 444 เลขประจำตัว 5947</span>
            </div>
            <p className="text-TUCMC-gray-600 text-center text-sm">เป็นกรรมการชมรม</p>
          </div>
        </div>
        <div className="px-4 py-4 bg-TUCMC-gray-100 space-y-6 rounded-b-lg w-full">
          <Input type="password" className="h-10" placeholder="รหัสผ่าน"/>
          <div className="space-y-2">
            <button className="bg-TUCMC-green-400 flex items-center justify-center space-x-1 text-white w-full rounded-lg py-2">
              <CheckCircleIcon className="w-5 h-5"/><span>
                ยืนยัน
              </span>
            </button>
            <button onClick={() => {setCloseState2(true)}} className="bg-white border border-gray-400 text-gray-TUCMC-600 w-full rounded-lg py-2">ยกเลิก</button>
          </div>
        </div>
      </Modal>
      <div className="flex items-center justify-between">
        <h1 className="text-xl">กรรมการชมรม</h1>
        <button
          onClick={enableModal}
          className="rounded-full bg-TUCMC-pink-400 px-8 py-2 text-white transition-colors hover:bg-TUCMC-pink-500"
        >
          เพิ่มกรรมการชมรม
        </button>
      </div>

      <hr className="my-6" />

      <div className="flex flex-col space-y-6">
        <div className="flex flex-col items-start justify-between px-2 sm:flex-row sm:items-center sm:px-4">
          <div>
            <p>นายพีรดนย์ สาเงิน</p>
          </div>
          <div className="flex items-center justify-between space-x-12">
            <p>59476</p>

            <p>ม.4</p>

            <p>154</p>

            <div className="w-24"></div>
          </div>
        </div>

        <hr className="my-2" />

        <div className="flex flex-col items-start justify-between px-2 sm:flex-row sm:items-center sm:px-4">
          <div>
            <p>นายพีรดนย์ สาเงิน</p>
          </div>
          <div className="flex items-center justify-between space-x-12">
            <p>59476</p>

            <p>ม.4</p>

            <p>154</p>

            <button className="w-24 rounded-md border border-gray-300 bg-white py-2 text-gray-600 transition-colors hover:bg-gray-100">
              ลบ
            </button>
          </div>
        </div>

        <hr className="my-2" />
      </div>
    </div>
  )
}
