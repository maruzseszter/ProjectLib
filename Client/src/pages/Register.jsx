import { Logo, FormRow } from '../components';
import Wrapper from '../assets/wrappers/RegisterAndLoginPage';
import { Form, redirect, useNavigation, Link } from 'react-router-dom';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';


export const action = async ({request}) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await customFetch.post('/auth/register', data);
    toast.success('Sikeres regisztráció');
    return redirect('/login');
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
}

const Register = () => {
  const navigation = useNavigation();
  console.log(navigation);
  const isSubmitting = navigation.state === 'submitting';
  return (
    <Wrapper>
      <Form method='post' className='form'>
        <Logo />
        <h4>Regisztráció</h4>
        <FormRow type='text' name='studentID' labelText='tanulói azonosító' defaultValue='12345678901' /> 
        <FormRow type='text' name='lastName' labelText='vezetéknév' defaultValue='Szőllősi-Maruzs' />
        <FormRow type='text' name='name' labelText='keresztnév' defaultValue='Eszter'/>
        <FormRow type='email' name='email' defaultValue='eszter@gmail.com'/>
        <FormRow type='password' name='password' labelText='jelszó' defaultValue='secret123'/>
        <button type='submit' className='btn btn-block' disabled={isSubmitting}>
        {isSubmitting ? 'submitting...' : 'regisztrálok'}
        </button>
        <p>
          Már tag vagy? &nbsp;&nbsp;&nbsp;
          <Link to='/login' className='member-btn'>
            Belépek
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
};
export default Register;