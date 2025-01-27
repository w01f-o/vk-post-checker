import { telegramBot } from '../index.js';

export const sendTelegramMessage = async (message: string) => {
  try {
    await telegramBot.telegram.sendMessage(
      process.env.TELEGRAM_CHAT_ID!,
      message
    );
  } catch (error) {
    console.error('Ошибка при отправке сообщения в Telegram', error);
  }
};
