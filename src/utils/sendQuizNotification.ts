/*
Author: chankruze (chankruze@gmail.com)
Created: Fri May 06 2022 19:32:04 GMT+0530 (India Standard Time)

Copyright (c) geekofia 2022 and beyond
*/

import * as path from 'path'
import * as fs from 'fs'
import * as nodemailer from 'nodemailer'
import * as handlebars from 'handlebars'
import * as moment from 'moment-timezone'
import { Quiz } from '../types/quiz'

export const sendQuizNotification = async (
  recipients: String[],
  quiz: Quiz
) => {
  const { title } = quiz

  const subject = `🧪 Attend ${title}`
  const quizUrl = `${process.env.SERVER_HOST_DOMAIN}/quiz/${quiz._id}`
  const startDate = moment(quiz.startDate)
    .tz('Asia/Kolkata')
    .format('DD/MM/YYYY hh:mm A')
  const endDate = moment(quiz.endDate)
    .tz('Asia/Kolkata')
    .format('DD/MM/YYYY hh:mm A')

  // read the template
  const templatePath = path.join(
    __dirname,
    '../../templates/quiz-notification.html'
  )
  const source = fs.readFileSync(templatePath, 'utf-8').toString()
  const template = handlebars.compile(source)
  const replacements = {
    title: title,
    startDate,
    endDate,
    url: quizUrl,
    semester: quiz.semester,
    branch: quiz.branch,
    marks: quiz.questionsCount
  }
  const htmlToSend = template(replacements)

  const transporter = nodemailer.createTransport({
    service: 'SendinBlue',
    auth: {
      user: process.env.EMAIL_SERVER_USER,
      pass: process.env.EMAIL_SERVER_PASS
    }
  })

  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: recipients,
    subject: subject,
    text: quizUrl,
    html: htmlToSend
  })
}
