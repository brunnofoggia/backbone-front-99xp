import bbxf from './define';
import bbx from 'backbone-99xp';
import { definition as selectionList } from 'backbone-99xp/src/collections/selectionList';
import grid from './collections/grid';
import localStorageModel from './models/localStorage';
import filterModel from './models/filter';

bbxf.models = {};
bbxf.models.localStorage = localStorageModel;
bbxf.models.filter = filterModel;
bbxf.collections = {};
bbxf.collections.selectionList = bbxf.collection.extend(selectionList);
bbxf.collections.grid = grid;

export default bbxf;
