import { Utility } from "./0.utility";
import { SingleLineQuestionSelector } from "./1.selector-singleline";
import { QuizQuestionSelector } from "./2.selector-quiz";
import { MatchColumnQuestionSelector } from "./3.selector-matchcolumn";


const filePath = 'data.txt';
const numberOfRandomQuestions = 10;
const allQuestions = Utility.readQuestionsFromFile(filePath);
//const selectedQuestions = SingleLineQuestionSelector.selectQuestions(allQuestions)
//const selectedQuestions = QuizQuestionSelector.selectQuestions(allQuestions);
const selectedQuestions = MatchColumnQuestionSelector.selectQuestions(allQuestions)

console.log(selectedQuestions)
console.log("=====================================================================================")
console.log("Total    ==> ", allQuestions.length)
console.log("Selected ==> ", selectedQuestions.length)
