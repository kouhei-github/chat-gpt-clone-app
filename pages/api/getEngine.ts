import {NextApiRequest, NextApiResponse} from 'next'
import openai from '@/lib/chat_gpt'

type Option = {
  value: string
  label: string
}

type Data = {
  modeloptions: Option[]
}

/**
 * Handles incoming requests and sends back a JSON response with model options.
 *
 * @param {NextApiRequest} req - The incoming request object.
 * @param {NextApiResponse} res - The outgoing response object.
 * @return {Promise<void>} - A Promise that resolves when the response is sent.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse)
{
  const models = await openai.models.list().then((res) => res.data)
  const modelOptions = models.map((model) => ({
    value: model.id,
    label: model.id
  }))

  res.status(200).json({modelOptions})
}
