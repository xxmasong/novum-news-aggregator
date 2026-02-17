import SettingRows from '@/components/molecules/setting/SettingRows';
import useAuth from '@/hooks/useAuth';

function SettingRowsContainer() {
  const { user, setAuthUser } = useAuth();

  if (!user) return null;

  return (
    <SettingRows
      user={user}
      updateAuthUser={setAuthUser}
    />
  );
}

export default SettingRowsContainer;
