import Item from '../models/item';
import validUrl from 'valid-url';
import shortId from 'shortid';

export async function createShortenUrl(req, res, next) {
  try {
    const { url } = req.body;

    if (!validUrl.isUri(url)) {
      req.session.errors = ['Not a valid url'];
      return res.redirect('/');
    }

    const addedItem = await Item.create({
      _id: shortId.generate,
      url: url,
      createdAt: Date.now(),
    });
    const shortenObject = {
      shortenUrl: req.protocol + '://' + req.get('host') + '/' + addedItem._id,
      longUrl: url,
    };

    req.session.shortenObjects = req.session.shortenObjects
      ? [...req.session.shortenObjects, shortenObject]
      : [shortenObject];

    return res.redirect('/');
  } catch (err) {
    return next(err);
  }
}

export async function redirectUrl(req, res, next) {
  try {
    const { id } = req.params;
    const doc = await Item.findOne({ _id: id });

    if (doc) {
      return res.redirect(doc.url);
    }

    return res.redirect('/');
  } catch (err) {
    return next(err);
  }
}

export function getShortenUrlsForUser(req, res, next) {
  return res.send('works!');
}
