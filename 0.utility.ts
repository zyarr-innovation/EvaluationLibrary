import * as fs from 'fs';

export class Utility {
    static generateUniqueRandomNumbers(limit: number): number[] {
        if (limit <= 0) {
            throw new Error("Limit must be greater than 0");
        }

        const numbers: number[] = Array.from({ length: limit }, (_, index) => index + 1);

        for (let i = numbers.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
        }

        return numbers.slice(0, limit);
    }

    static readQuestionsFromFile(filePath: string): string[] {
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        return fileContent.split('\n').map(line => line.trim()).filter(Boolean);
    }

    static selectRandomQuestions(questions: string[], numberOfQuestions: number): string[] {
        const randomIndexes = Utility.generateUniqueRandomNumbers(numberOfQuestions);
        return randomIndexes.map(index => questions[index - 1]);
    }
}

