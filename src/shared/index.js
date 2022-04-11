import filesaver from 'file-saver';
import { AppConstants } from 'Common/appId';
import _Symbol from 'CommonDeriv/symbolApi';
import TicksService from 'CommonDeriv/TicksService';
import { get as getStorage } from 'StorageManager';
import api from 'Api';

export const symbolApi = new _Symbol(api);

export const symbolPromise = new Promise(resolve => {
  symbolApi.initPromise.then(() => {
    resolve();
  });
});

export const ticksService = new TicksService(api);

export const appendRow = (trade, state) => ({
  id: state.id + 1,
  rows: [
    ...state.rows,
    {
      ...trade,
      id: state.id + 1,
    },
  ],
});

export const updateRow = (prevRowIndex, trade, state) => ({
  id: state.id,
  rows: [
    ...state.rows.slice(0, prevRowIndex),
    {
      ...trade,
      id: state.id,
    },
  ],
});

export const saveAs = ({ data, filename, type }) => {
  const blob = new Blob([data], { type });
  filesaver.saveAs(blob, filename);
};

export const restrictInputCharacter = ({ whitelistRegEx, input }) => input.match(new RegExp(whitelistRegEx));

export const isNumber = num => num !== '' && Number.isFinite(Number(num));

export const getActiveToken = tokenList => {
    const activeTokenObject = tokenList.filter(
        tokenObject => tokenObject.token === getStorage(AppConstants.STORAGE_ACTIVE_TOKEN)
    );
    return activeTokenObject.length ? activeTokenObject[0] : tokenList[0];
};