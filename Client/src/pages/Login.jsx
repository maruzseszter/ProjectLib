import { Link, Form, redirect, useNavigation } from 'react-router-dom';
import Wrapper from '../assets/wrappers/RegisterAndLoginPage';
import { FormRow, Logo } from '../components';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const errors = { msg: '' };
  if (data.password.length < 6) {
    errors.msg = 'A jelszó túl rövid';
    return errors;
  }
  try {
    await customFetch.post('/auth/login', data);
    toast.success('Sikeres belépés');
    return redirect('/dashboard');
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const Login = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  return (
    <Wrapper>
       <Form method='post' className='form'>
        <Logo />
        <h4>Belépés</h4>
        <FormRow type='email' name='email' defaultValue='eszter@gmail.com' />
        <FormRow type='password' name='password' labelText='Jelszó' defaultValue='secret123' />
        <button type='submit' className='btn btn-block' disabled={isSubmitting}>
          {isSubmitting ? 'belépés' : 'belépek'}
         </button>
        <p>
          Még nem vagy tag?
          <Link to='/register' className='member-btn'>
            Regisztrálok
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
};
export default Login;


