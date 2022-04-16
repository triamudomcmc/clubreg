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

  // add backend actions

  const enableModal = (e: MouseEvent<HTMLButtonElement>) => {}

  return (
    <div>
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
