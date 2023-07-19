/**
 * Share command metadata from a common spot to be used for both runtime
 * and registration.
 */

export const AWW_COMMAND = {
  name: 'awwww',
  description: 'Drop some cuteness on this channel.',
};

export const TOMI_CHAT_COMMAND = {
  name: 'chat',
  description: 'Hit TOMI up for some chit-chat',
  options: [
    {
        name: 'user_input',
        type: 3,
        description: 'Chat input from you to TOMI',
        required: true
    }
  ]
}

export const TOMI_RECIPE_COMMAND = {
  name: 'recipe',
  description: 'Hit Sous chef TOMI up for some recipe help, ideas or suggestions'
}

export const TOMI_PERSONA_COMMAND = {
  name: 'tomi_persona',
  description: 'Change TOMI persona'
}


