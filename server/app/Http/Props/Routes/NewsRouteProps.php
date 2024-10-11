<?php

namespace App\Http\Props\Routes;

use App\Http\Controllers\News\NewsController;
use App\Http\Messages;
use App\Http\Props\RouteProps;
use App\Models\Category;
use App\Models\Country;

class NewsRouteProps extends RouteProps
{
    public const APIKEY = 'apikey';
    public const QUERY = 'q';
    public const QUERY_TITLE = 'qInTitle';
    public const COUNTRY = 'country';
    public const CATEGORY = 'category';
    public const LANGUAGE = 'language';
    public const DOMAIN = 'domain';
    public const PAGE = 'page';

    public const STATUS = "status";
    public const ERROR = "error";
    public const SUCCESS = "success";
    public const TOTAL_RESULTS = "totalResults";
    public const RESULTS = "results";
    public const NEXT_PAGE = "nextPage";

    public const LINK = 'link';
    public const IMAGE_URL = 'image_url';
    public const VIDEO_URL = 'video_url';
    public const KEYWORDS = 'keywords';
    public const TITLE = 'title';
    public const DESCRIPTION = 'description';
    public const CONTENT = 'content';
    public const SOURCE_ID = 'source_id';
    public const CREATOR = 'creator';
    public const PUBDATE = 'pubDate';

    public const NEWS = 'news';
    public const NEWS_GROUP = [parent::PREFIX => self::NEWS];
    public const NEWS_PROPS = [
        parent::GROUP => self::NEWS_GROUP,
        parent::NAME => self::NEWS . parent::SP,
        parent::MIDDLEWARE => [parent::MIDDLEWARE_GUEST],
        parent::ROUTE => '/',
        parent::METHOD => parent::GET,
        parent::CONTROLLER => NewsController::class,
        parent::ATTRIBUTES => [
            parent::REQUEST => [],
            parent::RESPONSE => [],
        ],
        parent::MESSAGES => [
            parent::REQUEST => [],
            parent::RESPONSE => [],
        ],
    ];

    public const ALL_COUNTRIES = [
        ...self::NEWS_PROPS,
        parent::NAME => self::NEWS_PROPS[parent::NAME] . NewsController::ALL_COUNTRIES,
        parent::ROUTE => self::NEWS_PROPS[parent::ROUTE]. NewsController::ALL_COUNTRIES,
        parent::ACTION => NewsController::ALL_COUNTRIES,
        parent::ATTRIBUTES => [
            ...self::NEWS_PROPS[parent::ATTRIBUTES],
            parent::RESPONSE => [
                Messages::REASON => ['string', 'message'],
                Country::MODEL_KEY_P => ['object', 'required'],
            ],
        ],
    ];

    public const ALL_CATEGORIES = [
        ...self::NEWS_PROPS,
        parent::NAME => self::NEWS_PROPS[parent::NAME] . NewsController::ALL_CATEGORIES,
        parent::ROUTE => self::NEWS_PROPS[parent::ROUTE]. NewsController::ALL_CATEGORIES,
        parent::ACTION => NewsController::ALL_CATEGORIES,
        parent::ATTRIBUTES => [
            ...self::NEWS_PROPS[parent::ATTRIBUTES],
            parent::RESPONSE => [
                Messages::REASON => ['string', 'message'],
                Category::MODEL_KEY_P => ['object', 'required'],
            ],
        ],
    ];

    public const ARTICLES = [
        ...self::NEWS_PROPS,
        parent::NAME => self::NEWS_PROPS[parent::NAME] . NewsController::ARTICLES,
        parent::ROUTE => self::NEWS_PROPS[parent::ROUTE]. NewsController::ARTICLES,
        parent::METHOD => parent::POST,
        parent::ACTION => NewsController::ARTICLES,
        parent::ATTRIBUTES => [
            ...self::NEWS_PROPS[parent::ATTRIBUTES],
            parent::REQUEST => [
                self::APIKEY => ['string', 'sometimes', 'required'],
                self::QUERY => ['string', 'sometimes', 'prohibited_unless:qInTitle,null', 'max:512'],
                self::QUERY_TITLE => ['string', 'sometimes', 'prohibited_unless:q,null', 'max:512'],
                self::COUNTRY => ['array', 'sometimes', 'required', 'max:5'],
                self::COUNTRY . parent::SP_WC => ['string', 'sometimes', 'required', 'distinct'],
                self::CATEGORY => ['array', 'sometimes', 'required', 'max:5'],
                self::CATEGORY . parent::SP_WC => ['string', 'sometimes', 'required', 'distinct'],
                self::PAGE => ['string', 'sometimes', 'required'],
            ],
            parent::RESPONSE => [
                Messages::REASON => ['string'], //'message'],
                self::STATUS => ['string', 'required'],
                self::TOTAL_RESULTS => ['integer', 'success'],
                self::RESULTS => ['object', 'array'],
                self::NEXT_PAGE => ['string', 'success'],
            ],
        ],
    ];

    public const SOURCES = [
        ...self::NEWS_PROPS,
        parent::NAME => self::NEWS_PROPS[parent::NAME] . NewsController::SOURCES,
        parent::ROUTE => self::NEWS_PROPS[parent::ROUTE]. NewsController::SOURCES,
        parent::METHOD => parent::POST,
        parent::ACTION => NewsController::SOURCES,
        parent::ATTRIBUTES => [
            ...self::NEWS_PROPS[parent::ATTRIBUTES],
            parent::RESPONSE => [
                Messages::REASON => ['string'], //'message'],
                self::STATUS => ['string', 'required'],
                self::RESULTS => ['object', 'array'],
            ],
        ],
    ];
}
