import openai from '@/lib/chat_gpt'


const queryOpenAi = async (prompt: string, chatId: string, model: string) => {
  const completion = await openai.chat.completions.create({
    model: model,
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.9,
    max_tokens: 1000,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0
  })
  return completion.choices[0].message
}

export default queryOpenAi
