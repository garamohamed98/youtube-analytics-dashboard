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
      snippet: {
        title: string;
        publishedAt: string;
        customUrl:string;
      };
      statistics: {
        viewCount: string;
        subscriberCount: string;
        hiddenSubscriberCount: boolean;
        videoCount: string;
      };
    }
  ];
}

export interface videosSummaries {
  kind: string;
  etag: string;
  nextPageToken: string;
  prevPageToken: string;
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
          maxres: {
            url: string;
            width: number;
            height: number;
          };
        };
        channelTitle: string;
        liveBroadcastContent: string;
        publishTime: string;
      };
    }
  ];
}

export interface videosDetails {
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
          maxres: {
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

export interface videoGridRow {
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

export interface videoPaginatedData {
  videoGridRow: videoGridRow[];
  nextPageToken: string | null;
  currentPageToken: string | null;
  prevPageToken: string | null;
  totalResults: number | null;
}
