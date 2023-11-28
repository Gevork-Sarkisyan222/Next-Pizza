import React, { useState } from 'react';
import './profile.scss';
import Avatar from '@mui/material/Avatar';
import PenIcon from '@mui/icons-material/BorderColor';
import SaveIcon from '@mui/icons-material/SaveAs';
import LeftArrowIcon from '@mui/icons-material/KeyboardReturn';
import { useSelector } from 'react-redux';
import { RootStateTheme } from '@/app/redux/slices/types/themeType';

interface IProps {
  handleCloseProfile: () => void;
}

const Profile: React.FC<IProps> = ({ handleCloseProfile }) => {
  const [edit, setEdit] = useState(true);
  const [editPenContent, setEditPenContent] = useState(false);
  const theme = useSelector((state: RootStateTheme) => state.changeTheme.theme);
  const name = useSelector((state: any) => state.formData.formData.name);
  const surname = useSelector((state: any) => state.formData.formData.surname);
  const email = useSelector((state: any) => state.formData.formData.email);
  const selectedAvatar = useSelector((state: any) => state.selectedAvatar.selectedAvatar);

  const handleEdit = () => {
    setEdit(!edit);
  };

  const handleOpenEditPenContent = () => {
    setEditPenContent(true);
  };
  const handleCloseEditPenContent = () => {
    setEditPenContent(false);
  };

  return (
    <div className="Profile">
      <div className="profile-content">
        <div style={{ textAlign: 'center', marginTop: '10px' }}>
          <h1 style={{ color: theme ? 'white' : 'black' }} className="profile-title">
            Ваш профиль
          </h1>
        </div>
        <article style={{ display: 'flex', justifyContent: 'center' }}>
          <Avatar
            sx={{
              width: '200px',
              height: '200px',
              cursor: 'pointer',
            }}
            alt="Remy Sharp"
            src={selectedAvatar as string}
          />
        </article>
        <div className="nameAndSurname">
          {editPenContent && (
            <button className="button-pen">
              <PenIcon />
            </button>
          )}
          <h3 style={{ color: theme ? 'white' : 'black' }}>{name === '' ? 'User' : name}</h3>
          {editPenContent && (
            <button className="button-pen">
              <PenIcon />
            </button>
          )}
          <h3 style={{ color: theme ? 'white' : 'black' }}>{surname === '' ? '2023' : surname}</h3>
        </div>
        <div className="email-section">
          {editPenContent && (
            <button className="edit-pen-buttons-email">
              <PenIcon />
            </button>
          )}

          <h3 style={{ color: theme ? 'white' : 'black' }}>
            {email === '' ? 'почта не указано' : email}
          </h3>
        </div>
        <div style={{ display: 'flex', gap: '20px' }}>
          <button className="button-orange" onClick={handleCloseProfile}>
            <LeftArrowIcon />
            Закрыть
          </button>
          <button className="button-orange" onClick={handleEdit}>
            {edit ? (
              <span
                onClick={handleOpenEditPenContent}
                style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                Редактировать <PenIcon />
              </span>
            ) : (
              <span
                onClick={handleCloseEditPenContent}
                style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                Сохранить <SaveIcon />
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
