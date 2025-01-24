// src/websocket.js
let socket = null;

function connectWebSocket(url, onMessage, onError, onClose) {
  return new Promise((resolve, reject) => {
    // Cria uma nova conexão WebSocket
    socket = new WebSocket(url);

    // Evento: conexão aberta
    socket.onopen = () => {
      console.log("[INFO] Conexão WebSocket estabelecida.");
      resolve(socket); // Conexão bem-sucedida, resolve a Promise
    };

    // Evento: erro na conexão
    socket.onerror = (error) => {
      console.error("[ERROR] WebSocket erro:", error);
      reject(error); // Se ocorrer erro, rejeita a Promise
      if (onError) onError(error);
    };

    // Evento: recebimento de mensagens
    socket.onmessage = (event) => {
      console.log("[INFO] Mensagem recebida:", event.data);
      if (onMessage) onMessage(event.data);
    };

    // Evento: conexão fechada
    socket.onclose = () => {
      console.log("[INFO] Conexão WebSocket encerrada.");
      if (onClose) onClose();
    };
  });
}

function sendMessage(message) {
  return new Promise((resolve, reject) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      console.log("[INFO] Enviando mensagem:", message);
      socket.send(message);
      resolve("Mensagem enviada com sucesso!"); // Resolve a promise se a mensagem for enviada
    } else {
      console.error("[ERROR] WebSocket não está conectado.");
      reject("WebSocket não está conectado."); // Rejeita a promise se o WebSocket não estiver aberto
    }
  });
}

export { connectWebSocket, sendMessage };
