class LocalStorageService {
  constructor(dataCellName = 'traderApp') {
    this.storageName = dataCellName;

    const storageExist = localStorage[this.storageName];

    if (!storageExist) {
      this.cleanStore();
    }
  }

  get store() {
    return JSON.parse(localStorage[this.storageName]);
  }

  set store(newStore) {
    localStorage[this.storageName] = JSON.stringify(newStore);
  }

  get userId() {
    return this.store.userId;
  }

  set userId(newId) {
    const { store } = this;
    store.userId = newId;
    this.store = store;
  }

  cleanStore() {
    this.store = { userId: '' };
  }
}

const localStorageService = new LocalStorageService();

export default localStorageService;
