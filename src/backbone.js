import bbxf from './define';
import bbx from 'backbone-99xp';
import { definition as selectionList } from 'backbone-99xp/src/collections/selectionList';

bbxf.format = bbx.format;
bbxf.collections = {};
bbxf.collections.selectionList = bbxf.collection.extend(selectionList);

export default bbxf;