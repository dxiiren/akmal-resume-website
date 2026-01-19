import { readFileSync } from 'fs'
import { join } from 'path'

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

  try {
    // Read the CV file
    const filePath = join(process.cwd(), 'server', 'assets', 'cv-akmal.docx')
    const fileBuffer = readFileSync(filePath)

    // Set headers for file download
    setHeader(event, 'Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')
    setHeader(event, 'Content-Disposition', 'attachment; filename="Akmal_Suhaimi_CV.docx"')
    setHeader(event, 'Content-Length', fileBuffer.length)

    return fileBuffer
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to read CV file',
    })
  }
})
