const SearchContainer = () => {
    return <h2>SearchContainer</h2>;
};
export default SearchContainer;


//ÚJBÓL ÁTNÉZNI, eltűnik az AllBooks!!!!!!
// import { FormRow, FormRowSelect, SubmitBtn } from '.';
// import Wrapper from '../assets/wrappers/DashboardFormPage';
// import { Form, useSubmit, Link } from 'react-router-dom';
// import { BOOK_TYPE, BOOK_SORT_BY } from '../../../utils/constants';
// import { useAllBooksContext } from '../pages/AllBooks';

// const SearchContainer = () => {
//   const { searchValues } = useAllBooksContext();
//   const { search, bookType, sort } = searchValues;
//   const submit = useSubmit();

//   const debounce = (onChange) => {
//     let timeout;
//     return (e) => {
//       const form = e.currentTarget.form;
//       clearTimeout(timeout);
//       timeout = setTimeout(() => {
//         onChange(form);
//       }, 2000);
//     };
//   };
//   return (
//     <Wrapper>
//       <Form className='form'>
//         <h5 className='form-title'>search form</h5>
//         <div className='form-center'>
//           <FormRow
//             type='search'
//             name='search'
//             defaultValue={search}
//             onChange={debounce((form) => {
//               submit(form);
//             })}
//           /> 
//           <FormRowSelect
//             labelText='book status'
//             name='jobStatus'
//             list={['all', ...Object.values(JOB_STATUS)]}
//             defaultValue={jobStatus}
//             onChange={(e) => {
//               submit(e.currentTarget.form);
//             }}
//           />
//           <FormRowSelect
//             labelText='book type'
//             name='bookType'
//             list={['all', ...Object.values(BOOK_TYPE)]}
//             defaultValue={bookType}
//             onChange={(e) => {
//               submit(e.currentTarget.form);
//             }}
//           />
//           <FormRowSelect
//             name='sort'
//             defaultValue={sort}
//             list={[...Object.values(BOOK_SORT_BY)]}
//             onChange={(e) => {
//               submit(e.currentTarget.form);
//             }}
//           />
//           <Link to='/dashboard/all-books' className='btn form-btn delete-btn'>
//             Reset Search Values
//           </Link>
//         </div>
//       </Form>
//     </Wrapper>
//   );
// };
// export default SearchContainer;