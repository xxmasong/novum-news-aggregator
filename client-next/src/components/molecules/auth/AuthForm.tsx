import * as React from 'react';
import styled from 'styled-components';
import { AuthMode, closeAuthModal, setLayer } from '@/store/core';
import { themedPalette } from '@/styles/themes';
import media from '@/styles/media';
import useInputs from '@/hooks/useInputs';
import { FormEvent, useCallback, useState } from 'react';
import { login, register } from '@/services/AuthService';
import useAuth from '@/hooks/useAuth';
import Stack from '@mui/system/Stack';
import Button from '@/components/atoms/FormButtons/Button';
import InputBase from '@/components/atoms/InputBase';
import { useDispatch } from 'react-redux';
import { delay } from '@/utils/utils';
import Loading from '../Loading/Loading';

export interface AuthFormProps {
  mode: AuthMode;
  onToggleMode: () => void;
}

const AuthForm: React.FC<AuthFormProps> = ({
  mode,
  onToggleMode,
}) => {
  const dispatch = useDispatch();  
  const [loading, setLoading] = useState(false);
  const { setAuthorized } = useAuth(); 
  const [form, onChange] = useInputs({ 
    email: "", password: "", password_confirmation: "", 
  });

  const onSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      setLoading(true);
      let status = 500;
      switch (mode) {
        case 'REGISTER':
          status = await register(form);
          break;
        case 'LOGIN': 
          status = await login(form);
          break;
      }
      setLoading(false);
      if (status === 200) {
        dispatch(closeAuthModal());
        dispatch(setLayer(true));
        await delay(500);
        setAuthorized();
      }
    }, [form, mode, dispatch, setAuthorized],
  );

  const modeText = mode === 'REGISTER' ? 'REGISTER' : 'LOGIN';

  return (
    <AuthFormBlock>
      <div className="upper-wrapper">
        <h2>{modeText}</h2>
        <section>
          <h5>Get Your Personalized News!</h5> 
          <form onSubmit={onSubmit} >
            <Stack direction={"column"} spacing={1} >
              <InputBase
                value={form.email}
                placeholder="Email"
                name="email"
                onChange={onChange}
                fullWidth
                required
              />
              <InputBase
                value={form.password}
                placeholder="Password"
                name="password"
                type="password"
                onChange={onChange}
                fullWidth
                required
              />
              {mode === 'REGISTER' &&
                <InputBase
                  value={form.password_confirmation}
                  placeholder="Confirm Password"
                  name="password_confirmation"
                  type="password"
                  onChange={onChange}
                  fullWidth
                  required
                />
              }
              <Stack alignItems="flex-end" marginBottom={`2rem`}>
                {loading ? (
                  <div className="loader">
                    <Loading />
                  </div>                  
                ) : (
                  <Button 
                    type="submit" 
                    fullWidth 
                    disabled={loading} 
                  >
                    {mode === 'REGISTER' ? 'Register' : 'Login'}
                  </Button>
                )}
              </Stack>
            </Stack>
          </form>  
        </section>
      </div>
      <div className="foot">
        <span>
          {mode === 'LOGIN'
            ? 'No account yet?'
            : 'Already have an account?'}
        </span>
        <div
          className="link"
          tabIndex={7}
          onClick={onToggleMode}
        >
          {mode === 'LOGIN' ? 'Register' : 'Login'}
        </div>
      </div>
    </AuthFormBlock>
  );
};

const AuthFormBlock = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
  line-height: 1.5;
  .upper-wrapper {
    ${media.small} {
      margin-top: 2rem;
    }
  }
  h2,
  h5 {
    margin: 0;
  }
  h2 {
    font-size: 1.3125rem;
    color: ${themedPalette.text1};
  }
  h5 {
    margin-top: 1rem;
    margin-bottom: 1rem;
    color: ${themedPalette.text3};
  }
  section + section {
    margin-top: 2.5rem;
  }
  .loader {
    margin-top: 1rem;
    margin-right: 1rem;
  }
  .foot {
    ${media.small} {
      margin-top: 2rem;
    }

    text-align: right;
    span {
      margin-right: 0.25rem;
    }
    .link {
      display: inline-block;
      font-weight: bold;
      color: ${themedPalette.primary1};
      cursor: pointer;
      &:hover {
        text-decoration: underline;
      }
    }
  }
`;

export default AuthForm;
