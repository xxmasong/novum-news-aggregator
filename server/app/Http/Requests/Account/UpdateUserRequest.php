<?php

namespace App\Http\Requests\Account;

use App\Http\Routes;
use App\Http\Props\Routes\AccountRouteProps as AccountProps;
use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class UpdateUserRequest extends FormRequest
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
        Validator::make(request()->all(), [
            User::EMAIL => [Rule::unique(User::MODEL_KEY_P, User::EMAIL)->ignore($this->user()[User::ID])],
        ])->validated();

        return [$this->user(), $validData];
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return Routes::getRequestAttributes(AccountProps::UPDATE_USER);
    }

    /**
     * Get the error messages for the defined validation rules.
     *
     * @return array
     */
    public function messages()
    {
        return Routes::getRequestMessages(AccountProps::UPDATE_USER);
    }
}
