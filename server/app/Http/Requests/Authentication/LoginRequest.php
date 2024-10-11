<?php

namespace App\Http\Requests\Authentication;

use App\Http\Routes;
use App\Http\Props\Routes\AuthenticationRouteProps as AuthenticationProps;
use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;

class LoginRequest extends FormRequest
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
        $user = User::where(User::EMAIL, $validData[User::EMAIL])->first();

        return [$user, $validData];
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return Routes::getRequestAttributes(AuthenticationProps::LOGIN);
    }

    /**
     * Get the error messages for the defined validation rules.
     *
     * @return array
     */
    public function messages()
    {
        return Routes::getRequestMessages(AuthenticationProps::LOGIN);
    }

}
