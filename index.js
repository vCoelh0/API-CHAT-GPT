require('dotenv').config()
const { OpenAI } = require('openai')

const express = require('express')
const app = express()
app.use(express.json())


const OPENAI_API_KEY = process.env.OPENAI_API_KEY
const openai = new OpenAI(OPENAI_API_KEY)

app.post('/pergunte-ao-chatgpt', async (req,res)=>{
    const { prompt } = req.body

    const model = 'gpt-3.5-turbo'
    const role = 'user'
    const max_tokens = 50

    // comunicação com o chat
    const completion = await openai.chat.completions.create({
        messages: [{ role: role, content: prompt }],
        model: model,
        max_tokens: max_tokens
    });

    console.log(prompt)
    res.json({completion: completion.choices[0].message.content})
})
const PORT = 4000
app.listen(PORT, () => console.log(`Em execução na porta ${PORT}`))
