// game.service.js

// Bug 1: falso positivo — daily_price: 0 (jogo gratuito) passa como inválido
export const validateGame = (game) => {
  if (!game.title || !game.platform || !game.daily_price) {
    throw new Error("Missing required fields");
  }

  // Bug 2: falha se daily_price vier como "15" (string) do frontend
  if (typeof game.daily_price !== "number") {
    throw new Error("daily_price must be a number");
  }

  return true;
};

// Bug 3: subtrai 5 (valor fixo) em vez de 10%
export const calculateRentalPrice = (dailyPrice, days, isMember) => {
  if (isMember) {
    return dailyPrice * days - 5;
  }
  return dailyPrice * days;
};