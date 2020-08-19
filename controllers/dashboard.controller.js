import ItemModel from '../models/item';
import moment from 'moment';
import { routes } from '../common/utils/vars';

export async function renderLinksPage(req, res, next) {
  try {
    const links = await ItemModel.find({ user: req.session.user._id })
      .sort({ createdAt: -1 })
      .lean();

    return res.render('pages/dashboard', {
      pageTitle: 'Dashboard | Doge Shortener',
      prefixShortenUrl: 'https://' + req.get('host') + '/',
      links,
      moment,
      path: routes.dashboard.links,
      shortenObjects: req.session.shortenObjects,
      routes,
    });
  } catch (err) {
    return next(err);
  }
}

export async function renderEditLinkPage(req, res, next) {
  try {
    const link = await ItemModel.findOne({ _id: req.params.id }).lean();
    const messages = req.session.messages;
    req.session.messages = null;

    return res.render('pages/dashboard', {
      pageTitle: 'Dashboard | Doge Shortener',
      link,
      path: routes.dashboard.editLink(':id'),
      routes,
      messages,
    });
  } catch (err) {
    return next(err);
  }
}

export function renderProfilePage(req, res, next) {
  try {
    return res.render('pages/dashboard', {
      pageTitle: 'Dashboard | Doge Shortener',
      path: routes.dashboard.profile,
      routes,
    });
  } catch (err) {
    return next(err);
  }
}

export function renderHomePage(req, res, next) {
  try {
    return res.render('pages/dashboard', {
      pageTitle: 'Dashboard | Doge Shortener',
      path: routes.dashboard.home,
      routes,
    });
  } catch (err) {
    return next(err);
  }
}
