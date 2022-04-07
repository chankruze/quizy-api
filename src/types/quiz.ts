/*
Author: chankruze (chankruze@gmail.com)
Created: Thu Apr 07 2022 20:02:37 GMT+0530 (India Standard Time)

Copyright (c) geekofia 2022 and beyond
*/

export type Option = {
  _id: string
  value: string
  label: string
  isCorrect: boolean
}

export type Question = {
  _id: string
  label: string
  options: Array<Option>
}

export type Quiz = {
  _id: string
  name: string
  semester: number
  branch: string
  questions: Array<Question>
}
