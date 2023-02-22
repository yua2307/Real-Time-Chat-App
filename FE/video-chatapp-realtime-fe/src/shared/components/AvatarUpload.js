import * as React from 'react';
import { styled } from '@mui/system';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import Avatar from '@mui/material/Avatar';
import { connect } from 'react-redux';
import { getActions } from '../../store/actions/alertNotificationActions';
import { typeAlert } from '../../store/constants/alertNotification';

const MainContainer = styled('div')({
  bgColor: 'green',
  height: '180px',
  width: '100%',
  borderRadius: '160px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

const AvatarUpload = ({
  defaultImage,
  name,
  handleValueChange,
  openAlertMessage,
}) => {
  const inputRef = React.useRef(null);
  const [fileSelected, setFileSelected] = React.useState(defaultImage ?? '');

  const handleOnClickFile = () => {
    inputRef.current.click();
  };

  const preventDefault = (e) => {
    e.preventDefault();
  };

  const fileDrop = (e) => {
    e.preventDefault();
    if (validateFile(e.target?.files[0]) && e.target?.files[0]) {
      setFileSelected(e.dataTransfer.files[0]);
    }
  };

  const onChangeInput = (e) => {
    if (validateFile(e.target?.files[0]) && e.target?.files[0]) {
      setFileSelected(e.target.files[0]);
    }
  };

  const validateFile = (file) => {
    const validTypes = [
      'image/jpeg',
      'image/jpg',
      'image/png',
      'image/svg+xml',
    ];

    const fileSize = Math.floor(file.size / (1024 * 1024));

    if (validTypes.indexOf(file.type) === -1) {
      openAlertMessage('We only accept image files', typeAlert.ERROR);
      return false;
    } else if (fileSize > 10) {
      openAlertMessage(
        'We only accept image files smaller than 10MB',
        typeAlert.ERROR
      );
      return false;
    }
    return true;
  };

  React.useEffect(() => {
    handleValueChange(fileSelected);
  }, [fileSelected, handleValueChange]);

  return (
    <MainContainer
      onClick={handleOnClickFile}
      onDragOver={preventDefault}
      onDragEnter={preventDefault}
      onDragLeave={preventDefault}
      onDrop={fileDrop}
    >
      <input
        type="file"
        accept="image/*"
        name={name}
        ref={inputRef}
        style={{ display: 'none' }}
        onChange={onChangeInput}
      />
      <Avatar
        sx={{ width: 180, height: 180, border: '1px dashed white' }}
        src={
          typeof fileSelected === 'string'
            ? fileSelected
            : URL.createObjectURL(fileSelected)
        }
      >
        {!fileSelected && <FileUploadIcon fontSize="large" />}
      </Avatar>
    </MainContainer>
  );
};

const mapActionsToProps = (dispatch) => {
  return {
    ...getActions(dispatch),
  };
};

export default connect(null, mapActionsToProps)(AvatarUpload);
