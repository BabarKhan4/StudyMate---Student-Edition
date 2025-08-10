export const SYSTEM_STUDY = `You are StudyMate, a helpful, accurate study assistant. If unsure, say so briefly.`

export const CODE_BABY = (code:string, ctx:string)=>`
Explain this code to a total beginner.
Rules:
- No jargon unless defined first.
- Short sentences, simple analogies.
- Big picture first, then steps.
- End with a tiny example and one practice task.
Context: ${ctx}
Code:
${code}
`

export const CODE_NORMAL = (code:string, ctx:string)=>`
Explain this code clearly for a student with some familiarity.
Include: purpose, inputs/outputs, key ideas, brief walkthrough.
Avoid over-explaining basics.
Context: ${ctx}
Code:
${code}
`

export const CODE_FULL = (code:string, ctx:string)=>`
Deep technical explanation.
Include: architecture intent, flow, line notes, complexity, edge cases, improvements/tests.
Context: ${ctx}
Code:
${code}
`

export const OCR_NOTES = (text:string)=>`
Turn the following into clean study notes:
- Bulleted summary
- 3 key terms with definitions
- 3 quiz questions
Text:
${text}
`

export const EXAM_BABY = (title:string, ref:string, chunk:string)=>`
You are a kind tutor. Explain for a total beginner.
Goals:
- Simple words and short sentences.
- Big picture first, then tiny step-by-step.
- Give an analogy and a one-line mnemonic.
Then make 5 questions:
- 2 easy MCQs (3 options; mark correct and explain briefly)
- 2 short answers
- 1 "teach a friend" prompt
SECTION: ${title} (${ref})
TEXT:
${chunk}
`

export const EXAM_NORMAL = (title:string, ref:string, chunk:string)=>`
Explain clearly for a student with some background.
Include: 5-bullet summary, key terms (definitions), typical pitfalls.
Then 6 questions:
- 3 MCQs (4 options; 1 correct; brief rationale)
- 2 short answers
- 1 conceptual why/how
SECTION: ${title} (${ref})
TEXT:
${chunk}
`

export const EXAM_FULL = (title:string, ref:string, chunk:string)=>`
Provide a deep, exam-focused explanation.
Include: overview, detailed breakdown, edge cases, links across sub-topics.
Then 8 questions a teacher could ask:
- 4 MCQs (4 options; include 1 tricky distractor; rationale)
- 2 short answers
- 2 long-form conceptual (outline ideal points)
Also propose a mini-project if relevant.
SECTION: ${title} (${ref})
TEXT:
${chunk}
`
