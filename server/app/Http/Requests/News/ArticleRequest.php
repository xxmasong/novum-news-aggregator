<?php

namespace App\Http\Requests\News;

use App\Http\Routes;
use App\Http\Props\Routes\NewsRouteProps as NewsProps;
use App\Models\Category;
use App\Models\Country;
use Illuminate\Foundation\Http\FormRequest;
class ArticleRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validated data from the request.
     *
     * @return array
     */
    public function validated($key = null, $default = null)
    {
        $validData = parent::validated();
        if (!empty($validData[NewsProps::COUNTRY])) {
            $validData[NewsProps::COUNTRY] = array_intersect(
                collect(Country::COUNTRIES)->pluck(Country::CODE)->toArray(),
                array_map('strtolower', $validData[NewsProps::COUNTRY]));
            $validData[NewsProps::COUNTRY] = implode(",", $validData[NewsProps::COUNTRY]);
        }
        if (!empty($validData[NewsProps::CATEGORY])) {
            $validData[NewsProps::CATEGORY] = array_intersect(
                array_merge(Category::CATEGORIES, Category::CATEGORIES_EXT),
                array_map('strtolower', $validData[NewsProps::CATEGORY]));
            $validData[NewsProps::CATEGORY] = implode(",", $validData[NewsProps::CATEGORY]);
        }

        return [$validData];
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return Routes::getRequestAttributes(NewsProps::ARTICLES);
    }

    /**
     * Get the error messages for the defined validation rules.
     *
     * @return array
     */
    public function messages()
    {
        return Routes::getRequestMessages(NewsProps::ARTICLES);
    }
}
