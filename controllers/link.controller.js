import ItemModel from '../models/item';
import { routes } from '../common/utils/vars';

export async function editLink(req, res, next) {
  try {
    const newUrl = req.body.url;
    const id = req.params.id;

    await ItemModel.updateOne({ _id: id }, { $set: { url: newUrl } });

    req.session.messages = [`Link id ${id} is updated successfully`];

    return res.redirect(routes.dashboard.editLink(id));
  } catch (err) {
    return next(err);
  }
}

export async function deleteLink(req, res, next) {
  try {
    await ItemModel.deleteOne({ _id: req.params.id });

    return res.redirect(routes.dashboard.links);
  } catch (err) {
    return next(err);
  }
}
