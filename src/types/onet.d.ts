export interface OnetRaw {
  status: string;
  responseTime: number;
  message: string[];
  Results: {
    series: Array<{
      seriesID: string;
      catalog: {
        occupation: string;
          [key: string]: unknown;
      };
      data: Array<{
        year: string;
        period: string;
        periodName: string;
        latest: string;
        value: string;
        footnotes: unknown[];
      }>;
    }>;
  };
}

export interface OnetSerie {
  serieId: string;
  fullSerieId: string;
  occupation: string;
  annualMedian: number;
}