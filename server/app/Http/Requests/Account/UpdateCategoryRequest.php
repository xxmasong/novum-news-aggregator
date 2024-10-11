<?php

namespace App\Http\Requests\Account;

use App\Http\Routes;
use App\Http\Props\Routes\AccountRouteProps as AccountProps;
use App\Models\User;
use App\Models\UserCategory;
use Illuminate\Foundation\Http\FormRequest;

class UpdateCategoryRequest extends FormRequest
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
        if (!empty($validated))
            $validated = [array_key_first($validated) => collect($validated)->first()];
        $userCategory = UserCategory::where(User::FOREIGN_ID, $this->user()->id);

        return [$userCategory, $validated];
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return Routes::getRequestAttributes(AccountProps::UPDATE_CATEGORY);
    }

    /**
     * Get the error messages for the defined validation rules.
     *
     * @return array
     */
    public function messages()
    {
        return Routes::getRequestMessages(AccountProps::UPDATE_CATEGORY);
    }
}
