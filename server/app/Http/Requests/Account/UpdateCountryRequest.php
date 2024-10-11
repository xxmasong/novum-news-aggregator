<?php

namespace App\Http\Requests\Account;

use App\Http\Routes;
use App\Http\Props\Routes\AccountRouteProps as AccountProps;
use App\Models\User;
use App\Models\UserCountry;
use Illuminate\Foundation\Http\FormRequest;

class UpdateCountryRequest extends FormRequest
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
        $validated = parent::validated();
        $userCountry = UserCountry::where(User::FOREIGN_ID, $this->user()->id);

        return [$userCountry, $validated];
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return Routes::getRequestAttributes(AccountProps::UPDATE_COUNTRY);
    }

    /**
     * Get the error messages for the defined validation rules.
     *
     * @return array
     */
    public function messages()
    {
        return Routes::getRequestMessages(AccountProps::UPDATE_COUNTRY);
    }
}
