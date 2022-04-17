// Import the `Node` helper interface from Slate.
import { Node } from "slate"

// Define a serializing function that takes a value and returns a string.
export const serialize = (value) => {
  return (
    value
      // Return the string content of each paragraph in the value's children.
      .map((n) => Node.string(n))
      // Join them all with line breaks denoting paragraphs.
      .join("\n")
  )
}

// Define a deserializing function that takes a string and returns a value.
export const deserialize = (string) => {
  // Return a value array of children derived by splitting the string.
  return string.split("\n").map((line) => {
    return {
      children: [{ text: line }],
    }
  })
}
