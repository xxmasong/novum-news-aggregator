import SettingUserProfile from '@/components/molecules/setting/SettingUserProfile';
import useAuth from '@/hooks/useAuth';

function SettingUserProfileContainer() {
  const { user, setAuthUser } = useAuth();

  if (!user) {
    return null;
  }

  return (
    <SettingUserProfile
      user={user}
      updateAuthUser={setAuthUser}
    />
  );
}

export default SettingUserProfileContainer;
