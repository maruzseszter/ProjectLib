import { body, validationResult, param } from 'express-validator';
import { BadRequestError, NotFoundError, UnauthorizedError } from '../errors/customErrors.js';
import { BOOK_TYPE } from '../utils/constants.js';
import mongoose from 'mongoose';
import Book from '../models/BookModel.js';
import User from '../models/UserModel.js';


const withValidationErrors = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => error.msg);

        //   const firstMessage = errorMessages[0];
        //   console.log(Object.getPrototypeOf(firstMessage));
        if (errorMessages[0].startsWith('no book')) {
          throw new NotFoundError(errorMessages);
        }
        if (errorMessages[0].startsWith('not authorized')) {
          throw new UnauthorizedError('not authorized to access this route');
        }
        throw new BadRequestError(errorMessages);
      }
      next();
    },
  ];
};

export const validateBookInput = withValidationErrors([
  body('title').notEmpty().withMessage('cím megadása kötelező'),
  body('author').notEmpty().withMessage('szerző megadása kötelező'),
  body('ISBN').notEmpty().withMessage('ISBN megadása kötelező'),
  body('publisher').notEmpty().withMessage('kiadó megadása kötelező'),
  body('year').notEmpty().withMessage('év megadása kötelező'),
  body('bookType')
    .isIn(Object.values(BOOK_TYPE))
    .withMessage('kategória megadása kötelező'),
  body('quantity').notEmpty().withMessage('darabszám megadása kötelező'),
]);

export const validateIdParam = withValidationErrors([
  param('id').custom(async (value, { req }) => {
    const isValidMongoId = mongoose.Types.ObjectId.isValid(value);
    if (!isValidMongoId) throw new BadRequestError('érvénytelen MongoDB azonosító');
    const book = await Book.findById(value);
    if (!book) throw new NotFoundError(`nincs könyv ezzel az id-val ${value}`);
    const isAdmin = req.user.role === 'admin';
    const isOwner = req.user.userId === book.createdBy.toString();
    if (!isAdmin && !isOwner)
      throw new UnauthorizedError('nem jogosult a belépésre');
  }),
]);

export const validateRegisterInput = withValidationErrors([
  body('studentID')
    .notEmpty()
    .withMessage('Tanulói azonosító megadása kötelező')
    .isLength({ min: 11 })
    .withMessage('A tanulói azonosítónak legalább 11 karakter hosszúságúnak kell lennie')
    .custom(async (studentID) => {
      const userByStudentID = await User.findOne({ studentID });
      if (userByStudentID) {
        throw new BadRequestError('Ezzel a tanulói azonosítóval már regisztráltak');
      }
    }),
  body('lastName').notEmpty().withMessage('Vezetéknév megadása kötelező'),
  body('name').notEmpty().withMessage('Keresztnév megadása kötelező'),
  body('email')
    .notEmpty()
    .withMessage('Emailcím megadása kötelező')
    .isEmail()
    .withMessage('Érvénytelen email formátum')
    .custom(async (email) => {
      const user = await User.findOne({ email });
      if (user) {
        throw new BadRequestError('Ezzel a mailcímmel már regisztráltak');
      }
    }),
  body('password')
    .notEmpty()
    .withMessage('Jelszó megadása kötelező')
    .isLength({ min: 8 })
    .withMessage('A jelszónak legalább 8 karakter hosszúságúnak kell lennie'),
]);


export const validateLoginInput = withValidationErrors([
  body('email')
    .notEmpty()
    .withMessage('email megadása kötelező')
    .isEmail()
    .withMessage('érvénytelen email formátum'),
  body('password').notEmpty().withMessage('jelszó megadása kötelező'),
]);

export const validateUpdateUserInput = withValidationErrors([
  body('lastName').notEmpty().withMessage('Vezetéknév megadása kötelező'),
  body('name').notEmpty().withMessage('Keresztnév megadása kötelező'),
  body('email')
    .notEmpty()
    .withMessage('Emailcím megadása kötelező')
    .isEmail()
    .withMessage('Érvénytelen email formátum')
    .custom(async (email, { req }) => {
      const user = await User.findOne({ email });
      if (user && user._id.toString() !== req.user.userId) {
        throw new BadRequestError('Ezzel a mailcímmel már regisztráltak');
      }
    }),
]);
