import { axiosInstance } from '../axiosInstances.js';
import { sendTelegramMessage } from '../bot/bot.service.js';
import { VKPost } from '../post.type.js';

const getLastPosts = async (): Promise<VKPost[]> => {
  try {
    const response = await axiosInstance.get(
      'https://api.vk.com/method/wall.get',
      {
        params: {
          access_token: process.env.VK_TOKEN,
          v: '5.131',
          owner_id: `-${process.env.GROUP_ID}`,
          count: 5,
        },
      }
    );

    const posts = response.data.response?.items || [];

    return posts;
  } catch (error) {
    console.error('Ошибка при получении постов:', error);

    return [];
  }
};

const findLinksInPost = (post: VKPost) => {
  const linksFromAttachments =
    post.attachments
      ?.filter(att => att.type === 'link')
      .map(att => att.link.url) || [];

  const extractLinksFromVKMarkdown = (text: string): string[] => {
    const regex = /\[([^\|]+)\|[^\]]+\]/g;
    const matches = [];
    let match;
    while ((match = regex.exec(text)) !== null) {
      matches.push(match[1]);
    }
    return matches;
  };

  const linksFromMarkdown = extractLinksFromVKMarkdown(post.text || '');
  const linksFromText = (post.text?.match(/https?:\/\/[^\s]+/g) || []).filter(
    url => !linksFromMarkdown.some(markdownUrl => url.includes(markdownUrl))
  );

  const allLinks = [
    ...linksFromMarkdown,
    ...linksFromAttachments,
    ...linksFromText,
  ];

  const uniqueLinks = Array.from(new Set(allLinks));

  return uniqueLinks;
};

let lastPostId: null | number = null;

export const trackPosts = async () => {
  const posts = await getLastPosts();
  if (!posts.length) {
    console.log('Постов в паблике нет');

    return;
  }

  const newPosts = posts.filter(post => post.id > (lastPostId || 0));
  if (newPosts.length) {
    newPosts.forEach(post => {
      const links = findLinksInPost(post);

      console.log(
        `Новый пост: 
              --------------------------------------------------------------------
              ${post.text}${
          links.length
            ? `
              --------------------------------------------------------------------
              Ссылки: ${links.reduce((acc, link) => `${acc}\n${link}`, '')}`
            : `
              --------------------------------------------------------------------
              Ссылок нет`
        }`
      );
      sendTelegramMessage(
        `Новый пост: 
--------------------------------------------------------------------
${post.text}${
          links.length
            ? `
--------------------------------------------------------------------
Ссылки: ${links.reduce((acc, link) => `${acc}\n${link}`, '')}`
            : `
--------------------------------------------------------------------
Ссылок нет`
        }`
      );
    });

    lastPostId = newPosts[0].id;
  } else {
    console.log('Новых постов нет.');
  }
};
