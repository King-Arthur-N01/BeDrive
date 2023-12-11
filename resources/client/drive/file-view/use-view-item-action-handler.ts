import {useCallback} from 'react';
import {getPathForFolder} from '../drive-page/drive-page';
import {driveState} from '../drive-store';
import {DriveEntry} from '../files/drive-entry';
import {getSelectedEntries} from '../files/use-selected-entries';
import {useNavigate} from '../../common/utils/hooks/use-navigate';

export function useViewItemActionHandler() {
  const navigate = useNavigate();

  const performViewItemAction = useCallback(
    (entry: DriveEntry) => {
      if (entry && entry.type === 'folder') {
        navigate(getPathForFolder(entry.hash));
      } else {
        const selectedEntries = getSelectedEntries();
        driveState().setActiveActionDialog(
          'preview',
          selectedEntries.length ? selectedEntries : [entry]
        );
      }
    },
    [navigate]
  );

  return {performViewItemAction};
}
