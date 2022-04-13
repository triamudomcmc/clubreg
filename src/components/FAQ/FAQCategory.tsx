import { Accordion } from "@components/common/Accordion"
import { AccordionIcon } from "@components/common/Accordion/Icons"
import { FC } from "react"

export const FAQCategory: FC<{ questions: { group: string; data: Object } }> = ({ questions }) => {
  return (
    <div className="flex flex-col space-y-2">
      <h2 className="text-left text-xl font-semibold">{questions.group}</h2>
      <hr />
      <div>
        {Object.keys(questions.data).map((q, i) => {
          return (
            <Accordion Icon={AccordionIcon.Chevron} title={q} id={`q-${i}`}>
              <Accordion.Answer>{questions.data[q]}</Accordion.Answer>
            </Accordion>
          )
        })}
      </div>
    </div>
  )
}
