export interface VKPost {
  inner_type: string;
  donut: {
    is_donut: boolean;
  };
  comments: {
    can_post: number;
    count: number;
    groups_can_post: boolean;
  };
  marked_as_ads: number;
  hash: string;
  type: string;
  push_subscription: {
    is_subscribed: boolean;
  };
  attachments: Array<{ [key: string]: any }>;
  date: number;
  from_id: number;
  id: number;
  is_favorite: boolean;
  likes: {
    can_like: number;
    count: number;
    user_likes: number;
    can_publish: number;
    repost_disabled: boolean;
  };
  owner_id: number;
  post_source: {
    type: string;
  };
  post_type: string;
  reposts: {
    count: number;
    user_reposted: number;
  };
  text: string;
  views: {
    count: number;
  };
}
