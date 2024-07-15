import React, {useState} from 'react';
import {View, TextInput, Button, Text, StyleSheet} from 'react-native';
import axios from 'axios';

const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const validateEmail = email => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const handleLogin = () => {
    if (!validateEmail(email)) {
      setError('유효한 이메일을 입력하세요.');
      return;
    }

    if (password.length < 6) {
      setError('비밀번호는 최소 6자 이상이어야 합니다.');
      return;
    }

    const loginData = {
      email,
      password,
    };
    console.log('Login request data:', loginData);

    axios
      .post('http://13.209.27.220:8080/auth', loginData)
      .then(response => {
        console.log('Login response:', response.data);
        if (response.status === 200 && response.data.success) {
          navigation.navigate('MainTab');
        } else {
          setError(response.data.message || '로그인에 실패했습니다.');
        }
      })
      .catch(error => {
        if (error.response) {
          // 서버가 응답을 보냈으나 상태 코드가 2xx 범위를 벗어나는 경우
          console.error('Error response:', error.response.data);
          setError(
            error.response.data.message || '로인 중 오류가 발생했습니다.',
          );
        } else if (error.request) {
          // 요청이 만들어졌으나 응답을 받지 못한 경우
          console.error('Error request:', error.request);
          setError('서버로부터 응답이 없습니다.');
        } else {
          // 요청 설정 중에 오류가 발생한 경우
          console.error('Error message:', error.message);
          setError('요청을 보내는 중 오류가 발생했습니다.');
        }
      });
  };

  const goToSignupPage = () => {
    navigation.navigate('Signup');
  };

  return (
    <View style={styles.container}>
      <Text>이메일:</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <Text>비밀번호:</Text>
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {error ? <Text style={styles.error}>{error}</Text> : null}
      <Button title="로그인" onPress={handleLogin} />
      <Button title="회원가입" onPress={goToSignupPage} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },

  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  error: {
    color: 'red',
    marginBottom: 12,
  },
});

export default Login;
