export interface MatchColumnQuestion {
    columnA: string;
    columnB: string;
}

export class MatchColumnQuestionSelector {

    static columnAPattern = new RegExp(/^\d+\.\s*/);
    static columnBPattern = new RegExp(/^.+\.\s*/)

    static selectQuestions(questions: string[]): MatchColumnQuestion[] {

        // Filter out empty lines (if any)
        const filteredColumnMatchLines: string[] =
            questions.filter(line => line.trim() !== '').
                filter(line => !line.includes("Match the Column")).
                filter(line => !line.match(/Column A\s*\|\s*Column B/)).
                filter(line => !line.match(/^[-]+\|[ ]*[-]+$/))



        // Parse the filtered lines into an array of MatchColumnRecord
        const uniqueRecordsSet: Set<string> = new Set();
        const matchColumnRecordList: MatchColumnQuestion[] = [];

        filteredColumnMatchLines.forEach(line => {
            const columns = line.split('|').map(column => column.trim());
            const matchColumnRecord: MatchColumnQuestion = {
                columnA: columns[0].replace(MatchColumnQuestionSelector.columnAPattern, '').trim(),
                columnB: columns[1].replace(MatchColumnQuestionSelector.columnBPattern, '').trim(),
            };

            // Convert the record to a string for easy comparison
            const recordString = JSON.stringify(matchColumnRecord);

            // Check if the record is unique before adding it
            if (!uniqueRecordsSet.has(recordString)) {
                uniqueRecordsSet.add(recordString);
                matchColumnRecordList.push(matchColumnRecord);
            }
        });

        return matchColumnRecordList;
    };
}