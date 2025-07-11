export interface channelSearchResponse {
  kind: string;
  etag: string;
  items: [
    {
      id: {
        channelId: string;
      };
    }
  ];
}

export interface channelDetailsResponse {
  kind: string;
  etag: string;
  items: [
    {
      id: string;
      statistics: {
        viewCount: string;
        subscriberCount: string;
        hiddenSubscriberCount: boolean;
        videoCount: string;
      };
    }
  ];
}

export interface channelVideosList {
  kind: string;
  etag: string;
  nexPatgeToken: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
  items: [
    {
      kind: string;
      etag: string;
      id: {
        kind: string;
        videoId: string;
      };
      snippet: {
        publishedAt: string;
        channelId: string;
        title: string;
        description: string;
        thumbnails: {
          default: {
            url: string;
            width: 120;
            height: 90;
          };
        };
        channelTitle: "Jay Aliyev";
        liveBroadcastContent: "none";
        publishTime: "2025-06-27T13:01:37Z";
      };
    }
  ];
}

export interface channelVideosDetails {
  kind: string;
  etag: string;
  items: [
    {
      kind: string;
      etag: string;
      id: string;
      snippet: {
        publishedAt: string;
        channelId: string;
        title: string;
        description: string;
        thumbnails: {
          default: {
            url: string;
            width: number;
            height: number;
          };
        };
        channelTitle: string;
        categoryId: string;
        liveBroadcastContent: string;
        localized: {
          title: string;
          description: string;
        };
      };
      contentDetails: {
        duration: string;
        dimension: string;
        definition: string;
        caption: string;
        licensedContent: boolean;
        projection: string;
      };
      statistics: {
        viewCount: string;
        likeCount: string;
        favoriteCount: string;
        commentCount: string;
      };
    }
  ];
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
}

export interface channelVideoData {
  id: string;
  publishedAt: string;
  title: string;
  description: string;
  thumbnails: {
    url: string;
    width: number;
    height: number;
  };
  viewCount: string;
  likeCount: string;
  favoriteCount: string;
  commentCount: string;
}
