import fetcher from './fetcher'

/**
 * Get the total quiz that would be
 * gotten from a query due to filter
 * inserted.
 */
export async function getTotalQuiz(course, topicIds) {
  const data = await fetcher(
    `
      query TotalQuiz($course: ItemId, $topicIds: [ItemId]) {
        _allQuizzesMeta(filter: {course: {eq: $course}, topic: {in: $topicIds}}) {
          count
        }
      }
    `,
    {
      variables: {
        course,
        topicIds,
      },
    }
  )

  return data?._allQuizzesMeta?.count
}

/**
 * Get the Ids of resulting quizzes from the
 * query inputed.
 */
export async function getQuizIds(first, skip, course, topicIds) {
  const data = await fetcher(
    `
      query MyQuery($first: IntType, $skip: IntType, $course: ItemId, $topicIds: [ItemId]) {
        allQuizzes(first: $first, skip: $skip, filter: {course: {eq: $course}, topic: {in: $topicIds}}) {
          id
        }
      }
    `,
    {
      variables: {
        first,
        skip,
        course,
        topicIds,
      },
    }
  )
  return data.allQuizzes.map((quiz) => quiz.id)
}

/**
 * Get all the topics in a course
 */
export async function getAllTopicsInCourse(course) {
  const data = await fetcher(
    `
      query AllCourseTopics($course: String) {
        course(filter: {name: {eq: $course}}) {
          topics {
            id
            name
          }
        }
      }
    `,
    {
      variables: {
        course,
      },
    }
  )

  return data?.course?.topics
}

/**
 * Get a quiz based on id.
 */
export async function getQuizById(id = 0) {
  const data = await fetcher(
    `
      query QuizById($id: ItemId) {
        quiz(filter: {id: {eq: $id}}) {
          id
          question
          options {
            option
          }
          tF
        }
      }
    `,
    {
      variables: {
        id,
      },
    }
  )

  return data.quiz
}

/**
 * Get all the answers of a quiz in t/f format
 * @param {Array} quizIds an array containing the id of all quiz to fetch answers of
 * @returns the answers in operable format
 */
export async function getTFAnswsers(quizIds) {
  const data = await fetcher(
    `
      query QuizTrueFalseAnswers($quizIds: [ItemId]) {
        allQuizzes(filter: {id: {in: $quizIds}}) {
          id
          answer {
            ... on AnswertFRecord {
              id
              subanswers {
                title
                trueOrFalse
              }
            }
          }
        }
      }
    `,
    {
      variables: {
        quizIds,
      },
    }
  )

  // Arrange the data in operable format.
  const realAnswers = data.allQuizzes.map((quiz) => {
    const _ans = quiz.answer
    const choices = _ans[0].subanswers.map((sub) => ({
      title: sub.title,
      active: sub.trueOrFalse,
    }))

    return { quizId: quiz.id, choices }
  })
  return realAnswers
}

/**
 * Get all the answers of a quiz in normal format
 * @param {Array} quizIds an array containing the id of all quiz to fetch answers of
 * @returns the answers in operable format
 */
export async function getNAnswers(quizIds) {
  const data = await fetcher(
    `
      query QuizNormalAnswers($quizIds: [ItemId]) {
        allQuizzes(filter: {id: {in: $quizIds}}) {
          id
          answer {
            ... on AnswernRecord {
              id
              optionText
            }
          }
        }
      }
    `,
    {
      variables: {
        quizIds,
      },
    }
  )

  // Arrange the data in operable format.
  const realAnswers = data.allQuizzes.map((quiz) => {
    const _ans = quiz.answer
    const choice = _ans[0].optionText

    return { quizId: quiz.id, choice }
  })

  return realAnswers
}
