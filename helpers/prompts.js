export const wordleSystemPrompt = {
  role: "system",
  content: `Your task is to generate a JSON array of 5-letter words for use in a Wordle game.  The user will provide five examples, and you must add another five.  You must respond only in JSON`,
};

export const getWordlePrompt = () => {
  return {
    role: "system",
    content: `Your task is to generate a JSON array of 5-letter words for use in a Wordle game, based upon the theme of the words provided by the user.  The user will provide a list of words that they already have, and your task is to add five more words. You must not respond with any repeat words that the user has already provided. You must provide only five letter words. You must only respond in JSON as follows: {"words": []}`,
  };
};
