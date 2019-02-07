import Joi from 'joi';
import HttpStatus from 'http-status-codes';
import Contact from '../models/contact.model';
import Category from '../models/category.model';

export default {
  findAll(req, res, next) {
    Contact.find()
      .then(contacts => res.json(contacts))
      .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err));
  },
  create(req, res, next) {
    const schema = Joi.object().keys({
      name: Joi.string().required(),
      phone: Joi.number().required(),
      category: Joi.string().required(),
      location: Joi.string().required(),
    });
    const { error, value } = Joi.validate(req.body, schema);
    if (error && error.details) {
      return res.status(HttpStatus.BAD_REQUEST).json(error);
    }
    Contact.create(value)
      .then(contact => res.json(contact))
      .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err));
  },
  findOne(req, res) {
    const { id } = req.params;
    Contact.findById(id)
      .then(contact => {
        if (!contact) {
          return res.status(HttpStatus.NOT_FOUND).json({ err: 'could not find any contact' });
        }
        return res.json(contact);
      })
      .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err));
  },
  delete(req, res) {
    const { id } = req.params;
    Contact.findByIdAndRemove(id)
      .then(contact => {
        if (!contact) {
          return res.status(HttpStatus.NOT_FOUND).json({ err: 'could not delete any contact' });
        }
        return res.json(contact);
      })
      .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err));
  },
  update(req, res) {
    const { id } = req.params;
    const schema = Joi.object().keys({
      userId: Joi.string().required(),
      name: Joi.string().required(),
      phone: Joi.number().required(),
      category: Joi.string().required(),
      location: Joi.string().required(),
    });
    const { error, value } = Joi.validate(req.body, schema);
    if (error && error.details) {
      return res.status(HttpStatus.BAD_REQUEST).json(error);
    }
    Contact.findOneAndUpdate({ _id: id }, value, { new: true })
      .then(contact => res.json(contact))
      .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err));
  },

  // category
  findAllCategory(req, res, next) {
    const { id } = req.params;
    Category.find({ userId: id })
      .then(categories => res.json(categories))
      .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err));
  },
  findOneCategory(req, res) {
    const { id } = req.params;
    Category.findById(id)
      .then(category => {
        if (!category) {
          return res.status(HttpStatus.NOT_FOUND).json({ err: 'could not find any category' });
        }
        return res.json(category);
      })
      .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err));
  },
  createCategory(req, res, next) {
    const schema = Joi.object().keys({
      userId: Joi.string().required(),
      label: Joi.string().required(),
    });
    const { error, value } = Joi.validate(req.body, schema);
    if (error && error.details) {
      return res.status(HttpStatus.BAD_REQUEST).json(error);
    }
    Category.create(value)
      .then(category => res.json(category))
      .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err));
  },
  deleteCategory(req, res) {
    const { id } = req.params;
    Category.findByIdAndRemove(id)
      .then(category => {
        if (!category) {
          return res.status(HttpStatus.NOT_FOUND).json({ err: 'could not delete any category' });
        }
        return res.json(category);
      })
      .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err));
  },
  updateCategory(req, res) {
    const { id } = req.params;
    const schema = Joi.object().keys({
      userId: Joi.string().required(),
      label: Joi.string().required(),
    });
    const { error, value } = Joi.validate(req.body, schema);
    if (error && error.details) {
      return res.status(HttpStatus.BAD_REQUEST).json(error);
    }
    Category.findOneAndUpdate({ _id: id }, value, { new: true })
      .then(category => res.json(category))
      .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err));
  },
};
