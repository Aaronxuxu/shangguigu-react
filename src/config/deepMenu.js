const deepMenu = (menu) => {
  return menu.reduce((a, c) => {
    if (c.children) {
      a.push(...deepMenu(c.children));
    } else {
      a.push(c);
    }
    return a;
  }, []);
};

export default deepMenu;
