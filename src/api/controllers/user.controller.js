import Joi from 'joi';
import jwt from 'jsonwebtoken';
import HttpStatus from 'http-status-codes';
import User from '../models/user.model';
import Business from '../models/business.model';

export default {
  // token verrification middleware
  verifyToken(req, res, next) {
    const request = req;
    if (!req.headers.authorization) {
      return res.status(HttpStatus.UNAUTHORIZED).send('Unauthorized request');
    }
    const token = req.headers.authorization.split(' ')[1];
    if (token === 'null') {
      return res.status(HttpStatus.UNAUTHORIZED).send('Unauthorized request');
    }
    const payload = jwt.verify(token, 'secretKey');
    if (!payload) {
      return res.status(HttpStatus.UNAUTHORIZED).send('Unauthorized request');
    }
    request.userId = payload.subject;
    next();
  },
  createUser(req, res, next) {
    const schema = Joi.object().keys({
      image: Joi.string().allow(''),
      firstname: Joi.string().required(),
      lastname: Joi.string().required(),
      email: Joi.string().email({ minDomainAtoms: 2 }),
      phone: Joi.number().required(),
      sex: Joi.string().required(),
      dob: Joi.string().required(),
      location: Joi.string().required(),
      password: Joi.string().required(),
      confirmPassword: Joi.string().required(),
      oath: Joi.boolean().required(),
    });
    const { error, value } = Joi.validate(req.body, schema);
    if (error && error.details) {
      return res.status(HttpStatus.BAD_REQUEST).json(error);
    }
    // check for existing user
    // User.findOne({ email: value.email })
    //   .then(userData => {
    //     if (userData) {
    //       res.status(HttpStatus.NOT_ACCEPTABLE).json({ err: 'Email already exist!' });
    //     }
    //   })
    //   .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err));
    // configuring jwt
    const payload = { subject: value._id };
    const token = jwt.sign(payload, 'secretKey');

    User.create(value)
      .then(res.json({ token }))
      .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err));
  },
  createBusiness(req, res, next) {
    const schema = Joi.object().keys({
      image: Joi.string().allow(''),
      company: Joi.string().required(),
      type: Joi.string().required(),
      email: Joi.string().email({ minDomainAtoms: 2 }),
      phone: Joi.number().required(),
      location: Joi.string().required(),
      password: Joi.string().required(),
      confirmPassword: Joi.string().required(),
      oath: Joi.boolean().required(),
    });
    const { error, value } = Joi.validate(req.body, schema);
    if (error && error.details) {
      return res.status(HttpStatus.BAD_REQUEST).json(error);
    }
    // configuring jwt
    const payload = { subject: value._id };
    const token = jwt.sign(payload, 'secretKey');

    Business.create(value)
      .then(res.json({ token }))
      .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err));
  },
  login(req, res, next) {
    const schema = Joi.object().keys({
      email: Joi.string()
        .lowercase()
        .required(),
      password: Joi.string().required(),
    });
    const { error, value } = Joi.validate(req.body, schema);
    if (error && error.details) {
      return res.status(HttpStatus.BAD_REQUEST).json(error);
    }
    User.findOne({ email: value.email })
      .then(userData => {
        if (!userData) {
          res.status(HttpStatus.NOT_FOUND).json({ err: 'Invalid email' });
        } else if (userData.password !== value.password) {
          return res.status(HttpStatus.NOT_FOUND).json({ err: 'Invalid password' });
        }
        // configuring jwt
        const payload = { userId: userData._id, email: userData.email };
        const token = jwt.sign(payload, 'secretKey');
        return res.json({ token });
      })
      .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err));
  },
  loginBusiness(req, res, next) {
    const schema = Joi.object().keys({
      email: Joi.string()
        .lowercase()
        .required(),
      password: Joi.string().required(),
    });
    const { error, value } = Joi.validate(req.body, schema);
    if (error && error.details) {
      return res.status(HttpStatus.BAD_REQUEST).json(error);
    }
    Business.findOne({ email: value.email })
      .then(businessData => {
        if (!businessData) {
          res.status(HttpStatus.NOT_FOUND).json({ err: 'Invalid email' });
        } else if (businessData.password !== value.password) {
          return res.status(HttpStatus.NOT_FOUND).json({ err: 'Invalid password' });
        }
        // configuring jwt
        const payload = { userId: businessData._id, email: businessData.email };
        const token = jwt.sign(payload, 'secretKey');
        return res.json({ token });
      })
      .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err));
  },
  getUser(req, res) {
    const { token } = req.params;
    const payload = jwt.verify(token, 'secretKey');
    User.findOne({ email: payload.email })
      .then(userData => {
        if (!userData) {
          return res.status(HttpStatus.NOT_FOUND).json({ err: 'Failed to get user' });
        }
        return res.json(userData);
      })
      .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err));
  },
};
