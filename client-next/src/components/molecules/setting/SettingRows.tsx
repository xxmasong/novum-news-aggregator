import styled from 'styled-components';
import SettingRow from './SettingRow';
import Button from '@/components/atoms/Button';
import media from '@/styles/media';
import { AuthUser } from '@/types/user';
import { Fragment, useCallback, useState } from 'react';
import ToggleSwitch from '@/components/atoms/ToggleSwitch';
import { themedPalette } from '@/styles/themes';
import { updateCategory, updateCountry } from '@/services/AccountService';
import { setLayer } from '@/store/core';
import { useDispatch } from 'react-redux';
import { Box, Stack } from '@mui/system';
import { MenuItem, Select, SelectChangeEvent } from '@mui/material'
import { delay } from '@/utils/utils';
import { MdLanguage } from 'react-icons/md';
import useOptions from '@/hooks/useOptions';

export type SettingRowsProps = {
  user: AuthUser;
  updateAuthUser: (user: AuthUser) => void;
};

function SettingRows({
  user,
  updateAuthUser,
}: SettingRowsProps) {
  const dispatch = useDispatch();
  const {countries, categories} = useOptions();
  const [edit, setEdit] = useState(false);
  const [country, setCountry] = useState<string>(user.country?.code || "global");
  const [category, setCategory] = useState<{
    [key: string]: boolean | undefined;
  }>({ ...user.categories });

  const handleSubmitCountry = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      const update = country.length === 2
        ? { "code" : country} 
        : { "name" : country};
      const response = await updateCountry(update);
      if (response) {
        updateAuthUser({...user, country: {...response}});
        setEdit(false);
      } else {   
        setCountry(user.country?.code || "global");
      }
  }, [country, updateAuthUser, user]);

  const handleChangeCountry = useCallback(
    (e: SelectChangeEvent) => {
      e.preventDefault();
      setCountry(e.target.value);
    }, []);

  const handleChangeCategory = useCallback(
    async ({ name, value }: { name: string; value: boolean }) => {
      const update = {[name]: value};
      setCategory((prev) => ({ ...prev,  ...update}));
      const response = await updateCategory(update);
      if (response) {
        updateAuthUser({...user, categories: {...user.categories!, ...response}});
      } else {   
        setCategory((prev) => ({ ...prev,  [name]: !value}));
      }
    },
    [user, updateAuthUser],
  );

  const handleExit = async () => {
    dispatch(setLayer(true));
    await delay(1000);
    window.location.replace("/");
  };

  return (
    <Rows>
      {countries && countries.length > 0 && (
        <SettingRow
          title="Country"
          description="Choose a specific country to receive a greater amount of local news content in your feed."
          editButton={!edit}
          onClickEdit={() => setEdit(true)}
        >
          {edit ? (
            <Form onSubmit={handleSubmitCountry}>
              <Stack direction={{md:"row", sm:"column"}} alignItems="baseline">
                <Select
                  value={country}
                  onChange={handleChangeCountry}
                  sx={{ 
                    display: `block`,
                    padding: 0!,
                    width: `16rem`,
                    marginBottom: `1rem`,
                    marginRight: `1rem`,
                    background: `${themedPalette.bg_element1}`,
                    color: `${themedPalette.text2}`,
                    outline: `none`,
                    borderRadius: `4px`,
                    "&:focus": {
                      border: `1px solid ${themedPalette.border1}`,
                    }
                  }}
                >
                  <MenuItem key="global" value="global">
                    <Box sx={{ 
                      display:'flex', 
                      alignItems: 'center', 
                      '& > svg': { width:'1.25rem', mr: 2, flexShrink: 0 } }}>
                      <MdLanguage/>Global
                    </Box>
                  </MenuItem>
                  {countries && countries.map((c) => (
                    <MenuItem key={c.code} value={c.code}>
                      <Box sx={{ '& > img': { mr: 2, flexShrink: 0 } }}>
                        <img
                          loading="lazy"
                          width="20"
                          src={`https://flagcdn.com/w20/${c.code.toLowerCase()}.png`}
                          srcSet={`https://flagcdn.com/w40/${c.code.toLowerCase()}.png 2x`}
                          alt={c.name}
                        />
                        {`${c.name}`}
                      </Box>
                    </MenuItem>
                  ))}
                </Select>
                <Button type="submit">Update</Button>
              </Stack>
            </Form>
          ) : (
            user.country?.code === "global" ? (
              <Box sx={{ 
                display:'flex', 
                alignItems: 'center', 
                '& > svg': { width:'1.25rem', mr: 2, flexShrink: 0 } }}>
                <MdLanguage/>Global
              </Box>
            ) : (
              <Box sx={{ '& > img': { mr: 2, flexShrink: 0 } }}>
                <img
                  loading="lazy"
                  width="20"
                  src={`https://flagcdn.com/w20/${user.country?.code}.png`}
                  srcSet={`https://flagcdn.com/w40/${user.country?.code}.png 2x`}
                  alt="Country"
                />
                {user.country?.name}
              </Box>
            )
          )}
        </SettingRow> 
      )}
      {categories && categories.length > 0 && (
        <SettingRow 
          title="Categories"
          description="Select the categories that you prefer to have included in your news feed."
        >
          <Rules>
            <ul>
              {categories && categories.map((c) => (
                <Fragment key={c.name}>
                  <li>
                    <span>{c.name.charAt(0).toUpperCase() + c.name.slice(1)}</span>
                    <ToggleSwitch
                      value={category[c.name] || false}
                      name={c.name}
                      onChange={handleChangeCategory}
                    />
                  </li>
                </Fragment>
              ))}
            </ul>
          </Rules>
        </SettingRow>
      )}      
      <div className="button-wrapper">
        <Button 
          size="large" 
          color="teal" 
          onClick={handleExit}>
          Home
        </Button>
      </div>
    </Rows>
  );
}

const Form = styled.form`
  display: flex;
  flex: 1;
  align-items: center;
  input {
    flex: 1;
    margin-right: 1rem;
    max-width: 12rem;
  }
`;

const Rules = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  ul {
    padding: 0;
  }
  li {
    display: flex;
    align-items: center;
    span {
      width: 14rem;
    }
  }
  li + li {
    margin-top: 0.5rem;
  }
`;

const Rows = styled.section`
  border-top: 1px solid ${themedPalette.border4};
  ${media.small} {
    margin-top: 0rem;
  }
  .button-wrapper {
    display: flex;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin-top: 2rem;
    ${media.small} {
      margin-top: 2rem;
    }
  }
`;

export default SettingRows;
