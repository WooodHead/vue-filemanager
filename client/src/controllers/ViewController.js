function ViewController(store) {
  this.store = store;
}

ViewController.prototype.sortedList = function() {
  var fileList = this.store.state.fileList;
  var query = this.store.state.query.toLowerCase();
  var predicate = this.store.state.predicate;
  if (query) {
    fileList = fileList.filter(item => item.model.name.toLowerCase().indexOf(query) !== -1);
  }
  var sorted = fileList.sort((a, b) => {
    var p0 = predicate[0];
    var p1 = predicate[1];
    if (a.model[p0] !== b.model[p0]) {
      return a.model[p0] > b.model[p0];
    } else {
      if (this.store.state.reverse) {
        return a.model[p1] < b.model[p1];
      } else {
        return b.model[p1] < a.model[p1];
      }
    }
  });
  return sorted;
};

ViewController.prototype.singleSelection = function() {
  return this.store.state.temps.length === 1 && this.store.state.temps[0];
};

ViewController.prototype.smartClick = function(item) {
    if (item.model.type === 'dir') {
      this.store.dispatch('setCurrentPath', []);
      if (item && item.model.type === 'dir') {
        var p = item.model.full_path.split('/').splice(1);
        this.store.dispatch('setCurrentPath', p);
      }
      this.store.dispatch('refresh', );
    }
  },

  ViewController.prototype.selectOrUnselect = function(item, e) {
    var indexInTemp = this.store.state.temps.indexOf(item);
    var isRightClick = e && e.which == 3;
    if (!item || (isRightClick && this.isSelected(item))) {
      console.log('return');
      return;
    }
    if (e && e.shiftKey) {
      this.shiftClickHandler(e, item);
    } else {
      this.store.dispatch('setTemps', [item]);
    }
  };

ViewController.prototype.isSelected = function(item) {
  return this.store.state.temps.indexOf(item) !== -1;
};

ViewController.prototype.shiftClickHandler = function(e, item) {
  if (e && e.shiftKey) {
    var list = this.store.state.fileList;
    var indexInList = list.indexOf(item);
    var lastSelected = this.store.state.temps[0];
    var i = list.indexOf(lastSelected);
    var current = undefined;
    if (lastSelected && list.indexOf(lastSelected) < indexInList) {
      this.store.dispatch('setTemps', []);
      while (i <= indexInList) {
        current = list[i];
        !this.isSelected(current) && this.store.dispatch('addToTemps', current);
        i++;
      }
      return;
    }
    if (lastSelected && list.indexOf(lastSelected) > indexInList) {
      this.store.dispatch('setTemps', []);
      while (i >= indexInList) {
        current = list[i];
        !this.isSelected(current) && this.store.dispatch('addToTemps', current);
        i--;
      }
      return;
    }
  }
};

ViewController.prototype.ctrlClickHandler = function(e, item) {
  if (e && (e.ctrlKey || e.meteKey)) {
    this.isSelected(item) ?
      this.store.dispatch('removeFromTemps', item) :
      this.store.dispatch('addToTemps', item);
    return;
  }
};

ViewController.prototype.hideMenu = function() {
    var menu = document.querySelector('#context-menu');
    menu.style.display = 'none';
  },

  ViewController.prototype.showMenu = function(e) {
    var menu = document.querySelector('#context-menu');

    if (e.pageX >= window.innerWidth - menu.width) {
      e.pageX -= menu.offsetWidth;
    }
    if (e.pageY >= window.innerHeight - menu.height) {
      e.pageY -= menu.offsetHeight;
    }
    menu.style.display = 'block';
    menu.style.left = e.pageX + 'px';
    menu.style.top = e.pageY + 'px';
  };

ViewController.prototype.contextMenuHanclder = function(e, item) {
  this.hideMenu();
  e.preventDefault();

  var isRightClick = e && e.which == 3;
  if (!isRightClick) {
    //left click
    if (e && (e.ctrlKey || e.meteKey)) {
      this.ctrlClickHandler(e, item);
      return;
    }
  } else {
    // right click
    if (!this.isSelected(item)) {
      if (e && e.ctrlKey) {
        this.ctrlClickHandler(e, item);
      } else if (e && e.shiftKey) {
        this.shiftClickHandler(e, item);
      } else {
        this.store.dispatch('setTemps', [item]);
      }
    }
    this.showMenu(e);
  }
};

ViewController.prototype.addDocumentClickListener = function() {
  document.addEventListener('click', function() {
    var menu = document.querySelector('#context-menu');
    if (menu) {
      menu.style.display = 'none';
    }
  });
};

ViewController.prototype.selectionHas = function(type) {
  return this.store.state.temps.find(function(item) {
    return item && item.model.type === type;
  });
};

export default ViewController;