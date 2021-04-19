export default function createGame() {
  const state = {
    players: {},
    fruits: {},
    screen: {
      width: 10,
      height: 10,
    },
  };

  const observers = [];

  function start() {
    const frequency = 2000;
    setInterval(addFruit, frequency);
  }

  function subscribe(observerFunction) {
    observers.push(observerFunction);
  }

  function notifyAll(command) {
    observers.map((observerFunction) => {
      observerFunction(command);
    });
  }

  function setState(newState) {
    Object.assign(state, newState);
  }

  function addPlayer(command) {
    const { playerId, playerX, playerY } = command || {};

    const x = playerX || Math.floor(Math.random() * state.screen.width);
    const y = playerY || Math.floor(Math.random() * state.screen.height);

    state.players[playerId] = { x, y };

    notifyAll({
      type: "add-player",
      playerId,
      playerX: x,
      playerY: y,
    });
  }

  function removePlayer(command) {
    const { playerId } = command;

    delete state.players[playerId];

    notifyAll({
      type: "remove-player",
      playerId,
    });
  }

  function addFruit(command) {
    const { fruitId, fruitX, fruitY } = command || {};

    const id = Math.floor(Math.random() * 10000000);
    const x = fruitX || Math.floor(Math.random() * state.screen.width);
    const y = fruitY || Math.floor(Math.random() * state.screen.height);

    state.fruits[fruitId] = { x, y };

    notifyAll({
      type: "add-fruit",
      fruitId: id,
      fruitX: x,
      fruitY: y,
    });
  }

  function removeFruit(command) {
    const { fruitId } = command;

    delete state.fruits[fruitId];
  }

  function movePlayer(command) {
    notifyAll(command);

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
    start,
    setState,
    checkForFruitCollision,
    addFruit,
    removeFruit,
    addPlayer,
    removePlayer,
    movePlayer,
    subscribe,
    state,
  };
}
