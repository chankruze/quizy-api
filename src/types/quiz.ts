/*
Author: chankruze (chankruze@gmail.com)
Created: Thu Apr 07 2022 20:02:37 GMT+0530 (India Standard Time)

Copyright (c) geekofia 2022 and beyond
*/

export type Option = {
  id: string
  label: string
  value: string
}

export type Question = {
  id: string
  title: string
  options: Array<Option>
  answer: string | number
}

export type MinifiedQuestion = {
  id: string
  title: string
  options: Array<Option>
}

export type Quiz = {
  _id: string
  title: string
  description: string
  branch: string
  semester: string
  startDate: string
  endDate: string
  questions: Array<Question>
  questionsCount?: number
}

export type MinifiedQuiz = {
  _id: string
  title: string
  branch: string
  semester: string
  date: Date
  questionsCount?: number
}
