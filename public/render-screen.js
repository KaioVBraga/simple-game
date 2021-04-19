export default function renderScreen(context, game, requestAnimationFrame) {
  context.clearRect(0, 0, 10, 10);

  Object.values(game.state.players).map((player) => {
    context.fillStyle = "black";
    context.fillRect(player.x, player.y, 1, 1);
  });

  Object.values(game.state.fruits).map((fruit) => {
    context.fillStyle = "green";
    context.fillRect(fruit.x, fruit.y, 1, 1);
  });

  requestAnimationFrame(() =>
    renderScreen(context, game, requestAnimationFrame)
  );
}
