import { telegramBot } from '../index.js';

export const sendTelegramMessage = async (message: string) => {
  try {
    const chatIds = process.env.TELEGRAM_CHAT_ID!.trim().split(',').map(Number);

    for (const chatId of chatIds) {
      await telegramBot.telegram.sendMessage(chatId, message);
    }
  } catch (error) {
    console.error('Ошибка при отправке сообщения в Telegram', error);
  }
};
