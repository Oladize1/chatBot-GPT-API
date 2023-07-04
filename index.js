import openai from './config/open-ai.js'
import readLineSync from 'readline-sync'
import colors from 'colors'

async function main() {
    console.log(colors.bold.green('welcome to dizetechub ChatBot'))
    console.log(colors.bold.green('you can start chatting with the Bot'))
    console.log(colors.bold.green('type exit to leave the chat'))
        const chatHistory = []
    while(true){
        const userInput = readLineSync.question(colors.yellow('You: '))
        try {
            const messages = chatHistory.map(([role,content]) => ({role,content}))
            messages.push({role:'user', content: userInput})
            const completion = await openai.createChatCompletion({
                model: 'gpt-3.5-turbo',
                messages: messages
            })

                const completionText = completion.data.choices[0].message.content
            if(userInput.toLowerCase() === 'exit'){
                console.log(colors.yellow('Bot: '+ completionText))
                return;
            }
            console.log(colors.yellow('Bot: '+ completionText))
            chatHistory.push(['user', userInput])
            chatHistory.push(['assistant', completionText])
        } catch (error) {
            console.error(colors.red(error))
            
        }
    }
}

/*
async function name() {
    const userName = readLineSync.question('what is your name?')
    console.log(`hello ${colors.green.bold(userName)}`)
}
name()
*/
main()