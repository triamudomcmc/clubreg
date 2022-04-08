import { Accordion } from "@components/common/Accordion"
import { ToolTip } from "@components/common/ToolTip"
import FAQElement from "@components/index/FAQ/Element"

const playground = () => {
  return (
    <div className="px-10 pt-10">
      <Accordion title="นักเรียนสามารถอยู่ได้กี่ชมรม" id="GATPAT">
        <Accordion.Answer>
          <Accordion title="นักเรียนสามารถอยู่ได้กี่ชมรม" id="GATPAT">
            <Accordion.Answer>1 ชมรมเท่านั้น</Accordion.Answer>
          </Accordion>
        </Accordion.Answer>
      </Accordion>

      <FAQElement title="นักเรียนสามารถอยู่ได้กี่ชมรม">
        <FAQElement.Answer>1 ชมรมเท่านั้น</FAQElement.Answer>
      </FAQElement>

      <Accordion title="นักเรียนสามารถอยู่ได้กี่ชมรม" id="GATPAT">
        <Accordion.Answer>1 ชมรมเท่านั้น</Accordion.Answer>
      </Accordion>

      <FAQElement title="นักเรียนสามารถอยู่ได้กี่ชมรม">
        <FAQElement.Answer>1 ชมรมเท่านั้น</FAQElement.Answer>
      </FAQElement>

      <Accordion title="นักเรียนสามารถอยู่ได้กี่ชมรม" id="GATPAT">
        <Accordion.Answer>1 ชมรมเท่านั้น</Accordion.Answer>
      </Accordion>

      <FAQElement title="นักเรียนสามารถอยู่ได้กี่ชมรม">
        <FAQElement.Answer>1 ชมรมเท่านั้น</FAQElement.Answer>
      </FAQElement>
    </div>
  )
}

export default playground
