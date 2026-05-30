import type { IQuestion } from "@/shared/api/baseApi"
import type { Skill, Specialization } from "../Filters/types"
import StatBadge from "@/shared/ui/StatBadge/StatBadge"
import { Link } from "react-router-dom"

import './QuestionMeta.css'

export interface QuestionMetaProps {
    question: IQuestion
}

function QuestionMeta({ question }: QuestionMetaProps) {
    console.log(question)
    return (
        <div className="meta">
            <div className="meta__section">
                <h3 className="meta__section-title">Уровни</h3>
                <StatBadge label="Рейтинг:" stat={question.rate.toString()} />
                <StatBadge label="Сложность:" stat={question.complexity.toString()} />
            </div>
            <div className="meta__section">
                <h3 className="meta__section-title">Специализации</h3>
                {
                    question.questionSpecializations.map((s: Specialization) => (
                        <Link key={`spec--${s.slug}`} to={`/questions?specialization=${s.slug}`} className="meta__badge">{s.title}</Link>
                    ))
                }
            </div>
            <div className="meta__section">
                <h3 className="meta__section-title">Навыки</h3>
                {
                    question.questionSkills.map((skill: Skill) => (
                        <Link key={`skill--${skill.title}`} to={`/questions?skills=${skill.id}`} className="meta__purp-link">#{skill.title}</Link>
                    ))
                }
            </div>
            <div className="meta__section">
                <h3 className="meta__section-title">Ключевые слова</h3>
                {
                    question.keywords.map((k: string) => (
                        <Link key={`keyword--${k}`} to={`/questions?keywords=${k}`} className="meta__purp-link">#{k}</Link>
                    ))
                }
            </div>
        </div>
    )
}


export default QuestionMeta