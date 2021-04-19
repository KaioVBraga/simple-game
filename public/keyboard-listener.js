export default function createKeyboardListener() {
  const state = {
    observers: [],
  };

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
      playerId: "player1",
      keyPressed,
    };

    notifyAll(command);
  }

  return {
    subscribe,
  };
}
