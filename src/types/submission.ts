/*
Author: chankruze (chankruze@gmail.com)
Created: Sun Apr 24 2022 12:48:02 GMT+0530 (India Standard Time)

Copyright (c) geekofia 2022 and beyond
*/

type Answer = {
  [questionId: string]: string
}

export type Submission = {
  _id?: string
  quizId: string
  studentId: string
  answer: Answer
  date: string
}

export type MinifiedSubmission = {
  _id?: string
  quizId: string
  studentId: string
  date: string
}
