export const getAvatarUser = (friendId, friends) => {
  const friendFind = friends.find((friend) => friend.id === friendId);
  return friendFind?.avatar;
};
