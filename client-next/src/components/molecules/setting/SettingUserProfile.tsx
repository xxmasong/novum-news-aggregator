import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { themedPalette } from '@/styles/themes';
import Button from '@/components/atoms/Button';
import SettingEditButton from './SettingEditButton';
import useToggle from '@/hooks/useToggle';
import SettingInput from './SettingInput';
import useInputs from '@/hooks/useInputs';
import media from '@/styles/media';
import { AuthUser } from '@/types/user';
import { updateUser } from '@/services/AccountService';
import { IconButton } from '@mui/material';
import { MdVisibility, MdVisibilityOff } from 'react-icons/md';

export type SettingUserProfileProps = {
  user: AuthUser;
  updateAuthUser: (user: AuthUser) => void;
};

function SettingUserProfile({
  user,
  updateAuthUser,
}: SettingUserProfileProps) {
  const [crypt, setCrypt] = useState(true);
  const [editInfo, onToggleEditInfo] = useToggle(false);
  const [changePassword, onToggleChangePassword] = useToggle(false);
  const [info, onChangeInfo] = useInputs({name: user?.name});
  const [password, onChangePassword] = useInputs({
    password_old: "", password: "", password_confirmation: "",
  });

  const handleSubmitInfo = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      const response = await updateUser(info);
      if (response) {
        updateAuthUser({...user, name: response?.name});
      }
      onToggleEditInfo();
  }, [user, info, onToggleEditInfo, updateAuthUser]);

  const handleSubmitPassword = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      const response = await updateUser(password);
      if (response) {
        onToggleChangePassword();
      }
  }, [password, onToggleChangePassword]);

  return (
    <Section>
      <div className="info-area">
        { editInfo ? (
            <Form onSubmit={handleSubmitInfo}>
              <SettingInput
                placeholder="Enter Name"
                className="display-info"
                name="name"
                value={info.name || ""}
                onChange={onChangeInfo}
                fullWidth
              />
              <p>{user.email}</p>
              <div className="button-wrapper">
                <Button color="lightGray" onClick={onToggleEditInfo}>
                  Cancel
                </Button>
                <Button type="submit">Update</Button>
              </div>
            </Form>
          ) : (
            <>
              <h2>{info.name || "My Name"}</h2>
              <p>{user.email}</p>
            </>
        )} 
        { changePassword && ( 
            <Form onSubmit={handleSubmitPassword}>
              <SettingInput
                placeholder="Enter Current Password"
                className="display-password"
                name="password_old"
                type={crypt ? "password" : "text"}
                value={password.password_old || ""}
                onChange={onChangePassword}
                fullWidth
              />
              <SettingInput
                placeholder="Enter New Password"
                className="display-password"
                name="password"
                type={crypt ? "password" : "text"}
                value={password.password || ""}
                onChange={onChangePassword}
                fullWidth
              />
              <SettingInput
                placeholder="Confirm Entered Password"
                className="display-password"
                name="password_confirmation"
                type={crypt ? "password" : "text"}
                value={password.password_confirmation || ""}
                onChange={onChangePassword}
                fullWidth
              />
              <div className="button-wrapper">
                <Button color="lightGray" onClick={onToggleChangePassword}>
                  Cancel
                </Button>
                <Button type="submit">Update</Button>
                <IconButton onClick={() => setCrypt(!crypt)} sx={{width:32, height:32}}>
                  {crypt ? <MdVisibility /> : <MdVisibilityOff />}
                </IconButton>
              </div>
            </Form>
        )} 
        { !editInfo && !changePassword && (
            <>
              <SettingEditButton onClick={onToggleEditInfo} customText='Edit Info' />
              <span className="dot">  •  </span>
              <SettingEditButton onClick={onToggleChangePassword} customText='Change Password' />
            </>
        )}
      </div>
    </Section>
  );
}

const Section = styled.section`
  display: flex;
  flex-direction: column;
  height: auto;
  padding-top: 1rem;
  padding-bottom: 1rem;
  .info-area {
    flex: 1;
    h2 {
      margin-top: 1rem;
      margin-bottom: 0;
      font-size: 1.5rem;
      line-height: 1.5;
      color: ${themedPalette.text1};
    }
    p {
      margin-top: 0.25rem;
      margin-bottom: 1rem;
      font-size: 1rem;
      line-height: 1.5;
      color: ${themedPalette.text3};
    }
    span {
      color: ${themedPalette.primary1};
      font-weight: bold;
    }
    ${media.small} {
      h2 {
        margin-top: 0rem;
      }
    }
  }
`;

const Form = styled.form`
  input + input {
    margin-top: 0.5rem;
  }
  .display-info {
    font-size: 1.5rem;
    font-weight: 600;
  }
  .display-password {
    font-size: 1rem;
    font-weight: 400;
    max-width: 16rem;
  }
  .button-wrapper {
    display: flex;
    justify-content: flex-start;
    margin-top: 1.5rem;
    button + button {
      margin-left: 1rem;
    }
  }
  ${media.small} {
    input + input {
      margin-top: 0.5rem;
    }
    .display-info {
      font-size: 1rem;
    }
    .button-wrapper {
      margin-top: 0.5rem;
    }
  }
`;

export default SettingUserProfile;
