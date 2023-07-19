import { ChatRole, ChatSystemPersona } from './enums.js';

class ChatGPT {
    
  constructor(apiKey = undefined, systemRole = ChatSystemPersona.TOMI_DEFAULT) {
    this.currentPersona = systemRole;
    this.conversation = [];
    if (typeof apiKey !== 'undefined'){
      this.apiKey = apiKey;
    } 
    else if (typeof OPENAI_API_KEY !== 'undefined') {
        // Use the global variable if it's defined (in Cloudflare Workers)
        this.apiKey = OPENAI_API_KEY;
    } else if (typeof process !== 'undefined' && process && process.env && process.env.OPENAI_API_KEY) {
      // Otherwise, use the environment variable (locally)
      this.apiKey = process.env.OPENAI_API_KEY;
    } else {
      throw new Error('No OpenAI API key provided');
    }
  }

  createMessage(role, content) {
    return {
      role: role,
      content: content,
    };
  }

  newConversation() {
    this.conversation = [];
    return `New conversation with ${this.currentPersona}`;
  }

  changePersona(persona) {
    this.currentPersona = persona;
    return this.newConversation();
  }

  getPersona() {
    return Object.keys(ChatSystemPersona);
  }

  async getChatResponse(prompt) {
    if (this.conversation.length === 0) {
      this.conversation.push(this.createMessage(ChatRole.SYSTEM, this.currentPersona));
    }

    this.conversation.push(this.createMessage(ChatRole.USER, prompt));

    const requestOptions = {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: this.conversation,
      }),
    };

    const response = await fetch('https://api.openai.com/v1/chat/completions', requestOptions);
    const data = await response.json();
    
    //console.log('ChatGPT Response: ', data);

    const responseMessage = data.choices[0].message;
    this.conversation.push(responseMessage);
    return responseMessage.content;
  }
}

export default ChatGPT;
