import { Accordion } from "@components/common/Accordion"
import { AccordionIcon } from "@components/common/Accordion/Icons"
import { MinusIcon, PlusIcon } from "@heroicons/react/solid"
import classNames from "classnames"
import { FC, useEffect, useState } from "react"

export const FAQCategory: FC<{ questions: Record<string, string>; title: string; searchContext: string }> = ({
  questions,
  title,
  searchContext,
}) => {
  /**
   * title: "เกี่ยวกับ กช.",
   * questions: {
   *  นักเรียนแลกเปลี่ยนต้องทำอย่างไร: "นักเรียนที่กำลังจะไปแลกเปลี่ยนในปีการศึกษา 2564 กรณีไปแลกเปลี่ยนหลังช่วงลงทะเบียนชมรม หากยังอยู่ทันในช่วงที่มีระบบลงทะเบียน (7-14 มิ.ย. 2564) ให้ลงทะเบียนชมรมเอาไว้เช่นเดียวกับนักเรียนทั่วไป ในกรณีที่ต้องการกลับมาอยู่ชมรมเดิมในปีการศึกษาถัดมา ก็ให้แจ้งครูที่ปรึกษาชมรมไว้ด้วยส่วนนักเรียนที่กลับมาจากแลกเปลี่ยน (กำลังจะเข้าเรียนในปีการศึกษา 2564) กรณีกลับมาทันระบบลงทะเบียนชมรม (7-14 มิ.ย. 2564) สามารถลงชื่อออดิชันหรือลงทะเบียนชมรมต่าง ๆ ได้ตามปกติ หรือหากลงชื่อเป็นกรรมการชมรมไว้แล้วก็ถือว่าได้เป็นสมาชิกของชมรมนั้นแล้ว ในกรณีกลับมาไม่ทันช่วงลงทะเบียนชมรม ให้ไปติดต่องานทะเบียน หากไม่มีชมรมที่ต้องการก็จะได้ไปอยู่ชมรมนักเรียนแลกเปลี่ยน แต่หากไม่อยากอยู่ชมรมแลกเปลี่ยน ก็ให้ไปติดต่อกับครูที่ปรึกษาของชมรมที่เราต้องการจะอยู่ และแจ้งที่งานทะเบียนว่าต้องการย้ายชมรม จากนั้นงานทะเบียนจะแนะวิธีการถัดไปให้",
   *  ถ้าลืมรหัสผ่านจะต้องทำอย่างไร: "กดปุ่ม \"ลืมรหัสผ่าน\" บนหน้าเข้าสู่ระบบหรือ<a href=\"/contact\">ติดต่อ กช.</a>"
   * }
   */

  const [expanded, setExpanded] = useState(false)

  useEffect(() => {
    setExpanded(searchContext !== "")
  }, [searchContext])

  return (
    <div className={classNames(expanded ? "mb-8" : "mb-2", "flex flex-col space-y-4")}>
      <div className="flex justify-between px-4">
        <h2 className="text-left text-xl font-semibold">{title}</h2>
        <button onClick={() => setExpanded(!expanded)}>
          {expanded ? <MinusIcon className="h-5 w-5 text-gray-600" /> : <PlusIcon className="h-5 w-5 text-gray-600" />}
        </button>
      </div>
      <hr />
      <div>
        {expanded &&
          Object.keys(questions).map((q, i) => {
            return (
              <Accordion Icon={AccordionIcon.Chevron} key={`q-${q}-${i}`} title={q} id={`q-${q}-${i}`}>
                <Accordion.Answer>{questions[q]}</Accordion.Answer>
              </Accordion>
            )
          })}
      </div>
    </div>
  )
}
