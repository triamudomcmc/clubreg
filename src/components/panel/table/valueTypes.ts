interface StringType {
  type: "string"
  value: string
}

interface NumberType {
  type: "number"
  value: number
}

interface ArrayType {
  type: "array"
  value: string[]
}

export type TValueTypes = StringType | ArrayType | NumberType
