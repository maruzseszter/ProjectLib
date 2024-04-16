import { FormRow } from '../components';
import Wrapper from '../assets/wrappers/DashboardFormPage';
import { useOutletContext } from 'react-router-dom';
import { useNavigation, Form } from 'react-router-dom';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';

export const action = async ({ request }) => {
  const formData = await request.formData();

  try {
    await customFetch.patch('/users/update-user', formData);
    toast.success('Profil sikeresen frissítve');
  } catch (error) {
    toast.error(error?.response?.data?.msg);
  }
  return null;
};

const Profile = () => {
  const { user } = useOutletContext();
  const { studentID, lastName, name, email } = user;
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';
  return (
    <Wrapper>
      {/* <Form method='post' className='form' encType='multipart/form-data'> */}
      <Form method='post' className='form'>
        <h4 className='form-title'>Profil</h4>
        <div className='form-center'>
          <FormRow
            type='number'
            labelText='Tanulói azonosító'
            name='studentID'
            defaultValue={studentID}
          />
          <FormRow
            type='text'
            labelText='Vezetéknév'
            name='lastName'
            defaultValue={lastName}
          />
          <FormRow 
            type='text' 
            labelText='Keresztnév'
            name='name' 
            defaultValue={name} 
          />
          <FormRow 
            type='email' 
            labelText='email'
            name='email' 
            defaultValue={email} 
          />
          <button className='btn btn-block form-btn' type='submit' disabled={isSubmitting}>
            {isSubmitting? 'submitting...' : 'módosít'}
          </button>
        </div>
      </Form>
    </Wrapper>
  );
};

export default Profile;