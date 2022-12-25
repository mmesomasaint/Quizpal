/**
 * Sore a quiz by comparing the users answers with the db answers.
 * @param {Array} userAns an array containing answers supplied by user
 * @param {Array} realAns an array containing answers from db
 * @param {Boolean} useTF a boolean to determine the kind of marking scheme to use, if true use T/F marking scheme, otherwise use normal
 * @returns {Number} users score after comparing the two answers
 */
export default function Scorer(userAns, realAns, useTF = false) {
  // Score based on whether a t/f quiz or not.
  if (useTF) return scoreTF(userAns, realAns)
  return scoreN(userAns, realAns)
}

function scoreTF(userAns, realAns) {
  let score = realAns.length * 4
  // Score the true or false quiz
  for (let curRealAns = 0; curRealAns < realAns.length; curRealAns++) {
    // Find the current answer in users answers
    // if it's not there deduct mark.
    const curUserAns = userAns.find((uAns) => uAns.quizId === realAns[curRealAns].quizId)
    // if user didn't answer this question
    if (!curUserAns) {
      score -= 4
      continue
    }


    // else
    console.log(curUserAns)
    score -= negMarkSubanswers(curUserAns.choices, curRealAns.choices)
  }
}

function scoreN(userAns, realAns) {
  let score = 0

  // For every exact match in realAns, add score.
  for (const uAns of userAns) {
    const foundAns = realAns.find((rAns) => rAns.quizId === uAns.quizId)
    if (foundAns.choice === uAns.choice) score += 1
  }

  return score
}

function negMarkSubanswers(userSubanswer, realSubanswer) {
  console.log('reached here')
  let subScore = 0
  for (const usub_ans of userSubanswer) {
    const foundAns = realSubanswer.find(
      (rsub_ans) => rsub_ans.title === usub_ans.title
    )
    if (foundAns.active != usub_ans.active) subScore += 1
  }

  return subScore
}
