<?php

namespace App\Http\Controllers\News;

use App\Http\Controllers\Controller;
use App\Http\Messages;
use App\Http\Props\Routes\NewsRouteProps as NewsProps;
use App\Http\Requests\News\ArticleRequest;
use App\Models\Category;
use App\Models\Country;
use App\Traits\Responser;
use NewsdataIO\NewsdataApi as NewsData;

class NewsController extends Controller
{
    use Responser;

    public const ALL_COUNTRIES = 'allCountries';
    public function allCountries()
    {
        return $this->dump(Country::allCountries());
    }

    public const ALL_CATEGORIES = 'allCategories';
    public function allCategories()
    {
        return $this->dump(Category::allCategories());
    }

    public const ARTICLES = 'articles';
    public function articles(ArticleRequest $request)
    {
        [$validData] = $request->validated();
        $response = [];
        if (!empty($validData[NewsProps::APIKEY])) {
            $newsData = new NewsData($validData[NewsProps::APIKEY]);
            unset($validData[NewsProps::APIKEY]);
            if (empty($validData[NewsProps::COUNTRY]))
                $validData[NewsProps::COUNTRY] = 'us';
            $response = collect($newsData->get_latest_news($validData))->toArray();
            if ($response[NewsProps::STATUS] === NewsProps::SUCCESS) {
                return $this->success(NewsProps::ARTICLES, [
                    Messages::REASON => ['Successful Fetching News!'],
                    ...$response,
                ]);
            }
        } else {
            for ($count = 1; $count <= 5; $count++) {
                $configApiKey = config('common.newsdata_api_key_' . $count);
                $newsData = new NewsData($configApiKey);
                if (empty($validData[NewsProps::COUNTRY]))
                    $validData[NewsProps::COUNTRY] = 'us';
                $response = collect($newsData->get_latest_news($validData))->toArray();
                if ($response[NewsProps::STATUS] === NewsProps::SUCCESS) {
                    return $this->success(NewsProps::ARTICLES, [
                        Messages::REASON => ['Successful Fetching News!'],
                        ...$response,
                    ]);
                }
            }
        }

        return $this->error(NewsProps::ARTICLES, [
            Messages::REASON => ['Error Fetching News!'],
            ...$response,
        ]);
    }

    public const SOURCES = 'sources';
    public function sources(ArticleRequest $request)
    {
        [$validData] = $request->validated();
        $response = [];
        if (!empty($validData[NewsProps::APIKEY])) {
            $newsData = new NewsData($validData[NewsProps::APIKEY]);
            unset($validData[NewsProps::APIKEY]);
            $response = collect($newsData->news_sources([]))->toArray();
            if ($response[NewsProps::STATUS] === NewsProps::SUCCESS) {
                return $this->success(NewsProps::ARTICLES, [
                    Messages::REASON => ['Successful Fetching News!'],
                    ...$response,
                ]);
            }
        } else {
            for ($count = 1; $count <= 5; $count++) {
                $configApiKey = config('common.newsdata_api_key_' . $count);
                $newsData = new NewsData($configApiKey);
                $response = collect($newsData->news_sources([]))->toArray();
                if ($response[NewsProps::STATUS] === NewsProps::SUCCESS) {
                    return $this->success(NewsProps::ARTICLES, [
                        Messages::REASON => ['Successful Fetching News!'],
                        ...$response,
                    ]);
                }
            }
        }

        return $this->error(NewsProps::ARTICLES, [
            Messages::REASON => ['Error Fetching News!'],
            ...$response,
        ]);
    }
}
