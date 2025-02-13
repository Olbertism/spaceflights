/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface Article {
  id: number;
  /** @maxLength 250 */
  title: string;
  authors: Author[];
  /**
   * @format uri
   * @maxLength 200
   */
  url: string;
  /**
   * @format uri
   * @maxLength 500
   */
  image_url: string;
  news_site: string;
  summary: string;
  /** @format date-time */
  published_at: string;
  /** @format date-time */
  updated_at: string;
  featured?: boolean;
  launches: Launch[];
  events: Event[];
}

export interface Author {
  /** @maxLength 250 */
  name: string;
  socials: Socials;
}

export interface Blog {
  id: number;
  /** @maxLength 250 */
  title: string;
  authors: Author[];
  /**
   * @format uri
   * @maxLength 200
   */
  url: string;
  /**
   * @format uri
   * @maxLength 500
   */
  image_url: string;
  news_site: string;
  summary: string;
  /** @format date-time */
  published_at: string;
  /** @format date-time */
  updated_at: string;
  featured?: boolean;
  launches: Launch[];
  events: Event[];
}

export interface Event {
  /**
   * @min -2147483648
   * @max 2147483647
   */
  event_id: number;
  provider: string;
}

export interface Info {
  version: string;
  news_sites: string[];
}

export interface Launch {
  /** @format uuid */
  launch_id: string;
  provider: string;
}

export interface PaginatedArticleList {
  /** @example 123 */
  count: number;
  /**
   * @format uri
   * @example "http://api.example.org/accounts/?offset=400&limit=100"
   */
  next?: string | null;
  /**
   * @format uri
   * @example "http://api.example.org/accounts/?offset=200&limit=100"
   */
  previous?: string | null;
  results: Article[];
}

export interface PaginatedBlogList {
  /** @example 123 */
  count: number;
  /**
   * @format uri
   * @example "http://api.example.org/accounts/?offset=400&limit=100"
   */
  next?: string | null;
  /**
   * @format uri
   * @example "http://api.example.org/accounts/?offset=200&limit=100"
   */
  previous?: string | null;
  results: Blog[];
}

export interface PaginatedReportList {
  /** @example 123 */
  count: number;
  /**
   * @format uri
   * @example "http://api.example.org/accounts/?offset=400&limit=100"
   */
  next?: string | null;
  /**
   * @format uri
   * @example "http://api.example.org/accounts/?offset=200&limit=100"
   */
  previous?: string | null;
  results: Report[];
}

export interface Report {
  id: number;
  /** @maxLength 250 */
  title: string;
  authors: Author[];
  /**
   * @format uri
   * @maxLength 200
   */
  url: string;
  /**
   * @format uri
   * @maxLength 200
   */
  image_url: string;
  news_site: string;
  summary?: string;
  /** @format date-time */
  published_at: string;
  /** @format date-time */
  updated_at: string;
}

export interface Socials {
  /**
   * @format uri
   * @maxLength 200
   */
  x?: string;
  /**
   * @format uri
   * @maxLength 200
   */
  youtube?: string;
  /**
   * @format uri
   * @maxLength 200
   */
  instagram?: string;
  /**
   * @format uri
   * @maxLength 200
   */
  linkedin?: string;
  /**
   * @format uri
   * @maxLength 200
   */
  mastodon?: string;
  /**
   * @format uri
   * @maxLength 200
   */
  bluesky?: string;
}

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, 'body' | 'bodyUsed'>;

