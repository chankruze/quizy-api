/*
Author: chankruze (chankruze@gmail.com)
Created: Thu Apr 07 2022 20:02:37 GMT+0530 (India Standard Time)

Copyright (c) geekofia 2022 and beyond
*/

export type Option = {
  label: string
  value: string
}

export type Question = {
  title: string
  options: Array<Option>
  answer: string | number
}

export type Quiz = {
  _id: string
  title: string
  description: string
  branch: string
  semester: string
  date: string
  questions: Array<Question>
}
