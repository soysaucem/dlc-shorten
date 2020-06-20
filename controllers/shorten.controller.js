import Item from '../models/shorten-item';
import validUrl from 'valid-url';

export async function createShortenUrl(req, res, next) {
  try {
    const url = req.body.url;

    if (!validUrl.isUri(url)) {
      req.session.errors = ['Not a valid url'];
      res.redirect('/');
    } else {
      const addedItem = await Item.create({ url: url });
      const shortenObject = {
        shortenUrl:
          req.protocol + '://' + req.get('host') + '/' + addedItem._id,
        longUrl: url,
      };

      req.session.shortenObjects = req.session.shortenObjects
        ? [...req.session.shortenObjects, shortenObject]
        : [shortenObject];

      res.redirect('/');
    }
  } catch (err) {
    next(err);
  }
}

export async function redirectUrl(req, res, next) {
  try {
    const id = req.params.id;
    const doc = await Item.findOne({ _id: id });

    if (doc) {
      res.redirect(doc.url);
    } else {
      res.redirect('/');
    }
  } catch (err) {
    next(err);
  }
}
