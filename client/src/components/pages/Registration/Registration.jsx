import React, { useState } from 'react';
import {
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Container,
  NativeSelect,
  InputLabel,
} from '@material-ui/core';
import { registration } from '../../../actions/user';
import { NavLink, useHistory } from 'react-router-dom';
import styles from './Registration.module.scss';
import { useTranslation } from 'react-i18next';
import useValidation from '../../../utils/useValidation';

const Registration = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [type, setType] = useState('customer');
  const [name, setName] = useState('');
  const { t } = useTranslation();
  const [isEmailCorrect, errorText] = useValidation(email);
  const [isInputChanged, setIsInputChanged] = useState(false);
  const router = useHistory();
  const handleBlur = () => {
    setIsInputChanged(true);
  };

  const registrationHandler = () => {
    if (isEmailCorrect) {
      router.push('/main');
      registration(name, email, password, type);
    }
  };

  return (
    <div className={styles.container}>
      <img src="/assets/images/Lada.png" alt="logo" />
      <>
        <Container maxWidth="xs">
          <DialogTitle id="form-dialog-title">{t('login.registr')}</DialogTitle>
          <DialogContent>
            <TextField
              required
              autoFocus
              margin="dense"
              id="name"
              label={t('nameLogin')}
              type="text"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              error={!isEmailCorrect && isInputChanged ? !isEmailCorrect : null}
              helperText={!isEmailCorrect && isInputChanged ? errorText : ''}
              required
              margin="dense"
              id="email"
              label={t('yourEmail')}
              type="email"
              fullWidth
              value={email}
              onBlur={handleBlur}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              required
              margin="dense"
              id="password"
              label={t('password')}
              type="password"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className={styles.flexContainer}>
              <InputLabel>{t('registerAs')}</InputLabel>
              <NativeSelect id="type" onChange={(e) => setType(e.target.value)}>
                <option value="customer">{t('customer')}</option>
                <option value="dealer">{t('dealer')}</option>
              </NativeSelect>
            </div>
          </DialogContent>

          <Button
            id="registrationButton"
            className={styles.button}
            onClick={registrationHandler}
            variant="contained"
            color="primary"
          >
            {t('register')}
          </Button>

          <NavLink to={'/'}>
            <Button
              className={styles.button}
              variant="contained"
              color="primary"
            >
              {t('cancel')}
            </Button>
          </NavLink>
        </Container>
      </>
    </div>
  );
};

export default Registration;
