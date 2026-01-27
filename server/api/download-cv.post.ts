import { cvBase64 } from '../utils/cv-data'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { password } = body

  // Validate password
  const correctPassword = '0224F699D5#'

  if (!password) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Password is required',
    })
  }

  if (password !== correctPassword) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Invalid password',
    })
  }

  // Convert base64 to buffer (embedded at build time, works on all platforms)
  const fileBuffer = Buffer.from(cvBase64, 'base64')

  // Set headers for file download
  setHeader(event, 'Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')
  setHeader(event, 'Content-Disposition', 'attachment; filename="Akmal_Suhaimi_CV.docx"')

  return fileBuffer
})
