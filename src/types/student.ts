/*
Author: chankruze (chankruze@gmail.com)
Created: Fri Apr 08 2022 00:40:56 GMT+0530 (India Standard Time)

Copyright (c) geekofia 2022 and beyond
*/

export type BioData = {
  email: string
  name: string
  photo?: string
  fatherName: string
  branch: string
  semester: string
  regdNo: string
  gender: string
  dob: string
  caste: string
  mob: string
  fatherMob: string
}

export type Student = {
  _id?: string
  bioData: BioData
  verification: 'verified' | 'rejected' | 'pending'
  marks?: []
}
