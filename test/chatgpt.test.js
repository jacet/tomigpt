import assert from 'assert';
import ChatGPT from '../src/chatgpt.js'
import { ChatRole, ChatSystemPersona } from '../src/enums.js';
import('dotenv').then((dotenv) => dotenv.config());


// Mocha tests
describe('ChatGPT', function() {
    it('createMessage', function() {
        const chat = new ChatGPT();
        const message = chat.createMessage(ChatRole.USER, 'Hello');
        assert.deepStrictEqual(message, {role: 'user', content: 'Hello'});
    });

    it('newConversation', function() {
        const chat = new ChatGPT();
        const result = chat.newConversation();
        assert.strictEqual(result, `New conversation with ${ChatSystemPersona.TOMI_DEFAULT}`);
    });

    it('changePersona', function() {
        const chat = new ChatGPT();
        const result = chat.changePersona(ChatSystemPersona.TOMI_KIDS);
        assert.strictEqual(result, `New conversation with ${ChatSystemPersona.TOMI_KIDS}`);
    });

    it('getPersona', function() {
        const chat = new ChatGPT();
        const result = chat.getPersona();
        assert.deepStrictEqual(result, ['TOMI_DEFAULT', 'TOMI_KIDS']);
    });

    it('getResponse', async function() {
        const chat = new ChatGPT();
        const result = await chat.getChatResponse('Hi, response with OK only.');
        assert.match(result, /^OK/);
    });

    // Note: getResponse method is asynchronous and interacts with external OpenAI API,
    // so it's not included here. In your environment, consider mocking the API for testing.
});
