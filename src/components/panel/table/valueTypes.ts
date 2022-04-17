interface StringType {
  type: "string"
  value: string
}

interface NumberType {
  type: "number"
  value: number
}

export interface IContactObject {
  type: string
  context: string
}

export interface IContactType {
  contact: IContactObject | {}
  contact2: IContactObject | {}
  contact3: IContactObject | {}
}

export type TValueTypes = StringType | NumberType
