export const appConfig = Object.freeze({
  inputForm: {
    NAME_MIN_LENGTH: 2,
    NAME_MAX_LENGTH: 30,
    EMAIL_MAX_LENGTH: 100,
    PASSWORD_MIN_LENGTH: 6,
    PASSWORD_MAX_LENGTH: 50,
    PHONE_MAX_LENGTH: 11,
    PHONE_MIN_LENGTH: 11,
    ADDRESS_MAX_LENGTH: 100,
    ADDRESS_MIN_LENGTH: 10,
  },
  hostname: {
    BASE_URL: process.env.BASE_URL || 'https://flexin.mazaharul.site',
  },
  product: {
    NAME_MIN_LENGTH: 2,
    NAME_MAX_LENGTH: 50,
    DESCRIPTION_MAX_LENGTH: 500,
    DESCRIPTION_MIN_LENGTH: 10,
    PRICE_MIN: 1,
    PRICE_MAX: 10000,
    CATEGORY_MAX_LENGTH: 30,
    CATEGORY_MIN_LENGTH: 2,
    STOCK_MIN: 0,
    STOCK_MAX: 10000,
    IMAGE: {
      MAX_SIZE: 5 * 1024 * 1024, // 5 MB
      ALLOWED_TYPES: ['image/jpeg', 'image/png', 'image/gif'],
    },
  },
  hashing:{
    SALT_ROUNDS: 10,
  },
  cartLimit:{
    MIN:1,
    MAX:30
  },
  singleProductLimit:{
    DESCRIPTION_LEN_MAX:100,
    SIZE_LEN_MAX:5,
    COLOR_LEN_MAX:5,
  },
  carts:{
    FEES_MIN_AMOUNT:200
  },
  SUFFLED_LIMIT:6
});
