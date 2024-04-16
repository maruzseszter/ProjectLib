import { Link, useRouteError } from 'react-router-dom';
import img from '../assets/images/not-found.svg';
import Wrapper from '../assets/wrappers/ErrorPage';

const Error = () => {
  const error = useRouteError();
  console.log(error);
  if (error.status === 404) {
    return (
      <Wrapper>
        <div>
          <img src={img} alt='not found' />
          <h3>Az oldal nem található!</h3>
          <p>Nem találjuk a keresett oldalt!</p>
          <Link to='/dashboard'>Vissza a főoldalra</Link>
        </div>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <div>
        <h3>Valami félresikerült!</h3>
      </div>
    </Wrapper>
  );
};

export default Error;