export interface FullRequestParams extends Omit<RequestInit, 'body'> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<FullRequestParams, 'body' | 'method' | 'query' | 'path'>;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, 'baseUrl' | 'cancelToken' | 'signal'>;
  securityWorker?: (securityData: SecurityDataType | null) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown> extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = 'application/json',
  FormData = 'multipart/form-data',
  UrlEncoded = 'application/x-www-form-urlencoded',
  Text = 'text/plain',
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = '';
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>['securityWorker'];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) => fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: 'same-origin',
    headers: {},
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === 'number' ? value : `${value}`)}`;
  }

  protected addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  protected addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join('&');
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter((key) => 'undefined' !== typeof query[key]);
    return keys
      .map((key) => (Array.isArray(query[key]) ? this.addArrayQueryParam(query, key) : this.addQueryParam(query, key)))
      .join('&');
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : '';
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === 'object' || typeof input === 'string') ? JSON.stringify(input) : input,
    [ContentType.Text]: (input: any) => (input !== null && typeof input !== 'string' ? JSON.stringify(input) : input),
    [ContentType.FormData]: (input: any) =>
      Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === 'object' && property !== null
              ? JSON.stringify(property)
              : `${property}`,
        );
        return formData;
      }, new FormData()),
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  protected mergeRequestParams(params1: RequestParams, params2?: RequestParams): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected createAbortSignal = (cancelToken: CancelToken): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === 'boolean' ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(`${baseUrl || this.baseUrl || ''}${path}${queryString ? `?${queryString}` : ''}`, {
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type && type !== ContentType.FormData ? { 'Content-Type': type } : {}),
      },
      signal: (cancelToken ? this.createAbortSignal(cancelToken) : requestParams.signal) || null,
      body: typeof body === 'undefined' || body === null ? null : payloadFormatter(body),
    }).then(async (response) => {
      const r = response.clone() as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const data = !responseFormat
        ? r
        : await response[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch((e) => {
              r.error = e;
              return r;
            });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title Spaceflight News API
 * @version 4.18.0 (v4)
 *
 * The Spaceflight News API (SNAPI) is a product by [The Space Devs](https://thespacedevs.com) (TSD). It's the most complete and up-to-date spaceflight news API currently available.
 *
 * While this API is **free to use**, we do encourage developers to support us through [Patreon](https://www.patreon.com/TheSpaceDevs) to keep the API up and running.
 *
 *  ### GraphQL
 *
 *  The Spaceflight News API also has GraphQL support available! You can find the GraphiQl IDE [here](https://api.spaceflightnewsapi.net/v4/graphql/).
 *
 *  ### FAQs & Tutorials
 *
 *  - [GitHub repository](https://github.com/TheSpaceDevs/Tutorials/): contains FAQs and tutorials for TSD APIs
 *
 *  - [TSD FAQ](https://github.com/TheSpaceDevs/Tutorials/blob/main/faqs/faq_TSD.md): TSD-specific FAQ (e.g. history, network, funding, etc.)
 *
 *  - [SNAPI FAQ](https://github.com/TheSpaceDevs/Tutorials/blob/main/faqs/faq_SNAPI.md): SNAPI-specific FAQ
 *
 *  ### Feedback & Support
 *
 *  If you need any help with SNAPI, you can ask in the [`💬feedback-and-help`](https://discord.com/channels/676725644444565514/1019976345884827750) forum of the TSD [Discord server](https://discord.gg/p7ntkNA) or email [derk@spaceflightnewsapi.net](mailto:derk@spaceflightnewsapi.net).
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  v4 = {
    /**
     * No description
     *
     * @tags articles
     * @name ArticlesList
     * @request GET:/v4/articles/
     * @secure
     */
    articlesList: (
      query?: {
        /** Search for all documents related to a specific event using its Launch Library 2 ID. */
        event?: number[];
        /** Get all documents that have a related event. */
        has_event?: boolean;
        /** Get all documents that have a related launch. */
        has_launch?: boolean;
        /** Get all documents that are featured. */
        is_featured?: boolean;
        /** Search for all documents related to a specific launch using its Launch Library 2 ID. */
        launch?: string[];
        /** Number of results to return per page. */
        limit?: number;
        /** Search for documents with a news_site__name present in a list of comma-separated values. Case insensitive. */
        news_site?: string;
        /** Search for documents with a news_site__name not present in a list of comma-separated values. Case insensitive. */
        news_site_exclude?: string;
        /** The initial index from which to return the results. */
        offset?: number;
        /**
         * Order the result on `published_at, -published_at, updated_at, -updated_at`.
         *
         * * `published_at` - Published at
         * * `-published_at` - Published at (descending)
         * * `updated_at` - Updated at
         * * `-updated_at` - Updated at (descending)
         */
        ordering?: ('-published_at' | '-updated_at' | 'published_at' | 'updated_at')[];
        /**
         * Get all documents published after a given ISO8601 timestamp (excluded).
         * @format date-time
         */
        published_at_gt?: string;
        /**
         * Get all documents published after a given ISO8601 timestamp (included).
         * @format date-time
         */
        published_at_gte?: string;
        /**
         * Get all documents published before a given ISO8601 timestamp (excluded).
         * @format date-time
         */
        published_at_lt?: string;
        /**
         * Get all documents published before a given ISO8601 timestamp (included).
         * @format date-time
         */
        published_at_lte?: string;
        /** Search for documents with a specific phrase in the title or summary. */
        search?: string;
        /** Search for all documents with a specific phrase in the summary. */
        summary_contains?: string;
        /** Search for documents with a summary containing all keywords from comma-separated values. */
        summary_contains_all?: string;
        /** Search for documents with a summary containing at least one keyword from comma-separated values. */
        summary_contains_one?: string;
        /** Search for all documents with a specific phrase in the title. */
        title_contains?: string;
        /** Search for documents with a title containing all keywords from comma-separated values. */
        title_contains_all?: string;
        /** Search for documents with a title containing at least one keyword from comma-separated values. */
        title_contains_one?: string;
        /**
         * Get all documents updated after a given ISO8601 timestamp (excluded).
         * @format date-time
         */
        updated_at_gt?: string;
        /**
         * Get all documents updated after a given ISO8601 timestamp (included).
         * @format date-time
         */
        updated_at_gte?: string;
        /**
         * Get all documents updated before a given ISO8601 timestamp (excluded).
         * @format date-time
         */
        updated_at_lt?: string;
        /**
         * Get all documents updated before a given ISO8601 timestamp (included).
         * @format date-time
         */
        updated_at_lte?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<PaginatedArticleList, any>({
        path: `/v4/articles/`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags articles
     * @name ArticlesRetrieve
     * @request GET:/v4/articles/{id}/
     * @secure
     */
    articlesRetrieve: (id: number, params: RequestParams = {}) =>
      this.request<Article, any>({
        path: `/v4/articles/${id}/`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags blogs
     * @name BlogsList
     * @request GET:/v4/blogs/
     * @secure
     */
    blogsList: (
      query?: {
        /** Search for all documents related to a specific event using its Launch Library 2 ID. */
        event?: number[];
        /** Get all documents that have a related event. */
        has_event?: boolean;
        /** Get all documents that have a related launch. */
        has_launch?: boolean;
        /** Get all documents that are featured. */
        is_featured?: boolean;
        /** Search for all documents related to a specific launch using its Launch Library 2 ID. */
        launch?: string[];
        /** Number of results to return per page. */
        limit?: number;
        /** Search for documents with a news_site__name present in a list of comma-separated values. Case insensitive. */
        news_site?: string;
        /** Search for documents with a news_site__name not present in a list of comma-separated values. Case insensitive. */
        news_site_exclude?: string;
        /** The initial index from which to return the results. */
        offset?: number;
        /**
         * Order the result on `published_at, -published_at, updated_at, -updated_at`.
         *
         * * `published_at` - Published at
         * * `-published_at` - Published at (descending)
         * * `updated_at` - Updated at
         * * `-updated_at` - Updated at (descending)
         */
        ordering?: ('-published_at' | '-updated_at' | 'published_at' | 'updated_at')[];
        /**
         * Get all documents published after a given ISO8601 timestamp (excluded).
         * @format date-time
         */
        published_at_gt?: string;
        /**
         * Get all documents published after a given ISO8601 timestamp (included).
         * @format date-time
         */
        published_at_gte?: string;
        /**
         * Get all documents published before a given ISO8601 timestamp (excluded).
         * @format date-time
         */
        published_at_lt?: string;
        /**
         * Get all documents published before a given ISO8601 timestamp (included).
         * @format date-time
         */
        published_at_lte?: string;
        /** Search for documents with a specific phrase in the title or summary. */
        search?: string;
        /** Search for all documents with a specific phrase in the summary. */
        summary_contains?: string;
        /** Search for documents with a summary containing all keywords from comma-separated values. */
        summary_contains_all?: string;
        /** Search for documents with a summary containing at least one keyword from comma-separated values. */
        summary_contains_one?: string;
        /** Search for all documents with a specific phrase in the title. */
        title_contains?: string;
        /** Search for documents with a title containing all keywords from comma-separated values. */
        title_contains_all?: string;
        /** Search for documents with a title containing at least one keyword from comma-separated values. */
        title_contains_one?: string;
        /**
         * Get all documents updated after a given ISO8601 timestamp (excluded).
         * @format date-time
         */
        updated_at_gt?: string;
        /**
         * Get all documents updated after a given ISO8601 timestamp (included).
         * @format date-time
         */
        updated_at_gte?: string;
        /**
         * Get all documents updated before a given ISO8601 timestamp (excluded).
         * @format date-time
         */
        updated_at_lt?: string;
        /**
         * Get all documents updated before a given ISO8601 timestamp (included).
         * @format date-time
         */
        updated_at_lte?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<PaginatedBlogList, any>({
        path: `/v4/blogs/`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags blogs
     * @name BlogsRetrieve
     * @request GET:/v4/blogs/{id}/
     * @secure
     */
    blogsRetrieve: (id: number, params: RequestParams = {}) =>
      this.request<Blog, any>({
        path: `/v4/blogs/${id}/`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags info
     * @name InfoRetrieve
     * @request GET:/v4/info/
     * @secure
     */
    infoRetrieve: (params: RequestParams = {}) =>
      this.request<Info, any>({
        path: `/v4/info/`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags reports
     * @name ReportsList
     * @request GET:/v4/reports/
     * @secure
     */
    reportsList: (
      query?: {
        /** Number of results to return per page. */
        limit?: number;
        /** Search for documents with a news_site__name present in a list of comma-separated values. Case insensitive. */
        news_site?: string;
        /** Search for documents with a news_site__name not present in a list of comma-separated values. Case insensitive. */
        news_site_exclude?: string;
        /** The initial index from which to return the results. */
        offset?: number;
        /**
         * Order the result on `published_at, -published_at, updated_at, -updated_at`.
         *
         * * `published_at` - Published at
         * * `-published_at` - Published at (descending)
         * * `updated_at` - Updated at
         * * `-updated_at` - Updated at (descending)
         */
        ordering?: ('-published_at' | '-updated_at' | 'published_at' | 'updated_at')[];
        /**
         * Get all documents published after a given ISO8601 timestamp (excluded).
         * @format date-time
         */
        published_at_gt?: string;
        /**
         * Get all documents published after a given ISO8601 timestamp (included).
         * @format date-time
         */
        published_at_gte?: string;
        /**
         * Get all documents published before a given ISO8601 timestamp (excluded).
         * @format date-time
         */
        published_at_lt?: string;
        /**
         * Get all documents published before a given ISO8601 timestamp (included).
         * @format date-time
         */
        published_at_lte?: string;
        /** Search for documents with a specific phrase in the title or summary. */
        search?: string;
        /** Search for all documents with a specific phrase in the summary. */
        summary_contains?: string;
        /** Search for documents with a summary containing all keywords from comma-separated values. */
        summary_contains_all?: string;
        /** Search for documents with a summary containing at least one keyword from comma-separated values. */
        summary_contains_one?: string;
        /** Search for all documents with a specific phrase in the title. */
        title_contains?: string;
        /** Search for documents with a title containing all keywords from comma-separated values. */
        title_contains_all?: string;
        /** Search for documents with a title containing at least one keyword from comma-separated values. */
        title_contains_one?: string;
        /**
         * Get all documents updated after a given ISO8601 timestamp (excluded).
         * @format date-time
         */
        updated_at_gt?: string;
        /**
         * Get all documents updated after a given ISO8601 timestamp (included).
         * @format date-time
         */
        updated_at_gte?: string;
        /**
         * Get all documents updated before a given ISO8601 timestamp (excluded).
         * @format date-time
         */
        updated_at_lt?: string;
        /**
         * Get all documents updated before a given ISO8601 timestamp (included).
         * @format date-time
         */
        updated_at_lte?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<PaginatedReportList, any>({
        path: `/v4/reports/`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags reports
     * @name ReportsRetrieve
     * @request GET:/v4/reports/{id}/
     * @secure
     */
    reportsRetrieve: (id: number, params: RequestParams = {}) =>
      this.request<Report, any>({
        path: `/v4/reports/${id}/`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),
  };
}
