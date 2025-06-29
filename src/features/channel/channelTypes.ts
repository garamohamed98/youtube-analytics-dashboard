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
    }
  ];
}
