import Joi from 'joi';
import HttpStatus from 'http-status-codes';
import Note from '../models/note.model';

export default {
  findAll(req, res, next) {
    Note.find()
      .then(notes => res.json(notes))
      .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err));
  },
  create(req, res, next) {
    const schema = Joi.object().keys({
      title: Joi.string().required(),
      knowt: Joi.string().required(),
      author: Joi.string(),
      authorId: Joi.string(),
      dateCreated: Joi.date(),
    });
    const { error, value } = Joi.validate(req.body, schema);
    if (error && error.details) {
      return res.status(HttpStatus.BAD_REQUEST).json(error);
    }
    Note.create(value)
      .then(note => res.json(note))
      .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err));
  },
  findOne(req, res) {
    const { id } = req.params;
    Note.findById(id)
      .then(note => {
        if (!note) {
          return res.status(HttpStatus.NOT_FOUND).json({ err: 'could not find any note' });
        }
        return res.json(note);
      })
      .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err));
  },
  delete(req, res) {
    const { id } = req.params;
    Note.findByIdAndRemove(id)
      .then(note => {
        if (!note) {
          return res.status(HttpStatus.NOT_FOUND).json({ err: 'could not delete any note' });
        }
        return res.json(note);
      })
      .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err));
  },
  update(req, res) {
    const { id } = req.params;
    const schema = Joi.object().keys({
      title: Joi.string().required(),
      knowt: Joi.string().required(),
      author: Joi.string(),
      authorId: Joi.string(),
      dateCreated: Joi.date(),
    });
    const { error, value } = Joi.validate(req.body, schema);
    if (error && error.details) {
      return res.status(HttpStatus.BAD_REQUEST).json(error);
    }
    Note.findOneAndUpdate({ _id: id }, value, { new: true })
      .then(note => res.json(note))
      .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err));
  },
};
