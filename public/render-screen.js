export default function renderScreen(
  context,
  game,
  requestAnimationFrame,
  currentPlayerId
) {
  context.clearRect(0, 0, 10, 10);

  Object.values(game.state.players).map((player) => {
    context.fillStyle = "black";
    context.fillRect(player.x, player.y, 1, 1);
  });

  Object.values(game.state.fruits).map((fruit) => {
    context.fillStyle = "green";
    context.fillRect(fruit.x, fruit.y, 1, 1);
  });

  const currentPlayer = game.state.players[currentPlayerId];

  if (currentPlayer) {
    context.fillStyle = "#F0DB4F";
    context.fillRect(currentPlayer.x, currentPlayer.y, 1, 1);
  }

  requestAnimationFrame(() =>
    renderScreen(context, game, requestAnimationFrame, currentPlayerId)
  );
}
