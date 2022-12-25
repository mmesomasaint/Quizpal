import { getQuizIds, getTotalQuiz } from './quiz'

const COURSES = [
  {
    id: '64300453',
    name: 'Computer Sci.',
  },
  {
    id: '63986486',
    name: 'Pharmacognosy',
  },
  {
    id: '64300439',
    name: 'Biopharmaceutics',
  },
  {
    id: '63986464',
    name: 'Pharmacology',
  },
  {
    id: '63986501',
    name: 'Pharm. Chemistry',
  },
  {
    id: '64300421',
    name: 'Pharm. Management',
  },
]

/**
 * Convert text of courses to their ids
 */
export function getId(course) {
  const fullDetail = COURSES.find((c) => c.name === course)
  return fullDetail.id
}

/**
 * Generates the IDs of the quizzes based on
 * the total number of quiz from a selected
 * course, topics abd total number of questions
 * required by the operator and returns the array
 * containing the IDs
 */
export async function generator(course, topicIds, totalNum) {
  const totalQuiz = await getTotalQuiz(getId(course), topicIds)
  const first = totalNum
  let skip = 0
  if (first === totalQuiz || first > totalQuiz) {
    const ids = await getQuizIds(
      Math.min(first, totalQuiz),
      skip,
      getId(course),
      topicIds
    )
    return shuffle(ids)
  } else {
    // If total number required is lesser.
    // select a random number between 0 and
    //
    skip = Math.floor(Math.random() * (totalQuiz - first))
    const ids = await getQuizIds(first, skip, getId(course), topicIds)
    return shuffle(ids)
  }
}

/**
 * Shuffle (randomize) an array.
 */
function shuffle(array) {
  let currentIndex = array.length,
    randomIndex

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex--

    // And swap it with the current element.
    ;[array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ]
  }

  return array
}
