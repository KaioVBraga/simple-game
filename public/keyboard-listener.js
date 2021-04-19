export default function createKeyboardListener() {
  const state = {
    playerId: null,
    observers: [],
  };

  function registerPlayerId(playerId) {
    state.playerId = playerId;
  }

  function subscribe(observerFunction) {
    state.observers.push(observerFunction);
  }

  function notifyAll(command) {
    console.log(`Notifying ${state.observers.length} observers`);

    state.observers.map((observerFunction) => {
      observerFunction(command);
    });
  }

  document.addEventListener("keydown", handleKeydown);

  function handleKeydown(e) {
    const keyPressed = e.key;

    const command = {
      type: "move-player",
      playerId: state.playerId,
      keyPressed,
    };

    notifyAll(command);
  }

  return {
    subscribe,
    registerPlayerId,
  };
}
