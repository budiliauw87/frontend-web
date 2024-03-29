import {openDB} from 'idb';
import CONFIG from '../constant/config';

const dbPromise = openDB(CONFIG.DATABASE_NAME, CONFIG.DATABASE_VERSION, {
  upgrade(database) {
    database.createObjectStore(CONFIG.OBJECT_STORE_NAME, {keyPath: 'id'});
  },
});

const FavoriteDatabase = {
  async getRestaurants() {
    return (await dbPromise).getAll(CONFIG.OBJECT_STORE_NAME);
  },
  async getRestaurant(id) {
    if (!id) {
      return;
    }
    return (await dbPromise).get(CONFIG.OBJECT_STORE_NAME, id);
  },
  async putRestaurant(restaurant) {
    if (!restaurant.hasOwnProperty('id')) {
      return;
    }
    return (await dbPromise).add(CONFIG.OBJECT_STORE_NAME, restaurant);
  },
  async updateRestaurant(restaurant) {
    return (await dbPromise).put(CONFIG.OBJECT_STORE_NAME, restaurant);
  },
  async deleteRestaurant(id) {
    return (await dbPromise).delete(CONFIG.OBJECT_STORE_NAME, id);
  },
  async clearRestaurant() {
    return (await dbPromise).clear(CONFIG.OBJECT_STORE_NAME);
  },
};

export default FavoriteDatabase;
