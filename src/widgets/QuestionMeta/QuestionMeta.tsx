import type { IQuestion } from "@/shared/api/baseApi"
import './QuestionMeta.css'
import type { Specialization } from "../Filters/types"
import StatBadge from "@/shared/ui/StatBadge/StatBadge"

export interface QuestionMetaProps {
    question: IQuestion
}

function QuestionMeta({ question }: QuestionMetaProps) {
    return (
        <>
            <div className="meta__section">
                <h3 className="meta__section-title">Уровни</h3>
                <StatBadge label="Рейтинг:" stat={question.rate.toString()} />
                <StatBadge label="Сложность:" stat={question.complexity.toString()} />
            </div>
            <div className="meta__section">
                <h3 className="meta__section-title">Специализации</h3>
                {
                    question.questionSpecializations.map((s: Specialization) => (
                        <p key={`spec--${s.slug}`} className="meta__badge">{s.title}</p>
                    ))
                }
            </div>
            <div className="meta__section">
                <h3 className="meta__section-title">Специализации</h3>
                {
                    question.questionSpecializations.map((s: Specialization) => (
                        <p key={`spec--${s.slug}`} className="meta__badge">{s.title}</p>
                    ))
                }
            </div>
        </>
    )
}


export default QuestionMeta