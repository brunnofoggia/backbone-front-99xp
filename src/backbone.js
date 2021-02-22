import bbxf from './define';
import bbx from 'backbone-99xp';
import { definition as selectionList } from 'backbone-99xp/src/collections/selectionList';
import localStorageModel from './models/localStorage';

bbxf.format = bbx.format;
bbxf.models = {};
bbxf.models.localStorage = localStorageModel;
bbxf.collections = {};
bbxf.collections.selectionList = bbxf.collection.extend(selectionList);

export default bbxf;
