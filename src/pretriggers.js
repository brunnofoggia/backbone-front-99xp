/**
  * allows to create components applying their behaviors on any new instance
  */
import _ from 'underscore-99xp';

export default function () {
    if (this.pretriggers.length > 0)
        for (let trigger of this.pretriggers) {
            _.bind(trigger, this)();
        }
}