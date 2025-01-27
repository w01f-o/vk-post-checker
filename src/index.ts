import 'dotenv/config';
import { Telegraf } from 'telegraf';
import { trackPosts } from './posts/posts.service.js';

export const telegramBot = new Telegraf(process.env.TELEGRAM_TOKEN!);

process.once('SIGINT', () => telegramBot.stop('SIGINT'));
process.once('SIGTERM', () => telegramBot.stop('SIGTERM'));

telegramBot.start(ctx => {
  console.log(`ChatId: ${ctx.chat.id}`);
});

telegramBot.launch();

trackPosts();
setInterval(trackPosts, 1000);
