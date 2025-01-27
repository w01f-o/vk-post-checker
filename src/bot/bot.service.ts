import { telegramBot } from '../index.js';

export const sendTelegramMessage = async (message: string) => {
  try {
    await telegramBot.telegram.sendMessage(449255241, message);
  } catch (error) {
    console.error('Ошибка при отправке сообщения в Telegram', error);
  }
};
