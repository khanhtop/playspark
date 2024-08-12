export const sortUsers = (userA, userB) => {
  return [userA, userB].sort();
};

export const createChatParticipantsObject = (userA, userB) => {};

export const createChatName = (userA, userB) => {
  const sorted = sortUsers(userA, userB);
  return sorted.join("-");
};
