import ItemModel from '../models/item';
import validUrl from 'valid-url';
import { routes } from '../common/utils/vars';

export async function createShortenUrl(req, res, next) {
  try {
    const { url } = req.body;

    if (!validUrl.isUri(url)) {
      req.session.errors = ['Not a valid url'];
      return res.redirect('/');
    }

    const addedItem = await ItemModel.create({
      user: req.session.user?._id,
      url: url,
    });

    const shortenObject = {
      shortenUrl: 'https://' + req.get('host') + '/' + addedItem._id,
      longUrl: url,
    };

    req.session.shortenObjects = req.session.shortenObjects
      ? [...req.session.shortenObjects, shortenObject]
      : [shortenObject];

    if (req.get('referer').includes('dashboard')) {
      return res.redirect(routes.dashboard.links);
    }

    return res.redirect('/');
  } catch (err) {
    return next(err);
  }
}

export async function redirectUrl(req, res, next) {
  try {
    const { id } = req.params;
    const doc = await ItemModel.findOne({ _id: id });

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
