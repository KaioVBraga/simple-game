export default function createGame() {
  const state = {
    players: {},
    fruits: {},
    screen: {
      width: 10,
      height: 10,
    },
  };

  function addPlayer(command) {
    const { playerId, playerX: x, playerY: y } = command;

    state.players[playerId] = { x, y };
  }

  function removePlayer(command) {
    const { playerId } = command;

    delete state.players[playerId];
  }

  function addFruit(command) {
    const { fruitId, fruitX: x, fruitY: y } = command;

    state.fruits[fruitId] = { x, y };
  }

  function removeFruit(command) {
    const { fruitId } = command;

    delete state.fruits[fruitId];
  }

  function movePlayer(command) {
    const moves = {
      ArrowUp(player) {
        if (player.y > 0) {
          player.y -= 1;
        }

        return "up";
      },
      ArrowDown(player) {
        if (player.y < state.screen.height - 1) {
          player.y += 1;
        }

        return "down";
      },
      ArrowLeft(player) {
        if (player.x > 0) {
          player.x -= 1;
        }

        return "left";
      },
      ArrowRight(player) {
        if (player.x < state.screen.width - 1) {
          player.x += 1;
        }

        return "right";
      },
    };

    const moveFunction = moves[command.keyPressed];

    if (!moveFunction) {
      return;
    }

    const player = state.players[command.playerId];

    if (!player) {
      return;
    }

    moveFunction(player);
    checkForFruitCollision(command.playerId);

    console.log(`Moving ${command.playerId} width ${command.keyPressed}`);
  }

  function checkForFruitCollision(playerId) {
    const { players, fruits } = state;

    const player = players[playerId];

    Object.keys(fruits).map((fruitId) => {
      const fruit = fruits[fruitId];

      console.log(
        `Checking collision between player ${playerId} and fruit ${fruitId}`
      );

      if (player.x === fruit.x && player.y === fruit.y) {
        removeFruit({ fruitId });
      }
    });
  }

  return {
    checkForFruitCollision,
    addFruit,
    removeFruit,
    addPlayer,
    removePlayer,
    movePlayer,
    state,
  };
}
