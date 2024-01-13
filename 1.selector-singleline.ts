export class SingleLineQuestionSelector {
    static selectQuestions(questions: string[]): string[] {
        const uniqueLines = new Set<string>();

        let duplicates: string[] = [];
        questions.forEach(line => {
            if (uniqueLines.has(line)) {
                duplicates.push(line);
            } else {
                uniqueLines.add(line.replace(/^\d+\.\s*/, ''));
            }
        });
        return Array.from(uniqueLines);
    }
}