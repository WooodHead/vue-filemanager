function smartClick(c, item) {
  if (item.model.type === 'dir') {
    c.dispatch('setCurrentPath', []);
    if (item && item.model.type === 'dir') {
      var p = item.model.full_path.split('/').splice(1);
      c.dispatch('setCurrentPath', p);
    }
    c.dispatch('refresh');
  }
}

// function selectOrUnselect(c, { item, e }) {
//   var indexInTemp = c.state.temps.indexOf(item);
//   var isRightClick = e && e.which == 3;
//   if (!item || (isRightClick && c.getters.isSelected(item))) {
//     console.log('return');
//     return;
//   }
//   if (e && e.shiftKey) {
//     c.dispatch('shiftClickHandler', { e, item });
//   } else {
//     c.dispatch('setTemps', [item]);
//   }
// }
// function ctrlClickHandler(c, e, item) {
//   if (e && (e.ctrlKey || e.meteKey)) {
//     this.isSelected(item) ? this.removeFromTemps(item) : this.addToTemps(item);
//     return;
//   }
// }

// function shiftClickHandler(c, e, item) {
//   if (e && e.shiftKey) {
//     console.log('aa');
//     var list = this.fileList;
//     var indexInList = list.indexOf(item);
//     var lastSelected = this.temps[0];
//     var i = list.indexOf(lastSelected);
//     var current = undefined;
//     if (lastSelected && list.indexOf(lastSelected) < indexInList) {
//       this.setTemps([]);
//       while (i <= indexInList) {
//         current = list[i];
//         !this.isSelected(current) && this.addToTemps(current);
//         i++;
//       }
//       return;
//     }
//     if (lastSelected && list.indexOf(lastSelected) > indexInList) {
//       this.setTemps([]);
//       while (i >= indexInList) {
//         current = list[i];
//         !this.isSelected(current) && this.addToTemps(current);
//         i--;
//       }
//       return;
//     }
//   }
// }

// function contextMenuHanclder(c, e, item) {
//   this.hideMenu();
//   e.preventDefault();

//   var isRightClick = e && e.which == 3;
//   if (!isRightClick) {
//     //left click
//     if (e && (e.ctrlKey || e.meteKey)) {
//       this.ctrlClickHandler(e, item);
//       return;
//     }
//   } else {
//     // right click
//     if (!this.isSelected(item)) {
//       if (e && e.ctrlKey) {
//         this.ctrlClickHandler(e, item);
//       } else if (e && e.shiftKey) {
//         this.shiftClickHandler(e, item);
//       } else {
//         this.setTemps([item]);
//       }
//     }
//     this.showMenu(e);
//   }
// }

// function selectOrUnselect(c, item, e) {
//   var indexInTemp = this.temps.indexOf(item);
//   var isRightClick = e && e.which == 3;
//   if (!item || (isRightClick && this.isSelected(item))) {
//     console.log('return');
//     return;
//   }
//   if (e && e.shiftKey) {
//     this.shiftClickHandler(e, item);
//   } else {
//     this.setTemps([item]);
//   }
// }

export default {
  smartClick
};