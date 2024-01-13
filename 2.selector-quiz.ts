export interface QuizQuestion {
    question: string;
    optionList: string[];
    answer: number;
}

export class QuizQuestionSelector {

    static questionPattern = new RegExp(/^\d+\.\s*/);
    static answerPattern = new RegExp(/(?:\s*\*\*Correct Answer:\s*)(.)/)

    static selectQuestions(questions: string[]): QuizQuestion[] {
        const result: QuizQuestion[] = [];
        let currentQuestion: string | null = null;
        let currentOptions: string[] = [];
        let currentAnswer: string | null = null;

        const uniqueLines = new Set<string>();



        for (const line of questions) {
            const trimmedLine = line.trim();

            if (QuizQuestionSelector.questionPattern.test(trimmedLine)) {
                currentQuestion = trimmedLine.trim()
                currentQuestion = currentQuestion.replace(QuizQuestionSelector.questionPattern, '');
            } else if (QuizQuestionSelector.answerPattern.test(trimmedLine)) {
                let answerGroup = trimmedLine.match(QuizQuestionSelector.answerPattern) || "";
                currentAnswer = answerGroup[1]

                if (currentQuestion && currentAnswer) {
                    let isFound = uniqueLines.has(currentQuestion)

                    if (!isFound) {
                        const correctAnswerIndex = currentOptions.findIndex(option => option.startsWith(currentAnswer!)) + 1;
                        const questionObj: QuizQuestion = {
                            question: currentQuestion,
                            optionList: currentOptions,
                            answer: correctAnswerIndex
                        };
                        result.push(questionObj);

                        uniqueLines.add(currentQuestion)
                    }
                }

                currentQuestion = trimmedLine;
                currentOptions = [];
                currentAnswer = null;

            } else if (trimmedLine != "") {
                currentOptions.push(trimmedLine.trim());
            }
        }

        return result;
    };

}