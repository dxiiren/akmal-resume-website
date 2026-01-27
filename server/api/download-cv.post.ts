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
    // Read the CV file using Nitro's storage API (works in production)
    const storage = useStorage('assets:server')
    const fileBuffer = await storage.getItemRaw('cv-akmal.docx')

    if (!fileBuffer) {
      throw new Error('CV file not found')
    }

    // Set headers for file download
    setHeader(event, 'Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')
    setHeader(event, 'Content-Disposition', 'attachment; filename="Akmal_Suhaimi_CV.docx"')

    return fileBuffer
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to read CV file',
    })
  }
})
